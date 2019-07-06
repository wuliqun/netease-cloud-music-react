import React from 'react'
import SectionTitle from '../../../../components/SectionTitle'
import { getTopSongList } from '../../../../service'
import { SongWrap } from '../../../../types'

interface State{
    songs:Array<SongWrap>
}
class TopSongs extends React.Component<object,State>{
    constructor(props:object){
        super(props);
        this.state = {
            songs:[]
        }
        this.initData();
    }
    initData():void{
        getTopSongList().then(res=>{
            this.setState({
                songs:res.result
            })
        })
    }
    render():JSX.Element{
        const songItems = this.state.songs.map(item=>{
            return this.renderSong(item);
        })
        return (
            <div className="top-songs">
                <SectionTitle name="最新音乐" />
                <ul className="song-list">
                    { songItems }
                </ul>
            </div>
        )
    }
    renderSong(song:SongWrap):JSX.Element{
        return (
            <li className="song-item">
                <a href="" className="song-link">
                    <div className="info">
                        <p className="name">
                            {song.name + (song.song.alias.length ? '（' + song.song.alias.join(' ') + '）':'')}
                        </p>
                        <p className="ar">
                            {this.joinNames(song.song.artists) + '- ' + song.song.album.name}
                        </p>
                    </div>
                    <div className="play-btn">
                        <span></span>
                    </div>
                </a>
            </li>
        )
    }
    joinNames(list:Array<{name:string}>):string{
        return list.reduce((res,cur)=>{
            return res += cur.name + ' ';
        },'');
    }
}

export default TopSongs