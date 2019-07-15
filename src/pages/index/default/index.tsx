import React from 'react'
import SiteBottom from 'components/SiteBottom'
import PlaylistList from '../components/playlistList'
import TopSongs from '../components/TopSongs'

class indexDefault extends React.Component<object,object>{
    render():JSX.Element{
        return (
            <div>
                <PlaylistList />
                <TopSongs />
                <SiteBottom />
            </div>
        )
    }
}

export default indexDefault