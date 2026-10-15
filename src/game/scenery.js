import Phaser from 'phaser';
import {crops} from '../data/assets.js';

export function registerScenery(scene){
 for(const [key,regions] of Object.entries(crops)){
  if(!scene.textures.exists(key))continue;
  const texture=scene.textures.get(key);
  for(const [name,x,y,w,h] of regions)if(!texture.has(name))texture.add(name,0,x,y,w,h);
 }
 for(const [key,count,rate] of [['star',4,5],['fireplace',3,5],['water',4,3]]){
  if(scene.textures.exists(key)&&!scene.anims.exists(key+'-loop'))scene.anims.create({key:key+'-loop',frames:scene.anims.generateFrameNumbers(key,{start:0,end:count-1}),frameRate:rate,repeat:-1});
 }
}

export function scenery(scene,chapter,obstacles){
 const room=chapter.id==='room';
 const random=new Phaser.Math.RandomDataGenerator(['fop-world-'+chapter.id]);
 const g=scene.add.graphics().setDepth(-30);
 g.fillStyle(room?0x6c5355:0x364e48).fillRect(0,0,640,360);
 const art=(key,x,y,scale=1,frame)=>{
  if(!scene.textures.exists(key))return null;
  return scene.add.image(x,y,key,frame).setOrigin(.5,1).setScale(scale).setDepth(y);
 };
 if(!room&&scene.textures.exists('grass')){
  for(let y=0;y<360;y+=16)for(let x=0;x<640;x+=16){scene.add.image(x,y,'grass','ground').setOrigin(0).setDepth(-25).setTint(chapter.id==='pocket'?0x789991:0x647c88);}
  // Paths stay in the same traversable areas as the proven prototype.
  const path=scene.add.graphics().setDepth(-20);
  path.lineStyle(26,0x9e9984,.65).lineBetween(45,188,599,188);
  path.lineStyle(20,0x9e9984,.5);
  for(const o of chapter.objects)path.lineBetween(o.x,188,o.x,o.y+12);
  for(let i=0;i<100;i++){
   const x=random.between(25,615),y=random.between(45,330);
   if(Math.abs(y-188)<20||chapter.objects.some(o=>Math.hypot(o.x-x,o.y-y)<35))continue;
   scene.add.image(x,y,'grass','grassDetail').setTint(0x849c9c).setDepth(-18).setAlpha(.65);
  }
 }else{
  g.fillStyle(0x3f354c).fillRect(20,36,600,56);
  g.lineStyle(1,0xc29a81,.2);
  for(let y=96;y<340;y+=16)g.lineBetween(25,y,615,y);
  for(let x=30;x<620;x+=64)g.lineBetween(x,95,x,338);
  art('rug',320,292,2)?.setDepth(-18);
  if(scene.textures.exists('fireplace'))scene.add.sprite(390,100,'fireplace').setOrigin(.5,1).play('fireplace-loop').setDepth(100);
  const glow=scene.add.circle(390,105,45,0xffc789,.08).setDepth(-5);
  scene.tweens.add({targets:glow,alpha:.3,duration:1700,yoyo:true,repeat:-1});
  art('memoryFrame',490,75);
 }
 const rim=scene.add.graphics().setDepth(-10);
 rim.lineStyle(2,0xced4bb,.25).strokeRect(24,39,592,297);
 scene.walls=scene.physics.add.staticGroup();
 for(const b of obstacles){
  const body=scene.add.rectangle(b.x,b.y,b.w,b.h,0x172834,0).setOrigin(0);
  scene.physics.add.existing(body,true);scene.walls.add(body);
  if(room)art('bookshelf',b.x+b.w/2,b.y+b.h,1.5);
  else if(chapter.id==='enjp'||chapter.id==='garden')art('sakura',b.x+b.w/2,b.y+b.h+6,1.25);
  else art('forest',b.x+b.w/2,b.y+b.h+6,2,'tree')?.setTint(0x9ebcb0);
 }
 if(!room){
  for(const x of [145,290,435,590]){
   art('lantern',x,225,.75);
   const light=scene.add.circle(x,210,20,0xffdf9b,.09).setDepth(-6);
   scene.tweens.add({targets:light,alpha:.4,duration:2100+x,yoyo:true,repeat:-1});
  }
  for(const [x,y] of [[55,130],[155,310],[465,310],[590,110],[250,80]]){
   art('flower',x,y)?.setTint(0xc7c1df);
  }
 }
 if(chapter.id==='enjp'){
  art('torii',320,130,1.5);art('hangingLantern',270,113);art('hangingLantern',370,113);
 }
 if(chapter.id==='pocket'){
  art('rug',318,138,1.4)?.setDepth(-18);
  art('furniture',285,128,1,'book');art('furniture',348,126,1,'stool');
 }
 if(chapter.id==='fop'){
  if(scene.textures.exists('water'))for(let x=245;x<310;x+=16)for(let y=270;y<303;y+=16)scene.add.sprite(x,y,'water').setDepth(-19).setTint(0x718b9d).play('water-loop');
  art('lilypads',272,288);art('mushrooms',415,100);art('mushrooms',150,300);
 }
 if(chapter.id==='garden'){
  art('arch',340,227,1.6)?.setDepth(210);
  art('fountain',150,265,1.25);
  drawGardenBuildings(scene);
 }
 if(!room){
  for(let i=0;i<24;i++){
   const firefly=scene.add.rectangle(random.between(40,600),random.between(45,325),2,2,0xffe8b2,.6).setDepth(350);
   scene.tweens.add({targets:firefly,alpha:.05,y:firefly.y-10,x:firefly.x+7,duration:random.between(1600,4000),yoyo:true,repeat:-1});
  }
 }
}

// These two structures have no supplied finished sprite. Compose simple scenery
// in engine-owned code, retaining the provided plants/flowers and all character art.
function drawGardenBuildings(scene){
 const g=scene.add.graphics().setDepth(110);
 // Glasshouse on the northern edge, outside the main walking route.
 g.fillStyle(0x90c9b5,.25).fillRect(155,75,88,37);
 g.fillTriangle(151,75,199,47,247,75);
 g.lineStyle(3,0xb9c2ad).strokeRect(155,75,88,37);
 g.strokeTriangle(151,75,199,47,247,75);
 for(const x of [176,199,221])g.lineBetween(x,75,x,110);
 g.lineBetween(155,92,243,92);
 g.fillStyle(0x725f60).fillRect(190,95,18,17);
 // Open gazebo with wooden posts and a lavender roof.
 g.fillStyle(0xa18da5).fillTriangle(350,70,390,44,430,70);
 g.fillStyle(0xc6b2ad).fillRect(350,70,80,5);
 for(const x of [357,419])g.fillRect(x,75,4,37);
 g.fillStyle(0x897586).fillRect(354,110,72,6);
 g.lineStyle(2,0xb7a5a2).lineBetween(360,96,420,96);
 for(const x of [170,223])scene.add.image(x,107,'plants','plant').setDepth(111);
 // Solid footprints, while keeping object approaches and the central path clear.
 for(const b of [{x:155,y:68,w:88,h:44},{x:352,y:62,w:76,h:50}]){
  const r=scene.add.rectangle(b.x,b.y,b.w,b.h,0,0).setOrigin(0);scene.physics.add.existing(r,true);scene.walls.add(r);
 }
}
