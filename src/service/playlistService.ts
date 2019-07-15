import axios from 'axios'
import { Playlist,ArrResult,PlaylistDetailResult } from '../types'
const getRecommendPlaylist = ():Promise<ArrResult<Playlist>>=>{
    return axios.get('/personalized').then(res=>{
        return res.data;
    });
}

const getPlaylistDetail = (id:number = 1):Promise<PlaylistDetailResult> =>{
    return axios.get('/playlist/detail',{
        params:{
            id:id
        }
    }).then(res=>res.data);
}
export {
    getRecommendPlaylist,
    getPlaylistDetail
}