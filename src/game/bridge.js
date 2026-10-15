const listeners = new Set();
export const bridge = {handler:null,state:{},subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},getState(){return this.state},dispatch(action,payload){this.handler?.(action,payload)},emit(type,payload){if(type==='state')this.state=payload;for(const fn of listeners)fn({type,payload})}};
window.fop=bridge;
