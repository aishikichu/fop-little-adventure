export const STAR_IDS=['hello','pocket','fop','room','garden'];
export const fresh=()=>({version:1,chapter:0,stars:[],seen:[],completed:false,sound:true});
export function sanitize(raw){const s=fresh();if(!raw||raw.version!==1)return s;s.chapter=Math.max(0,Math.min(5,Math.trunc(Number(raw.chapter)||0)));s.stars=[...new Set((Array.isArray(raw.stars)?raw.stars:[]).filter(x=>STAR_IDS.includes(x)))];s.seen=[...new Set((Array.isArray(raw.seen)?raw.seen:[]).filter(x=>typeof x==='string'))];s.completed=raw.completed===true&&s.stars.length===5;s.sound=raw.sound!==false;return s;}
export function load(storage){try{return sanitize(JSON.parse(storage.getItem('fop-save-v1')))}catch{return fresh()}}
export function save(storage,state){try{storage.setItem('fop-save-v1',JSON.stringify(state));return true}catch{return false}}
export function award(state,id){if(STAR_IDS.includes(id)&&!state.stars.includes(id))state.stars.push(id)}
export function ready(state,chapter){if(chapter==='enjp')return state.seen.includes('meet');return state.stars.includes(chapter)}
