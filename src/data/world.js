import {story} from './story.js';
import {layout} from './layout.js';
const emotes={meet:['wink','neutral','shy','wink'],'hello-note':['curious','wink'],'hello-star':['love'],merchant:['neutral','shy'], 'pocket-spoon':['neutral','curious','love'],'pocket-noise':['neutral','love'],'pocket-pocket':['wink'],'room-chat':['neutral','wink','love'],'room-call':['love','neutral','wink','wink'],'room-music':['curious','wink'],'room-keepsake':['love'],'room-silly':['wink'],'garden-flowers':['curious','love'],bench:['shy','neutral','love','love','love','neutral']};
const visuals={merchant:'memoryFrame','pocket-spoon':'book','pocket-noise':'plant','pocket-pocket':'memoryFrame','frog-small':'fox','frog-many':'fox','choir':'fox', 'hello-note':'book','room-chat':'desk','room-call':'call','room-music':'memoryFrame','room-keepsake':'music','room-silly':'book'};
export const chapters=story.scenes.map((s,i)=>({
 ...s,subtitle:i===0?'PROLOGUE':`CHAPTER ${String(i).padStart(2,'0')}`,quest:s.objective,color:layout[i].color,
 objects:s.interactions.map((o,j)=>{
  const config=layout[i].objects[j];
  return {...config,...o,kind:visuals[o.id]||config.kind,cue:s.id==='pocket'?undefined:config.cue,character:o.id==='frog-small'?'player':(o.speaker.startsWith('fox')||o.speaker==='companion'||o.speaker==='memma')?'companion':'player',emotes:emotes[o.id]||['neutral']};
 }).filter(o=>o.dialogue.length||o.ending||o.puzzle),
}));
export const obstacles=[{x:80,y:64,w:46,h:35},{x:280,y:65,w:56,h:28},{x:540,y:220,w:42,h:65},{x:80,y:275,w:55,h:32}];
export const lines={locked:[story.system.lockedExit],benchLocked:[story.system.lockedBench],gardenSeat:story.scenes[5].interactions.find(o=>o.id==='bench').dialogue,fopIntro:story.scenes[3].interactions.find(o=>o.id==='choir').dialogue,fopWin:story.scenes[3].completionDialogue,fopMiss:story.scenes[3].mistakeMessage,fopReady:story.ui.fopReady,roomDone:story.scenes[4].completionDialogue,pocketDone:story.scenes[2].completionDialogue,gate:'Follow the lanterns →',saveFailed:story.system.saveFailed};
