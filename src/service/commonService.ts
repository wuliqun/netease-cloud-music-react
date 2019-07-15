import axios from 'axios'
import { HotSearchResult,SearchSuggestResult,SearchSongResult,CommentResult } from 'types'

const getHotSearch = ():Promise<HotSearchResult> =>{
    return axios.get('/search/hot').then(res=>res.data);
}

const getSearchSuggest = (keyword:string,type:string='mobile'):Promise<SearchSuggestResult> =>{
    return axios.get('/search/suggest',{
        params:{
            keywords:keyword,
            type
        }
    }).then(res=>res.data);
}

const getSongSearchResult = (keyword:string,type:number = 1):Promise<SearchSongResult> =>{
    return axios.get('/search',{
        params:{
            keywords:keyword,
            type
        }
    }).then(res=>res.data);
}

const getComments = (id:number,type:string = 'song'):Promise<CommentResult>=>{
    return axios.get('/comment/' + type,{
        params:{
            id
        }
    }).then(res=>res.data);
}
export {
    getHotSearch,
    getSearchSuggest,
    getSongSearchResult,
    getComments
}