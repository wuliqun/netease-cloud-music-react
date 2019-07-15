import React from 'react'
import { Link } from 'react-router-dom'
import Loading from 'components/Loading'
import SectionTitle from 'components/SectionTitle'
import { getTopSongList } from 'service'
import { SongWrap } from 'types'

import './top-songs.scss'

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
                {
                    this.state.songs.length ? 
                    <ul className="song-list">
                        { songItems }
                    </ul> :
                    <Loading/>

                }
            </div>
        )
    }
    renderSong(song:SongWrap):JSX.Element{
        return (
            <li className="song-item" key={song.id}>
                <Link to={'/song/' + song.id } className="song-link">
                    <div className="info">
                        <p className="name f-thide">
                            <span className="em">{ song.name }</span>
                            <span>{ (song.song.alias.length ? '（' + song.song.alias.join(' ') + '）':'') }</span>
                        </p>
                        <p className="ar f-thide">
                            { song.song.no === 1 && <span className="icon"></span> }
                            <span>{this.joinNames(song.song.artists) + '- ' + song.song.album.name}</span>
                        </p>
                    </div>
                    <div className="play-btn">
                    </div>
                </Link>
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