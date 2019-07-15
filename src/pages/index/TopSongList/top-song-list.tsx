import React from 'react'

import Loading from 'components/Loading'
import SongList from 'components/SongList'

import { getPlaylistDetail } from 'service'
import { formatDate } from 'utils/util'
import { PlaylistDetail,Track } from 'types'

import './top-song-list.scss'

interface State{
    playlist:PlaylistDetail|null,
    showNumber:number
}

class TopSongList extends React.Component<object,State>{
    constructor(props:object){
        super(props);
        this.state = {
            playlist:null,
            showNumber:20
        }
    }
    initData():void{
        getPlaylistDetail(1).then(res=>{
            this.setState({
                playlist:res.playlist
            })
        })
    }
    componentDidMount(){
        this.initData();
    }
    render():JSX.Element{
        let tracks:Array<Track> = [];
        if(this.state.playlist){
            var count:number = this.state.showNumber || this.state.playlist.tracks.length;
            tracks = this.state.playlist.tracks.slice(0,count);
        }
        return (
            <div className="top-song-list">
                {
                    !this.state.playlist && 
                    <div className="loading-wrapper">
                        <Loading />
                    </div>
                }
                {
                    this.state.playlist &&
                    <div>
                        <div className="banner-wrapper">
                            <div className="banner">
                                <div className="banner-icon"></div>
                                <div className="time">
                                    更新时间：{formatDate(this.state.playlist.updateTime,'MM月DD日')}
                                </div>
                            </div>                        
                        </div>
                        <SongList tracks={tracks} />
                        {
                            !!this.state.showNumber &&
                            <div className="show-all">
                                <a href="javascript:void(0)" onClick={()=>this.showAllTracks()}>显示完整榜单 ></a>
                            </div>
                        }
                    </div>                    
                }
            </div>
        )
    }
    showAllTracks():void{
        this.setState({
            showNumber:0
        });
    }
}

export default TopSongList