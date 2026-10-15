import {test, expect} from '@playwright/test';

test.use({hasTouch:true,isMobile:true});

test('world, controls and dialogue stay on screen through mobile resizing', async ({page}) => {
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  // Exercise the offline font fallback without depending on Google's availability.
  await page.route('https://fonts.googleapis.com/**', route=>route.fulfill({contentType:'text/css',body:''}));
  page.on('console', message=>{if(message.type()==='error')errors.push(message.text());});
  await page.setViewportSize({width:414,height:728}); // Messenger's reduced content area
  await page.goto('/');
  await page.locator('#start').click();
  for (const [width,height] of [[414,728],[390,844],[320,568],[844,390],[414,620],[414,728]]) {
    await page.setViewportSize({width,height});
    await expect.poll(async()=>page.evaluate(()=>{
      const r=document.querySelector('#game canvas').getBoundingClientRect();
      const hud=document.querySelector('.chapter').getBoundingClientRect();
      const parent=document.querySelector('#game').getBoundingClientRect();
      return r.width>150 && r.height>80 && r.left>=0 && r.right<=innerWidth+1 &&
        r.top>=hud.bottom && r.bottom<=parent.bottom+1 && r.bottom<=innerHeight &&
        Math.abs(r.width/r.height-400/225)<0.04 &&
        (innerWidth>640 || Math.abs(r.top-parent.top)<2);
    })).toBe(true);
    for(const selector of ['#sound','#menuButton','[data-dir="up"]','[data-dir="left"]','[data-dir="down"]','[data-dir="right"]','#interact']) {
      const r=await page.locator(selector).boundingBox();
      expect(r.x).toBeGreaterThanOrEqual(0);expect(r.y).toBeGreaterThanOrEqual(0);
      expect(r.x+r.width).toBeLessThanOrEqual(width+1);expect(r.y+r.height).toBeLessThanOrEqual(height+1);
      expect(r.width).toBeGreaterThanOrEqual(44);expect(r.height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`test-results/layout-${width}x${height}.png`});
  }
  // Walk to the first character with the actual touch control.
  const right=await page.locator('[data-dir="right"]').boundingBox();
  await page.mouse.move(right.x+24,right.y+24);await page.mouse.down();
  await expect.poll(()=>page.evaluate(()=>window.fop.inspect().player.x)).toBeGreaterThan(210);
  await page.mouse.up();await page.locator('#interact').tap();
  await expect(page.locator('#dialogue')).toBeVisible();
  await page.locator('#advance').tap();
  for(const [width,height] of [[320,568],[844,390],[414,728]]) {
    await page.setViewportSize({width,height});
    await expect(page.locator('#advance')).toBeInViewport();
    const r=await page.locator('#dialogue').boundingBox();
    expect(r.y).toBeGreaterThanOrEqual(0);expect(r.y+r.height).toBeLessThanOrEqual(height);
    await page.screenshot({path:`test-results/dialogue-${width}x${height}.png`});
  }
  expect(errors).toEqual([]);
});

test('small phone menus and ending remain scrollable with reachable actions',async({page})=>{
  await page.route('https://fonts.googleapis.com/**',route=>route.fulfill({contentType:'text/css',body:''}));
  await page.addInitScript(()=>localStorage.setItem('fop-save-v1',JSON.stringify({version:1,chapter:5,stars:['hello','pocket','fop','room','garden'],seen:[],completed:true,sound:false})));
  await page.setViewportSize({width:320,height:568});await page.goto('/');
  await page.locator('#replay').click();await expect(page.locator('#ending')).toBeVisible();
  await page.locator('#endingMenu').scrollIntoViewIfNeeded();
  await expect(page.locator('#endingMenu')).toBeInViewport();
  await page.screenshot({path:'test-results/mobile-ending-scrolled.png'});
  await page.locator('#endingMenu').tap();await expect(page.locator('#menu')).toBeVisible();
  await page.locator('#resume').tap();await expect(page.locator('#game canvas')).toBeInViewport();
});
