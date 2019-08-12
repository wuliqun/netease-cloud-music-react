import React from 'react';
import IndexCommon from 'pages/index'
import Default from 'pages/index/default'
import TopSongList from 'pages/index/TopSongList'
import Search from 'pages/index/Search'
import Song from 'pages/song'
import Playlist from 'pages/playlist'

import { historyStore } from 'store'
import { Route,Switch } from 'react-router'
import { HashRouter as Router } from 'react-router-dom'

import './App.css';

class App extends React.Component {
    render():JSX.Element{
        return (
            <Router>
                <Switch>               
                    <Route path="/song/:id" component={Song}/> 
                    <Route path="/playlist/:id" component={Playlist}/>
                    <IndexCommon>                
                        <Route path="/" exact component={Default} />
                        <Route path="/toplist" component={TopSongList} />
                        <Route path="/search" component={Search} />
                    </IndexCommon>                             
                </Switch>
            </Router>
        );
    }
}
window.onbeforeunload = ()=>{
    historyStore.dispatch({
        type:'SAVE_HISTORY'
    });
}

export default App;
