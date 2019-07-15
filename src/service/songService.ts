import axios from 'axios'
import { ArrResult,SongWrap,SongDetail } from '../types'

const getTopSongList = ():Promise<ArrResult<SongWrap>>=>{
    return axios.get('/personalized/newsong').then(res=>{
        return res.data;
    });
}

const getSongDetail = (id:string|number):Promise<SongDetail>=>{
    return axios.get('/song/detail',{
        params:{
            ids:id
        }
    }).then(res=>res.data.songs[0])
}

const getSongPlayingSrc = (id:number|string):Promise<string> =>{
    return axios.get('/song/url',{
        params:{
            id
        }
    }).then(res=>res.data.data[0].url);
}
export {
    getTopSongList,
    getSongDetail,
    getSongPlayingSrc
}