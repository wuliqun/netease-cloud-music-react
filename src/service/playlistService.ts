import axios from 'axios'
import { Playlist,ArrResult } from '../types'
const getRecommendPlaylist = ():Promise<ArrResult<Playlist>>=>{
    return axios.get('/personalized').then(res=>{
        return res.data;
    });
}

export {
    getRecommendPlaylist
}