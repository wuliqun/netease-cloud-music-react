import React from 'react'
import { Link } from 'react-router-dom'
import { SearchSongItem } from 'types'

import './search-result.scss'

interface Props{
    songs:Array<SearchSongItem>,
    keyword:string
}

class SearchResult extends React.Component<Props,object>{
    render():JSX.Element{
        const songItems:Array<JSX.Element> = this.props.songs.map(item=>{
            return this.renderSong(item);
        })
        return (
            <div className="search-result">
                <ul className="song-list">
                    { songItems }
                </ul>
            </div>
        )
    }

    renderSong(song:SearchSongItem):JSX.Element{
        return (
            <li className="song-item" key={song.id}>
                <Link
                    className="song-link"
                    to={'song/' + song.id}>
                    <div className="info">
                        <p className="name f-thide">
                            { this.renderWithKeyword(song.name) }
                        </p>
                        <p className="ar f-thide">
                        { song.mvid !== null && <span className="icon"></span> }
                            <span>
                                {this.renderWithKeyword(this.joinNames(song.artists))}
                                <span> - </span>
                                {this.renderWithKeyword(song.album.name)}
                            </span>
                        </p>
                    </div>
                    <div className="play-btn"></div>
                </Link>
            </li>
        )
    }
    renderWithKeyword(s:string):JSX.Element{
        let keyword:string = this.props.keyword;
        let parts:string[] = s.split(keyword);
        const tem:{__html:string} = {__html:parts.join(`<em class="em-key">${keyword}</em>`)};
        return(
            <span dangerouslySetInnerHTML={tem}>
            </span>
        )
    }
    joinNames(list:Array<{name:string}>):string{
        return list.reduce((res,cur)=>{
            return res += cur.name + ' ';
        },'');
    }
}

export default SearchResult