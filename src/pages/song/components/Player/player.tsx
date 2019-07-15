import React from 'react'

import { getSongPlayingSrc } from 'service' 
import './player.scss'
import logo from './logo.svg'
import lyric from './lyric.json'
import { transform } from '@babel/core';

interface Props{
    id:number,
    img:string,
    name:string,
    artist:string,
    scrollOff:(height:number)=>void
}
interface lyricItem{
    time:number,
    txt:string
}
interface State{
    discRotateDeg:number,
    playing:boolean,
    audio:HTMLAudioElement|null,
    timer:number|null,
    lyrics:lyricItem[],
    lyricIndex:number, // 播放位置
    src:string
}
class Player extends React.Component<Props,State>{
    player:HTMLDivElement|null = null
    constructor(props:Props){
        super(props);
        this.state = {
            discRotateDeg:0,
            playing:false,
            audio:null,
            timer:null,
            lyrics:[],
            lyricIndex:0,
            src:''
        }        
    }
    render():JSX.Element{
        const lyricItems:JSX.Element[] = this.state.lyrics.map((item,index)=>{
            return this.renderLyric(item,index);
        })
        return(
            <div className="player-wrapper" ref={ele=>this.player = ele}>
                <div className="tap-area" onClick={this.togglePlayStatus.bind(this)}></div>
                <h1 className="logo">
                    <img src={logo} alt=""/>
                </h1>
                <div className="album">
                    <div className="al" style={{transform:'rotate(' + this.state.discRotateDeg + 'deg)'}}>
                        <div className="img">
                            <img src={this.props.img} alt=""/>
                        </div>                        
                    </div>
                    {
                        !this.state.playing &&
                        <div className="play-btn"></div>
                    }
                </div>
                <div className="song-info">
                    <span className="name">{ this.props.name }</span>
                    <span className="sep">-</span>
                    <span className="ar">{ this.props.artist }</span>
                </div>
                <div className="lyric">
                    <div 
                        className="lyric-list"
                        style={{transform:'translateY(-'+ this.state.lyricIndex*30 + 'px)'}}>
                        { lyricItems }
                    </div>
                </div>
                <div className="scroll-up">
                    <p className="more">因为歌词接口问题，以上歌词与歌曲无关 ></p>
                    <div className="btn-wrapper" onClick={this.hidePlayer.bind(this)}>
                        <div className="btn-icon"></div>
                    </div>
                </div>
            </div>
        )
    }
    hidePlayer():void{
        if(this.player){
            let height:number = this.player.offsetHeight;
            this.props.scrollOff(height);
        }        
    }
    initLyric():void{
        var rawLyric:string = lyric.lyric;
        let lyrics:lyricItem[] = rawLyric.split('[').slice(1).map(item=>{
            var timeTxt:string[] = item.split(']');
            return {
                txt:timeTxt[1].replace('↵',' '),
                time:this.formatMillsec(timeTxt[0])
            }
        });
        this.setState({
            lyrics
        });
    }
    renderLyric(lyric:lyricItem,index:number):JSX.Element{
        let lyricIndex = this.state.lyricIndex;
        return (
            <p className={index === lyricIndex ? 'lyric-item active':'lyric-item'}
                key={ lyric.time + lyric.txt }>
                { lyric.txt }
            </p>
        )
    }
    formatMillsec(s:string):number{
        var strs:string[] = s.split(':');
        var result:number = 0;
        if(strs.length === 3){
            result += Number(strs[0])*60*60;
            strs = strs.slice(1);
        }
        result += Number(strs[0])*60;
        result += Number(strs[1]);
        return result;
    }
    togglePlayStatus(){
        var status = !this.state.playing;        
        if(status){
            this.play();
        }else{
            this.pause();
        }
    }
    rotateDisc():void{
        if(this.state.audio){
            let time:number = this.state.audio.currentTime;
            let { lyricIndex, lyrics } = this.state;
            if(lyrics.length && lyrics[lyricIndex + 1].time - time < 0.3){
                this.setState({
                    lyricIndex:lyricIndex + 1
                })
            }
            if(this.state.audio.ended){
                this.pause();
            }
        }
        if(this.state.timer){
            clearTimeout(this.state.timer);
        }
        var deg = this.state.discRotateDeg;
        deg += 1;
        if(deg === 360) deg = 0;
        this.setState({
            discRotateDeg:deg
        });
        if(this.state.playing){
            this.setState({
                timer:window.setTimeout(()=>{
                    this.rotateDisc();
                },60)
            })
        }
    }
    play():void{
        var { src,audio } = this.state
        if(!audio && src){
            audio = new Audio(src);
            this.setState({
                audio
            })
        }
        audio && audio.play();
        this.setState({
            playing:true
        },()=>{
            this.rotateDisc(); 
        });                      
    }
    pause(){
        var audio:HTMLAudioElement|null = this.state.audio;
        audio && audio.pause();
        this.setState({
            playing:false,
            timer:null
        });
    }
    componentDidMount():void{
        getSongPlayingSrc(this.props.id).then(res=>{
            this.setState({
                src:res
            });
        });
        this.initLyric();
    }
    componentWillUnmount():void{
        var audio:HTMLAudioElement|null = this.state.audio;
        audio && audio.pause();
        if(this.state.timer) clearTimeout(this.state.timer);
    }
}

export default Player