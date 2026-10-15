// Compatibility with Antigravity's proposed GameEvents contract.
// Installed before presentation code; engine progression remains authoritative.
import {bridge} from './bridge.js';
const listeners=new Map();
export const GameEvents=window.GameEvents??={
 on(name,fn){if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name).add(fn);return()=>listeners.get(name)?.delete(fn)},
 emit(name,payload){for(const fn of listeners.get(name)||[])fn(payload)}
};
GameEvents.on('input:move',({x=0,y=0})=>{for(const [direction,down] of Object.entries({left:x<0,right:x>0,up:y<0,down:y>0}))bridge.dispatch('move',{direction,down})});
GameEvents.on('input:action',({button})=>{if(button==='A')bridge.dispatch(bridge.inspect?.().mode==='dialogue'?'advance':'interact');if(button==='B')bridge.dispatch('menu')});
GameEvents.on('game:pause',()=>bridge.dispatch('menu'));
GameEvents.on('game:resume',()=>bridge.dispatch('close-menu'));
GameEvents.on('audio:volume',({mute})=>{if(typeof mute==='boolean'&&bridge.getState().sound===mute)bridge.dispatch('sound')});
let lastPage='',lastChapter='';
bridge.subscribe(({type,payload:p})=>{
 if(type==='dialogue'&&p.pageId!==lastPage){lastPage=p.pageId;GameEvents.emit('dialogue:show',{speaker:p.speaker,character:'player',portrait:'neutral',text:p.fullText,onComplete:()=>{bridge.dispatch('advance');if(bridge.inspect?.().mode==='dialogue'&&lastPage===p.pageId)bridge.dispatch('advance')}})}
 if(type==='dialogue-close'){lastPage='';GameEvents.emit('dialogue:close')}
 if(type==='state'){
  GameEvents.emit('quest:set',{title:p.title,objective:p.quest,progress:p.stars.length,total:5});
  GameEvents.emit('star:add',{count:p.stars.length,totalStars:5});
  if(lastChapter!==p.chapter){lastChapter=p.chapter;GameEvents.emit('chapter:transition',{chapterNumber:bridge.inspect?.().progress.chapter||0,title:p.title,subtitle:p.subtitle})}
 }
 if(type==='ending')GameEvents.emit('ending:show',{memoriesFound:5,totalMemories:5,confessionLetter:p.text,onRestart:()=>bridge.dispatch('restart')});
 // FOP/menu callbacks remain exposed through window.fop.dispatch; see contract.
});
