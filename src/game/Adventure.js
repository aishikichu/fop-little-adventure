import Phaser from 'phaser';
import {bridge} from './bridge.js';
import {story,ending} from '../data/story.js';
import {chapters,lines,obstacles} from '../data/world.js';
import {assets,audio,cues} from '../data/assets.js';
import {registerScenery,scenery} from './scenery.js';
import {drawInteraction} from './objects.js';
import {fresh,load,save,award,ready} from './progress.js';

export class Adventure extends Phaser.Scene {
 constructor(){super('Adventure');this.held={};this.mode='menu';this.ticks=0;this.dialogue=null;this.storage=null;}
 preload(){for(const a of assets){if(a.frameWidth)this.load.spritesheet(a.key,import.meta.env.BASE_URL+a.path,{frameWidth:a.frameWidth,frameHeight:a.frameHeight});else this.load.image(a.key,import.meta.env.BASE_URL+a.path)}}
 create(){
  try{this.storage=window.localStorage}catch{}
  this.progress=load(this.storage);this.makeTextures();this.registerAnimations();registerScenery(this);
  this.keys=this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,E,SPACE,ESC');
  this.input.keyboard.on('keydown',e=>{if(e.repeat||(e.code==='Space'&&e.target?.tagName==='BUTTON'))return;if(['KeyE','Space'].includes(e.code)){e.preventDefault();this.action(this.mode==='dialogue'?'advance':'interact')}if(e.code==='Escape')this.action(this.mode==='menu'?'close-menu':'menu')});
  window.addEventListener('blur',()=>this.clearInput());
  bridge.handler=(a,p)=>this.action(a,p);
  bridge.inspect=()=>({mode:this.mode,chapter:this.chapter.id,player:{x:this.player.x,y:this.player.y},companion:{x:this.companion.x,y:this.companion.y},objects:this.chapter.objects.map(o=>({id:o.id,x:o.x,y:o.y})),progress:structuredClone(this.progress)});
  this.buildWorld();this.openMenu();
 }
 makeTextures(){
  for(const [key,hair] of [['player',0xaaa1dc],['companion',0xf3dfbd]]){
   if(this.textures.exists(key))continue;
   const g=this.make.graphics({x:0,y:0,add:false});
   const rect=(x,y,w,h,c)=>g.fillStyle(c).fillRect(x,y,w,h);
   // Nine separate cream tails; larger lavender tails. Feet anchor both identities.
   for(let i=0;i<(key==='companion'?9:3);i++){const a=i/(key==='companion'?8:2)*Math.PI;const x=16+Math.cos(a)*11,y=27-Math.sin(a)*8;g.fillStyle(0x282940).fillEllipse(x,y,9,15);g.fillStyle(hair).fillEllipse(x,y-1,7,12)}
   rect(10,27,5,11,0x292c48);rect(18,27,5,11,0x292c48);rect(10,34,5,5,0xfff4df);rect(18,34,5,5,0xfff4df);
   rect(9,17,15,14,0x292c48);rect(10,17,13,11,0xfff4df);rect(15,18,4,5,0x303a5b);
   rect(7,5,19,key==='companion'?20:14,0x292c48);rect(8,6,17,key==='companion'?18:12,hair);
   rect(11,10,11,8,0xf4c8b1);rect(10,7,13,5,hair);rect(12,13,2,2,0x303049);rect(20,13,2,2,0x303049);
   rect(7,3,18,5,0xfff4e6);rect(10,1,13,4,0xfff4e6);rect(7,7,8,2,0xe1d3d6);
   g.generateTexture(key,32,40);g.destroy();
  }
 }
 registerAnimations(){
  for(const key of ['player','companion']){
   if(this.textures.get(key).frameTotal<20)continue;
   for(const [row,dir] of ['down','up','left','right'].entries())for(const moving of [false,true]){const name=`${key}-${moving?'walk':'idle'}_${dir}`;this.anims.create({key:name,frames:(moving?[0,1,2,3]:[0,2]).map(i=>({key,frame:row*4+i})),frameRate:moving?6:2,repeat:-1});}
   this.anims.create({key:key+'-sit',frames:[{key,frame:19}],frameRate:1});
   this.anims.create({key:key+'-wave',frames:[{key,frame:16},{key,frame:17}],frameRate:3,repeat:-1});
   this.anims.create({key:key+'-jump',frames:[{key,frame:18}],frameRate:1});
  }
 }
 sizeCharacter(s){const f=s.frame;const scale=f.width===48?.75:1;s.setScale(scale);s.body.setSize(12/scale,8/scale).setOffset((f.width-12/scale)/2,f.height-8/scale).setCollideWorldBounds(true);return s}
 clearInput(){this.held={};if(this.keys)for(const k of Object.values(this.keys))k.reset();this.player?.body?.setVelocity(0,0);this.companion?.body?.setVelocity(0,0)}
 persist(){if(!save(this.storage,this.progress))bridge.emit('subtitle',{text:lines.saveFailed});}
 hud(){bridge.emit('state',{chapter:this.chapter.id,title:this.chapter.title,subtitle:this.chapter.subtitle,quest:ready(this.progress,this.chapter.id)&&this.chapter.id!=='garden'?lines.gate:this.chapter.quest,stars:[...this.progress.stars],completed:this.progress.completed,sound:this.progress.sound});}
 buildWorld(){
  this.tweens.killAll();this.physics.world.colliders.destroy();this.children.removeAll(true);this.chapter=chapters[this.progress.chapter];this.trail=[];this.lastPrompt='';this.nearest=null;bridge.emit('prompt',{text:''});
  this.physics.world.setBounds(25,40,590,295);this.cameras.main.setBounds(0,0,640,360);
  scenery(this,this.chapter,obstacles);
  this.objects=[];
  for(const o of this.chapter.objects)this.drawObject(o);
  if(this.chapter.id!=='garden'){this.drawObject({id:'exit',label:story.ui.nextMemory,x:577,y:175,kind:'portal'});}
  this.player=this.sizeCharacter(this.physics.add.sprite(105,190,'player').setOrigin(.5,1).setDepth(10));
  this.companion=this.sizeCharacter(this.physics.add.sprite(77,200,'companion').setOrigin(.5,1).setDepth(9));
  this.companion.setVisible(this.progress.seen.includes('meet'));
  this.physics.add.collider(this.player,this.walls);this.physics.add.collider(this.companion,this.walls);
  this.cameras.main.startFollow(this.player,true,.12,.12);this.cameras.main.fadeIn(400,25,26,49);
  this.add.text(320,28,this.chapter.id==='enjp'?story.ui.enjpSign:this.chapter.title,{fontFamily:'monospace',fontSize:'10px',color:'#f1e9dc'}).setOrigin(.5);
  this.hud();
 }
 drawObject(o){drawInteraction(this,o)}
 speak(pages,done=()=>{},options={}){
  if(!pages?.length){done();return}
  if(typeof options==='string')options={speaker:options};
  this.clearInput();this.mode='dialogue';this.dialogue={pages,index:0,chars:0,done,speaker:options.speaker||'aishikichu',character:options.character||'player',emotes:options.emotes||['neutral'],serial:(this.dialogueSerial=(this.dialogueSerial||0)+1)};
  if(this.chapter.id==='pocket'){this.player.play('player-sit');if(this.companion.visible)this.companion.play('companion-sit');}
  this.emitDialogue();
 }
 emitDialogue(){const d=this.dialogue;if(d)bridge.emit('dialogue',{speaker:d.speaker,character:d.character,emote:d.emotes[Math.min(d.index,d.emotes.length-1)],text:d.pages[d.index].slice(0,Math.floor(d.chars)),fullText:d.pages[d.index],pageId:`${d.serial}:${d.index}`,page:d.index+1,total:d.pages.length,typing:d.chars<d.pages[d.index].length});}
 advance(){const d=this.dialogue;if(!d)return;const text=d.pages[d.index];if(d.chars<text.length){d.chars=text.length;this.emitDialogue();return}d.index++;d.chars=0;if(d.index===d.pages.length){this.dialogue=null;this.mode='play';bridge.emit('dialogue-close',{});d.done()}else this.emitDialogue()}
 action(a,p){
  if(a==='sync'){this.hud();if(this.mode==='menu')this.openMenu();return}
  if(a==='move'){if(p&&['up','down','left','right'].includes(p.direction))this.held[p.direction]=p.down;return}
  if(a==='sound'){this.progress.sound=!this.progress.sound;this.currentAudio?.pause();this.persist();this.hud();return}
  if(a==='menu'){if(this.mode!=='menu')this.openMenu();return}
  if(a==='close-menu'&&this.mode==='menu'&&this.started){this.mode='play';bridge.emit('menu-close',{});return}
  if(a==='restart'||a==='start'){
   this.dialogue=null;this.clearInput();this.progress=fresh();
   this.started=true;this.mode='play';
   bridge.emit('menu-close',{});bridge.emit('dialogue-close',{});bridge.emit('minigame-close',{});bridge.emit('ending-close',{});
   this.buildWorld();this.persist();return;
  }
  if(['resume','replay'].includes(a)){
   if(!['menu','ending'].includes(this.mode))return;
   if(a==='replay'&&!this.progress.completed)return;
   this.started=true;this.mode='play';bridge.emit('menu-close',{});bridge.emit('ending-close',{});this.buildWorld();this.persist();
   if(a==='replay'){this.seat();}return;
  }
  if(a==='advance'&&this.mode==='dialogue')this.advance();
  if(a==='interact'&&this.mode==='play'&&this.nearest)this.interact(this.nearest);
  if(a==='fop'&&this.mode==='minigame')this.fop(Number(p));
 }
 openMenu(){this.clearInput();this.mode='menu';bridge.emit('menu',{canResume:this.progress.seen.length>0||this.started,canReplay:this.progress.completed});}
 interact(o){
  if(o.id==='exit'){
   if(!ready(this.progress,this.chapter.id)){this.speak(lines.locked);return}
   const transition=this.chapter.transition;this.mode='transition';this.clearInput();this.cameras.main.fadeOut(350,25,26,49);this.time.delayedCall(360,()=>{this.progress.chapter++;this.persist();this.buildWorld();this.mode='play';bridge.emit('subtitle',{text:transition})});return;
  }
  if(o.ending){if(this.progress.stars.length<5)this.speak(lines.benchLocked);else this.speak(lines.gardenSeat,()=>this.seat(),o);return}
  if(o.puzzle==='fop'){if(this.progress.stars.includes('fop'))this.speak(lines.fopWin,()=>{},{speaker:'fox choir',character:'companion',emotes:['wink']});else this.speak(lines.fopIntro,()=>{this.mode='minigame';this.fopIndex=0;this.emitFop(lines.fopReady)},o);return}
  if(o.cue)this.cue(o.cue);
  this.speak(o.dialogue,()=>{
   if(!this.progress.seen.includes(o.id))this.progress.seen.push(o.id);
   if(o.id==='meet'){this.companion.setPosition(o.x,o.y).setVisible(true);this.meetingSprite?.setVisible(false);this.trail=[];}
   if(o.star)this.collectStar(o.star);
   const group=o.group;
   if(group&&!this.progress.stars.includes(group)&&this.chapter.objects.filter(x=>x.group===group).every(x=>this.progress.seen.includes(x.id))){this.collectStar(group);this.speak(this.chapter.completionDialogue,()=>{},{emotes:['love','shy','love']})}
   this.persist();this.hud();
  },o);
 }
 collectStar(id){
  if(this.progress.stars.includes(id))return;
  award(this.progress,id);this.poseUntil=this.time.now+650;
  this.player.play('player-jump');this.companion.play('companion-jump');
  bridge.emit('memory',{text:this.chapter.starMessage,count:this.progress.stars.length});
  for(let i=0;i<8;i++){const sparkle=this.add.star(this.player.x,this.player.y-24,4,1,3,0xffe5a5).setDepth(500);this.tweens.add({targets:sparkle,x:sparkle.x+Math.cos(i*Math.PI/4)*25,y:sparkle.y+Math.sin(i*Math.PI/4)*20,alpha:0,duration:800,onComplete:()=>sparkle.destroy()});}
 }
 emitFop(feedback){bridge.emit('minigame',{sequence:['FOP','FOPS','EVERYBODY FOP!'],index:this.fopIndex,feedback})}
 fop(n){if(n!==this.fopIndex){this.cue('abwaa');this.emitFop(lines.fopMiss);return}this.cue(['fop','fops','everybody-fop'][n]);this.fopIndex++;if(this.fopIndex===3){bridge.emit('minigame-close',{});this.collectStar('fop');this.persist();this.hud();this.speak(lines.fopWin,()=>{},{speaker:'fox choir',character:'companion',emotes:['wink']})}else this.emitFop(lines.fopReady)}
 cue(key){
  bridge.emit('subtitle',{text:cues[key]});if(!this.progress.sound)return;
  const tone=()=>{if(!this.progress.sound)return;try{this.audioContext??=new (window.AudioContext||window.webkitAudioContext)();const c=this.audioContext;c.resume();const o=c.createOscillator(),v=c.createGain();o.type='sine';o.frequency.value=key==='fops'?392:key==='everybody-fop'?523:330;v.gain.setValueAtTime(.025,c.currentTime);v.gain.exponentialRampToValueAtTime(.001,c.currentTime+.18);o.connect(v);v.connect(c.destination);o.start();o.stop(c.currentTime+.2)}catch{}};
  if(audio[key]){this.currentAudio?.pause();this.currentAudio=new Audio(import.meta.env.BASE_URL+audio[key]);this.currentAudio.play().catch(tone)}else tone();
 }
 seat(){
  this.mode='ending';this.clearInput();this.player.setPosition(330,231).setDepth(240);this.companion.setPosition(352,231).setVisible(true).setDepth(240);this.cameras.main.stopFollow();this.cameras.main.pan(400,170,800);
  for(const [s,key] of [[this.player,'player'],[this.companion,'companion']]){if(this.anims.exists(key+'-sit'))s.play(key+'-sit');else s.setScale(1,.8);}
  const g=this.add.graphics().setDepth(8);const pts=[{x:240,y:90},{x:280,y:55},{x:330,y:80},{x:375,y:45},{x:420,y:85}];g.lineStyle(1,0xeee2ae,.6).strokePoints(pts);pts.forEach(p=>{g.fillStyle(0xffe9ad).fillCircle(p.x,p.y,3)});
  g.setAlpha(0).setY(25);this.tweens.add({targets:g,alpha:1,y:0,duration:1400,ease:'Sine.easeOut'});
  this.progress.completed=true;this.progress.chapter=5;this.persist();this.hud();this.time.delayedCall(2500,()=>bridge.emit('ending',{text:ending}));
 }
 update(time,delta){
  if(!this.player)return;
  if(this.dialogue){this.dialogue.chars+=delta*.045;this.emitDialogue()}
  if(this.mode!=='play'){this.player.body.setVelocity(0,0);this.companion.body.setVelocity(0,0);return}
  const k=this.keys;let x=Number(!!(k.D.isDown||k.RIGHT.isDown||this.held.right))-Number(!!(k.A.isDown||k.LEFT.isDown||this.held.left)),y=Number(!!(k.S.isDown||k.DOWN.isDown||this.held.down))-Number(!!(k.W.isDown||k.UP.isDown||this.held.up));const v=new Phaser.Math.Vector2(x,y).normalize().scale(76);this.player.body.setVelocity(v.x,v.y);
  if(x)this.player.setFlipX(x<0);
  const last=this.trail.at(-1);if(!last||Phaser.Math.Distance.Between(last.x,last.y,this.player.x,this.player.y)>5)this.trail.push({x:this.player.x,y:this.player.y});
  if(this.trail.length>7){const target=this.trail[0],dist=Phaser.Math.Distance.Between(this.companion.x,this.companion.y,target.x,target.y);if(dist<8)this.trail.shift();else this.physics.moveTo(this.companion,target.x,target.y,90)}else this.companion.body.setVelocity(0,0);
  for(const [s,key] of [[this.player,'player'],[this.companion,'companion']]){s.setDepth(s.y);const velocity=s.body.velocity;if(s.body.speed>5)s.facing=Math.abs(velocity.x)>Math.abs(velocity.y)?(velocity.x>0?'right':'left'):(velocity.y>0?'down':'up');const name=key+(s.body.speed>5?'-walk_':'-idle_')+(s.facing||'down');if(this.anims.exists(name)&&time>(this.poseUntil||0)){s.setFlipX(false);s.play(name,true)}}
  this.nearest=this.objects.filter(o=>Phaser.Math.Distance.Between(o.x,o.y,this.player.x,this.player.y)<43).sort((a,b)=>Phaser.Math.Distance.Between(a.x,a.y,this.player.x,this.player.y)-Phaser.Math.Distance.Between(b.x,b.y,this.player.x,this.player.y))[0];
  const prompt=this.nearest?this.nearest.label:'';if(prompt!==this.lastPrompt){bridge.emit('prompt',{text:prompt});this.lastPrompt=prompt}
  for(const o of this.objects){const kept=this.progress.seen.includes(o.id)||this.progress.stars.includes(o.star);o.marker.setText(kept?'·':'◇');o.marker.setAlpha(o===this.nearest?1:.5);if(o.star&&kept)o.visual?.setVisible(false)}
 }
}


