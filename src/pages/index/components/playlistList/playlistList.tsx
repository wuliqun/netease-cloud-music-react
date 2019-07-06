import React from 'react'
import SectionTitle from '../../../../components/SectionTitle'
import './playlistList.scss'
import { getRecommendPlaylist } from '../../../../service'
import { Playlist } from '../../../../types'
interface State{
    playlists:Array<Playlist>
}
class PlaylistList extends React.Component<object,State>{
    constructor(props:object){
        super(props);
        this.state = {
            playlists:[]
        }
        this.initData();
    }
    initData():void{
        getRecommendPlaylist().then(res=>{
            console.log(res);
            this.setState({
                playlists:res.result.slice(0,9)
            });
        });
    }
    render():JSX.Element{
        const listItems:JSX.Element[] = this.state.playlists.map(playlist=>{
            return this.renderItem(playlist);
        })
        return(
            <div className="j-playlist">
                <SectionTitle name="推荐歌单"/>
                <ul className="playlist-list clearfix">
                    { listItems }
                </ul>
            </div>
        )
    }
    renderItem(playlist:Playlist):JSX.Element{
        return (
            <li className="playlist-item">
                <a href="" className="playlist-link">
                    <div className="img img-wrapper">
                        <img 
                            src={playlist.picUrl}
                            alt="playlist picture"/>
                    </div>
                    <p 
                        className="name f-thide-2">
                        {playlist.name}
                    </p>
                </a>
            </li>
        )
    }
}

export default PlaylistList