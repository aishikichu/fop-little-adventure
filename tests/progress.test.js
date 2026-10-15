import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fresh,sanitize,award,ready,load,save,STAR_IDS} from '../src/game/progress.js';
test('five unique stars and chapter gates',()=>{const s=fresh();assert.equal(ready(s,'enjp'),false);s.seen.push('meet');assert.equal(ready(s,'enjp'),true);for(const id of STAR_IDS){award(s,id);award(s,id);assert.equal(ready(s,id),true)}assert.equal(s.stars.length,5)});
test('corrupt and unavailable storage cannot break play',()=>{assert.deepEqual(load({getItem(){throw Error()}}),fresh());assert.equal(save(null,fresh()),false);assert.equal(sanitize({version:1,chapter:900,stars:['hello','hello','fake'],completed:true}).completed,false);assert.equal(sanitize({version:1,chapter:-4}).chapter,0)});
test('save and restore all progress',()=>{let value;const storage={getItem:()=>value,setItem:(k,v)=>value=v};const s=fresh();s.chapter=5;s.stars=[...STAR_IDS];s.completed=true;s.seen=['meet'];save(storage,s);assert.deepEqual(load(storage),s)});
