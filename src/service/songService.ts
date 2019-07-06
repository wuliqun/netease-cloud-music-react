import axios from 'axios'
import { ArrResult,SongWrap } from '../types'
const getTopSongList = ():Promise<ArrResult<SongWrap>>=>{
    return axios.get('/personalized/newsong').then(res=>{
        return res.data;
    });
}

export {
    getTopSongList
}