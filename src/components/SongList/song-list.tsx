import React from 'react'
import { Link } from 'react-router-dom'
import { Track } from 'types'
import {formatNumber } from 'utils/util'

import './song-list.scss'

interface Props{
    tracks:Array<Track>
}

class SongList extends React.Component<Props,object>{
    render():JSX.Element{
        const trackItems = this.props.tracks.map((item,index)=>{
            return this.renderTrack(item,index);
        })
        return (
            <ul className="song-list">
                { trackItems }
            </ul>
        )
    }

    renderTrack(track:Track,i:number):JSX.Element{
        return (
            <li className="track-item" key={track.id}>
                <Link to={ '/song/' + track.id  } className="item-link">
                    <div className={i < 3 ? 'order top3' : 'order'}>
                        { formatNumber(i + 1) }
                    </div>
                    <div className="info">
                        <p className="name f-thide">
                            <span className="em">{ track.name }</span>                            
                        </p>
                        <p className="ar f-thide">
                            { track.no === 1 && <span className="icon"></span> }
                            <span>{track.ar[0].name + '- ' + track.al.name}</span>
                        </p>
                    </div>
                    <div className="play-btn"></div>
                </Link>
            </li>
        )
    }
}

export default SongList