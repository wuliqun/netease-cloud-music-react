import React from 'react'
import { SongDetail, PlaylistDetail } from 'types'
import { RouteComponentProps } from 'react-router-dom'
import { getSongDetail } from 'service'

import Loading from 'components/Loading'
import Comment from 'components/Comment'
import Bottom from './components/Bottom'
import Player from './components/Player'

import './song.scss'
import LinkedPlaylist from './components/LinkedPlaylist/linked-playlist';

interface State{
    song:SongDetail|null,
    id:number,
    playlists:Array<PlaylistDetail>
}

class Song extends React.Component<RouteComponentProps<{id:string}>,State>{
    scrollElement:HTMLDivElement|null = null
    constructor(props:RouteComponentProps<{id:string}>){
        super(props);
        this.state = {
            song:null,
            id:0,
            playlists:[]
        }        
    }
    componentDidMount(){
        this.initData();
        document.body.scrollTop = 1;
        document.documentElement.scrollTop = 1;
    }
    render():JSX.Element{
        if(!this.state.song){
            return (
                <div style={{padding:'50px 0'}}>
                    <Loading />
                </div>
            )
        }
        return (
            <div className="song-detail">
                <div className="song-content">
                    <div className="song-bg" style={{backgroundImage:'url(//music.163.com/api/img/blur/' + this.state.song.al.pic +')'}}></div>
                    <div className="song-scroll" ref={(ele)=>this.scrollElement = ele}>
                        <Player 
                            id={this.state.id}
                            img={this.state.song.al.picUrl}
                            name={this.state.song.name}
                            scrollOff={this.scrollOffPlayer.bind(this)}
                            artist={this.state.song.ar[0].name} />
                        {
                            !!this.state.playlists.length &&
                            <LinkedPlaylist playlists={this.state.playlists}/>
                        }
                        <Comment 
                            inPlayer={true}
                            type="music"
                            id={this.state.id}/>
                    </div>
                    <div className="foot">
                        <Bottom />
                    </div>
                </div>
            </div>
        )
    }
    initData():void{
        var id:number = Number(this.props.match.params.id);
        this.setState({
            id
        });   
        getSongDetail(id).then(song=>{
            this.setState({
                song:song
            })
        });
        
    }
    // 将player滚动出屏幕
    scrollOffPlayer(height:number):void{
        if(this.scrollElement){
            this.animateScroll(this.scrollElement,height,300);
        }
    }
    animateScroll(ele:HTMLElement,scrollTop:number,duration:number = 500,interval:number = 15):void{
        let originScrollTop:number = ele.scrollTop;
        let count = Math.round(duration/interval);  //40ms 执行一次
        let distance = (scrollTop - originScrollTop) / count;  //每次滚动的距离
        let time = 0;
        let timerId = setInterval(()=>{
            time ++;
            if(time === count){
                ele.scrollTop = scrollTop;
                clearInterval(timerId);
            }else{
                ele.scrollTop = originScrollTop + time * distance;
            }
        },interval);
    }
}

export default Song