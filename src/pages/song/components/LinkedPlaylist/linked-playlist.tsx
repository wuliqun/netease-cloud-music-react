import React from 'react'
import { Link } from 'react-router-dom'

import './linked-playlist.scss'
import { PlaylistDetail } from 'types';
import { formatCount } from 'utils/util'

interface Props{
    playlists:Array<PlaylistDetail>
}

class LinkedPlaylist extends React.Component<Props,object>{
    render():JSX.Element{

        return (
            <div className="linked-playlist">
                <div className="tit">包含这首歌的歌单</div>
                <div className="playlist">
                    {this.props.playlists.map(item=>{
                        return (
                            <div className="playlist-item">
                                <Link 
                                    to={'/playlist/' + item.id}
                                    className="item-link">
                                    <div className="img-wrapper">
                                        <img src={item.coverImgUrl} alt=""/>
                                        <div className="play-count">
                                            <span className="icon-ear"></span>
                                            <span className="num">{formatCount(item.playCount)}</span>
                                        </div>
                                    </div>
                                    <div className="name f-thide">{item.name}</div>
                                    <div className="ar f-thide">by {item.creator.nickname}</div>
                                </Link>
                            </div>
                        )
                    })}                    
                </div>
            </div>
        )
    }
}

export default LinkedPlaylist