import React from 'react';
// import logo from './logo.svg';
import SiteHeader from './components/SiteHeader'
import SiteBottom from './components/SiteBottom'
import Loading from './components/Loading'
import PlaylistList from './pages/index/components/playlistList'
import IndexTab from './components/IndexTab'
import TopSongs from './pages/index/components/TopSongs'

import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <SiteHeader />
            <IndexTab props={{top:'84px'}}/> 
            <PlaylistList />      
            <TopSongs />
            <SiteBottom />
        </div>
    );
}

export default App;
