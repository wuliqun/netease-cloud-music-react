import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Loading from 'components/Loading'
import SongList from 'components/SongList'
import Comment from 'components/Comment'
import { getPlaylistDetail } from 'service'

import './playlist.scss'
import { PlaylistDetail } from 'types';

interface State{
    id:number,
    playlist:PlaylistDetail|null,
    descriptionFolded:boolean
}
class Playlist extends React.Component<RouteComponentProps<{id:string}>,State>{
    constructor(props:RouteComponentProps<{id:string}>){
        super(props);
        this.state = {
            id:0,
            playlist:null,
            descriptionFolded:true
        }
    }

    render():JSX.Element{
        return (
            <div className="playlist-detail">
                {
                    !this.state.playlist ? 
                    <div className="loading-wrapper">
                        <Loading />
                    </div> :
                    <div className="playlist-content">
                        <div className="header clearfix">
                            <div 
                                className="bg" 
                                style={{backgroundImage:'url('+this.state.playlist.creator.backgroundUrl+')'}}>                            
                            </div>
                            <div 
                                className="img-wrapper"
                                style={{backgroundImage:'url('+this.state.playlist.coverImgUrl+')'}}>                            
                                <div className="img">
                                    <div className="tag">歌单</div>
                                    <div className="play-count">
                                        <div className="icon"></div>
                                        <div className="count">{ this.count2str(this.state.playlist.playCount) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="info">
                                <div className="name f-thide-2">{ this.state.playlist.name }</div>
                                <div className="creator clearfix">
                                    <div className="avatar">
                                        <img src={this.state.playlist.creator.avatarUrl} alt=""/>
                                    </div>
                                    <div className="username f-thide">{ this.state.playlist.creator.nickname }</div>
                                </div>
                            </div>
                        </div>
                        <div className="desc">
                            {
                                !!this.state.playlist.tags.length &&
                                <div className="tags clearfix">
                                    <div className="label">标签：</div>
                                    { this.state.playlist.tags.map(item=>{
                                        return (
                                            <div className="tag-item" key={item}>{item}</div>
                                        )
                                    }) }
                                </div>
                            }
                            {
                                !!this.state.playlist.description &&
                                <div className="description">
                                    <p className={this.state.descriptionFolded ? 'f-thide-3' : ''}>
                                        简介：{ this.state.playlist.description }
                                    </p>
                                    <div className="fold" onClick={this.toggleFold.bind(this)}>
                                        <div className={this.state.descriptionFolded ? 'icon' : 'icon undo'}></div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="line-title">歌曲列表</div>
                        <SongList tracks={this.state.playlist.tracks.slice(0,50)}/>
                        <Comment id={this.state.id} type="playlist"/>
                    </div>
                }
            </div>
        )
    }
    count2str(n:number):string{
        if(n < 10000){
            return String(n);
        }else{
            return String(n).slice(0,-4) + '万';
        }
    }
    toggleFold():void{
        this.setState({
            descriptionFolded:!this.state.descriptionFolded
        })
    }
    componentDidMount():void{
        let id:number = Number(this.props.match.params.id);
        getPlaylistDetail(id).then(res=>{
            this.setState({
                id,
                playlist:res.playlist
            })
        })
    }
}

export default Playlist