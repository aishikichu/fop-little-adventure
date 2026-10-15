// Presentation of interactions. All character poses use the supplied atlases.
export function drawInteraction(scene,o){
 const {x,y}=o;
 scene.add.ellipse(x,y+2,26,8,0x111d2d,.2).setDepth(y-1);
 let visual;
 if(o.kind==='friend'){
  visual=scene.add.sprite(x,y,'companion').setOrigin(.5,1).setScale(.75).setVisible(!scene.progress.seen.includes('meet')).play('companion-wave');
  scene.meetingSprite=visual;
 }else if(o.kind==='fox'){
  const key=o.id==='frog-small'?'player':'companion';
  visual=scene.add.sprite(x,y,key,0).setOrigin(.5,1).setScale(.75).play(key+'-wave');
  if(o.id==='choir')scene.add.sprite(x+25,y+5,'player').setOrigin(.5,1).setScale(.65).play('player-idle_down').setDepth(y+5);
 }else if(o.kind==='star'){
  visual=scene.add.sprite(x,y,'star').setOrigin(.5,1).play('star-loop');
  scene.tweens.add({targets:visual,y:y-5,duration:1000,yoyo:true,repeat:-1});
 }else if(['memoryFrame','bench','flower'].includes(o.kind)){
  visual=scene.add.image(x,y,o.kind).setOrigin(.5,1);
 }else if(o.kind==='book'){
  visual=scene.add.image(x,y,'furniture','book').setOrigin(.5,1).setScale(1.5);
 }else if(o.kind==='plant'){
  visual=scene.add.image(x,y,'plants','plant').setOrigin(.5,1).setScale(1.5);
 }else if(['desk','call','music','keepsake'].includes(o.kind)){
  scene.add.image(x,y,'furniture','table').setOrigin(.5,1).setScale(2).setDepth(y);
  if(o.kind==='desk'){
   const g=scene.add.graphics().setDepth(y+1);g.fillStyle(0x202c49).fillRoundedRect(x-11,y-29,22,15,2);g.lineStyle(1,0x94d2c4).strokeRect(x-9,y-27,18,11);g.fillStyle(0x94d2c4).fillRect(x-6,y-23,8,1).fillRect(x-6,y-20,12,1);
  }else scene.add.text(x,y-28,o.kind==='call'?'♫':'♪',{fontSize:'18px',fontFamily:'serif',color:'#fae2b3'}).setOrigin(.5).setDepth(y+1);
 }else if(o.kind==='portal'){
  const g=scene.add.graphics().setDepth(y);g.lineStyle(5,0xa99fd3,.55).strokeEllipse(x,y-18,24,38);g.lineStyle(2,0xe7d6e9).strokeEllipse(x,y-18,17,31);
  scene.add.text(x,y-18,'→',{fontSize:'14px',color:'#fff4d6'}).setOrigin(.5).setDepth(y+1);
 }else{
  visual=scene.add.image(x,y,'memoryFrame').setOrigin(.5,1);
  scene.add.text(x,y-17,'EN / JP',{fontSize:'6px',color:'#fff4da',fontFamily:'monospace',backgroundColor:'#303549'}).setOrigin(.5).setDepth(y+1);
 }
 visual?.setDepth(y);
 const marker=scene.add.text(x,y+9,'◇',{fontSize:'12px',color:'#ffe5aa',stroke:'#28383b',strokeThickness:2}).setOrigin(.5).setDepth(y+10);
 scene.objects.push({...o,visual,marker});
}
