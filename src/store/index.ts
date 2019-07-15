import { createStore, AnyAction } from 'redux';
import initState from './state';

// this is a reducer,a function like  (state,action)=>state
function SearchHistory(historys:string[] = initState,action:AnyAction):string[]{
    let history:string;
    switch(action.type){
        case 'ADD_HISTORY':
            history = action.payload;
            return [history,...historys.filter(item=>item !== history)];
        case 'REMOVE_HISTORY':
            history = action.payload;
            return historys.filter(item => item!==history);
        case 'CLEAR_HISTORY':
            return [];
        case "SAVE_HISTORY":
            localStorage.setItem('search-history',JSON.stringify(historys));        
        default:
            return historys;
    }
}

let historyStore = createStore(SearchHistory);


export {
    historyStore
}