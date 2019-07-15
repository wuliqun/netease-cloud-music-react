import React from 'react'
import { historyStore } from 'store'
import {
    SearchSongItem,
    SearchSuggestItem,
    HotSearchItem
} from 'types'
import {
    getHotSearch,
    getSearchSuggest,
    getSongSearchResult
} from 'service'
import Loading from 'components/Loading'
import HotSearch from './components/HotSearch'
import SearchHistory from './components/SearchHistory'
import SearchSuggest from './components/SearchSuggest'
import SearchResult from './components/SearchResult'
import SearchInput from './components/SearchInput'

interface State{
    hotSearch:Array<HotSearchItem>,
    searchSuggests:Array<SearchSuggestItem>,
    songs:Array<SearchSongItem>,
    searchHistory:string[],
    keyword:string,
    searched:boolean
}

class Search extends React.Component<object,State>{
    constructor(props:object){
        super(props);
        this.state = {
            hotSearch:[],
            searchSuggests:[],
            songs:[],
            searchHistory:historyStore.getState(),
            keyword:'',
            searched:false
        }
        this.fetchHotSearch();
    }
    render():JSX.Element{
        return (
            <div>
                <SearchInput
                    value={this.state.keyword}
                    handleInput={this.handleInput.bind(this)}
                    handleClearInput={this.handleClearInput.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleFocus={this.inputFocus.bind(this)}/>
                { 
                    !this.state.keyword &&
                    <HotSearch 
                        list={ this.state.hotSearch }
                        handleClick={ this.handleHotSearchItemClick.bind(this) } />
                }
                {
                    !this.state.keyword &&
                    <SearchHistory 
                        history={ this.state.searchHistory }
                        handleClick={ this.handleHistoryClick.bind(this) }
                        handleDelete={ this.deleteHistory.bind(this) }/>
                }
                {
                    this.state.keyword && !this.state.searched && !!this.state.searchSuggests.length &&                    
                    <SearchSuggest 
                        suggests={ this.state.searchSuggests }
                        keyword={ this.state.keyword }
                        handleClick={ this.handleSuggestClick.bind(this) }
                        />
                }
                {
                    this.state.keyword && !this.state.searched && !this.state.searchSuggests.length &&                    
                    <Loading />
                }
                {
                    this.state.searched && !!this.state.songs.length &&
                    <SearchResult
                        songs={ this.state.songs }
                        keyword={ this.state.keyword }/>
                }
                {
                    this.state.searched && !this.state.songs.length &&
                    <Loading />
                }
            </div>
        )
    }
    handleSuggestClick(keyword:string):void{
        this.searchForKeyword(keyword);
    }
    handleHotSearchItemClick(index:number):void{
        this.searchForKeyword(this.state.hotSearch[index].first);
    }
    handleHistoryClick(index:number):void{
        this.searchForKeyword(this.state.searchHistory[index]);
    }
    searchForKeyword(keyword:string):void{
        this.setState({
            searched:true
        })
        this.setState({
            keyword
        })
        this.addHistory(keyword);
        getSongSearchResult(keyword).then(res=>{
            this.setState({
                songs:res.result.songs || []
            });            
        })
    }
    deleteHistory(index:number):void{
        var history:string = this.state.searchHistory[index];
        historyStore.dispatch({
            type:'REMOVE_HISTORY',
            payload:history
        });
    }
    inputFocus():void{
        if(this.state.keyword){
            this.setState({
                songs:[],
                searchSuggests:[],
                searched:false
            })
            this.fetchSearchSuggest(this.state.keyword);
        }
    }
    handleInput(keyword:string):void{
        this.setState({
            keyword:keyword,
            searchSuggests:[]
        });
        if(keyword){
            this.fetchSearchSuggest(keyword);
        }
    }
    handleClearInput():void{
        this.setState({
            keyword:'',
            searched:false,
            songs:[],
            searchSuggests:[]
        })
    }
    handleSubmit():void{
        let keyword:string = this.state.keyword;
        this.setState({
            searched:false,
            songs:[]
        });
        if(keyword){
            this.searchForKeyword(keyword);
        }
    }
    addHistory(keyword:string){
        historyStore.dispatch({
            type:'ADD_HISTORY',
            payload:keyword
        })
    }
    fetchHotSearch():void{
        getHotSearch().then(res=>{
            this.setState({
                hotSearch:res.result.hots
            })
        })
    }
    fetchSearchSuggest(keyword:string):void{
        if(!keyword){
            return;
        }
        getSearchSuggest(keyword).then(res=>{
            if(res.result.allMatch){
                this.setState({
                    searchSuggests:res.result.allMatch
                });
            }
        })
    }
    componentDidMount():void{
        historyStore.subscribe(()=>{
            this.setState({
                searchHistory:historyStore.getState()
            })
        })
    }
}

export default Search