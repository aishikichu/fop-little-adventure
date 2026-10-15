import {test,expect} from '@playwright/test';
// Keep production-build checks deterministic when external fonts are unavailable.
test.beforeEach(async({page})=>{
 await page.route('https://fonts.googleapis.com/**',route=>route.fulfill({contentType:'text/css',body:''}));
});
const inspect=page=>page.evaluate(()=>window.fop.inspect());
async function walk(page,x,y){
 for(let n=0;n<100;n++){
  const {player:p}=await inspect(page);const dx=x-p.x,dy=y-p.y;
  if(Math.abs(dx)<7&&Math.abs(dy)<7)return;
  const key=Math.abs(dx)>7?(dx>0?'ArrowRight':'ArrowLeft'):(dy>0?'ArrowDown':'ArrowUp');
  await page.keyboard.down(key);await page.waitForTimeout(Math.min(180,Math.max(45,Math.abs(Math.abs(dx)>7?dx:dy)/76*1000)));await page.keyboard.up(key);
 }throw Error(`Could not walk to ${x},${y}: ${JSON.stringify(await inspect(page))}`);
}
async function talk(page){
 for(let i=0;i<20;i++){if((await inspect(page)).mode!=='dialogue')return;await page.locator('#advance').click();await page.waitForTimeout(25)}
 throw Error('Dialogue did not finish');
}
async function visit(page,id){const s=await inspect(page);const o=s.objects.find(o=>o.id===id);await walk(page,o.x,o.y+24);await page.keyboard.press('e');await talk(page)}
async function next(page){await walk(page,500,195);await walk(page,577,195);await page.keyboard.press('e');await page.waitForTimeout(700)}
test('complete all chapters, puzzles, five stars, ending, resume, replay and restart',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+m.location().url)});
 await page.goto('/');await page.locator('#start').click();
 await visit(page,'meet');await expect.poll(async()=>(await inspect(page)).progress.seen).toContain('meet');
 await next(page);await visit(page,'hello-note');await visit(page,'hello-pause');await visit(page,'hello-star');await next(page);
 await visit(page,'pocket-spoon');await visit(page,'pocket-noise');await visit(page,'pocket-pocket');await next(page);
 for (const [id,character] of [['frog-small','player'],['frog-many','companion']]) {
  const o=(await inspect(page)).objects.find(o=>o.id===id);
  await walk(page,o.x,o.y+24);await page.keyboard.press('e');
  await expect(page.locator('#dialogue')).toBeVisible();
  await expect(page.locator('#portraitImg')).toHaveAttribute('src',new RegExp(`/characters/${character}/portraits/neutral\\.png$`));
  await expect.poll(()=>page.locator('#portraitImg').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await talk(page);
 }
 await visit(page,'choir');
 await expect(page.locator('#minigame')).toContainText('THE FOX CHOIR');
 await expect(page.locator('#minigame')).not.toContainText(/🐸|FROG/i);
 for (const img of await page.locator('.fop-portraits img').all()) await expect.poll(()=>img.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 await page.screenshot({path:'test-results/fox-choir-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('[data-fop="2"]')).toBeInViewport();
 await page.screenshot({path:'test-results/fox-choir-mobile.png'});
 await page.setViewportSize({width:1280,height:900});
 await page.locator('[data-fop="2"]').click();await expect(page.locator('#fopFeedback')).toContainText('abwaa');
 for(let i=0;i<3;i++)await page.locator(`[data-fop="${i}"]`).click();await talk(page);await next(page);
 await visit(page,'room-chat');await visit(page,'room-call');await visit(page,'room-music');await visit(page,'room-keepsake');await next(page);
 await visit(page,'garden-star');await visit(page,'bench');await expect(page.locator('#ending')).toBeVisible();
 expect((await inspect(page)).progress.stars).toHaveLength(5);expect((await inspect(page)).progress.completed).toBe(true);
 await page.screenshot({path:'test-results/ending-desktop.png'});
 await page.reload();await page.locator('#resume').click();expect((await inspect(page)).chapter).toBe('garden');
 await page.locator('#menuButton').click();await page.locator('#replay').click();await expect(page.locator('#ending')).toBeVisible();
 await page.locator('#endingMenu').click();page.once('dialog',d=>d.accept());await page.locator('#restart').click();expect((await inspect(page)).progress.stars).toHaveLength(0);expect((await inspect(page)).chapter).toBe('enjp');
 expect(errors).toEqual([]);
});
test.describe('touch device',()=>{
test.use({hasTouch:true,isMobile:true});
test('mobile touch movement, collision, dialogue and mute',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.locator('#start').click();
 const before=(await inspect(page)).player;const right=page.locator('[data-dir="right"]');
 const box=await right.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(650);await page.mouse.up();
 expect((await inspect(page)).player.x).toBeGreaterThan(before.x+20);
 await page.locator('#sound').click();await expect(page.locator('#sound')).toHaveText('Sound off');
 await visit(page,'meet');expect((await inspect(page)).progress.seen).toContain('meet');await page.screenshot({path:'test-results/mobile.png'});
 // Top-left tree occupies x80..126, y64..99. Approach from below.
 await walk(page,104,150);await page.keyboard.down('ArrowUp');await page.waitForTimeout(1500);await page.keyboard.up('ArrowUp');expect((await inspect(page)).player.y).toBeGreaterThan(99);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
});
