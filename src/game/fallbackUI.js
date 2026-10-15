import {bridge} from './bridge.js';
import {opening,story} from '../data/story.js';
export function installUI(){
 const root=document.querySelector('#interface');
 root.innerHTML=`<header><a class="brand" href="#" aria-label="Open adventure menu">FOP!<span>a little adventure through our memories</span></a><div class="tools"><button id="sound">Sound on</button><button id="menuButton">Menu</button></div></header><section class="chapter"><span id="chapterNumber"></span><h1 id="chapterTitle"></h1><p id="quest"></p><div id="stars" aria-label="Memory stars"></div></section><div id="prompt"></div><div id="subtitle" role="status" aria-live="polite"></div><section id="dialogue" class="panel dialogue" hidden><small id="speaker"></small><p id="dialogueText"></p><button id="advance">Continue ↵</button></section><section id="minigame" class="panel modal" hidden><small id="fopChoirLabel"></small><h2>Everybody FOP!</h2><p>Repeat: FOP → FOPS → EVERYBODY FOP!</p><p id="fopFeedback" role="status"></p><div class="fopButtons"><button data-fop="0">FOP</button><button data-fop="1">FOPS</button><button data-fop="2">EVERYBODY FOP!</button></div></section><section id="menu" class="panel modal opening" hidden><small>A YEAR OF LITTLE MOMENTS</small><h2>FOP! <span>♡</span></h2><p class="tagline">A Little Adventure Through Our Memories</p><p id="opening"></p><div class="menuActions"><button id="start" class="primary">START ADVENTURE</button><button id="resume">Resume adventure</button><button id="replay">Replay ending</button><button id="restart">Restart adventure</button><button id="closeMenu">Back to game</button></div><p class="instructions">WASD / arrows to walk · E / Space to interact<br>On touchscreens, use the direction pad and ✦ button.</p><small>Made for memma with love, and fops. ♡ — by aishikichu<br>Assets - Sprout Lands by Cup Nooble. Character reference supplied by creator.</small></section><section id="ending" class="panel modal ending" hidden><small>FIVE STARS. ONE WHOLE YEAR.</small><h2>I’m glad we met. ♡</h2><p id="endingText"></p><button id="endingMenu">Back to menu</button></section><div class="touch"><div class="dpad"><button data-dir="up" aria-label="Walk up">↑</button><button data-dir="left" aria-label="Walk left">←</button><button data-dir="down" aria-label="Walk down">↓</button><button data-dir="right" aria-label="Walk right">→</button></div><button id="interact" aria-label="Interact">✦</button></div><footer><span>Walk a little. Remember a lot.</span><span>✦ MEMORY WALK / 01</span></footer>`;
 const el=id=>document.getElementById(id),show=(id,on)=>el(id).hidden=!on;
 el('opening').textContent=opening;
 el('fopChoirLabel').textContent=story.ui.choir;
 const bind=(id,action)=>el(id).onclick=()=>bridge.dispatch(action);
 for(const [id,a] of Object.entries({start:'start',resume:'resume',replay:'replay',advance:'advance',sound:'sound',menuButton:'menu',closeMenu:'close-menu',endingMenu:'menu'}))bind(id,a);
 el('endingMenu').onclick=()=>{show('ending',false);bridge.dispatch('resume');bridge.dispatch('menu')};
 el('restart').onclick=()=>{show('menu',false);show('dialogue',false);show('minigame',false);show('ending',false);bridge.dispatch('restart')};
 root.querySelector('.brand').onclick=e=>{e.preventDefault();bridge.dispatch('menu')};
 el('interact').onclick=()=>bridge.dispatch(el('dialogue').hidden?'interact':'advance');
 root.querySelectorAll('[data-fop]').forEach(b=>b.onclick=()=>bridge.dispatch('fop',Number(b.dataset.fop)));
 root.querySelectorAll('[data-dir]').forEach(b=>{
  const move=down=>bridge.dispatch('move',{direction:b.dataset.dir,down});
  b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);move(true)};
  b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>move(false);
 });
 let subtitleTimer;
 bridge.subscribe(({type,payload:p})=>{
  if(type==='state'){el('chapterTitle').textContent=p.title;el('chapterNumber').textContent=p.subtitle;el('quest').textContent=p.quest;el('stars').textContent='★'.repeat(p.stars.length)+'☆'.repeat(5-p.stars.length);el('stars').setAttribute('aria-label',`${p.stars.length} of 5 Memory Stars`);el('sound').textContent=p.sound?'Sound on':'Sound off'}
  if(type==='menu'){show('menu',true);show('resume',p.canResume);show('restart',p.canResume);show('start',!p.canResume);show('replay',p.canReplay);show('closeMenu',p.canResume)}
  if(type==='menu-close')show('menu',false);
  if(type==='dialogue'){
   show('dialogue',true);
   let name=p.speaker;
   if(name==='player'||name==='you')name='aishikichu';
   if(name==='companion'||name==='pookie')name='memma';
   el('speaker').textContent=name;
   el('dialogueText').textContent=p.text;
   el('advance').textContent=p.typing?'Show all →':'Continue →';
  }
  if(type==='dialogue-close')show('dialogue',false);
  if(type==='prompt')el('prompt').textContent=p.text?`✦ ${p.text}  ·  E / tap`:'';
  if(type==='subtitle'){el('subtitle').textContent=p.text;clearTimeout(subtitleTimer);subtitleTimer=setTimeout(()=>el('subtitle').textContent='',3500)}
  if(type==='minigame'){show('minigame',true);el('fopFeedback').textContent=p.feedback;root.querySelectorAll('[data-fop]').forEach((b,i)=>{b.classList.toggle('next',i===p.index);b.setAttribute('aria-label',b.textContent+(i===p.index?' — next call':''))})}
  if(type==='minigame-close')show('minigame',false);
  if(type==='ending'){show('ending',true);el('endingText').textContent=p.text;el('endingMenu').focus()}
  if(type==='ending-close')show('ending',false);
 });
}
