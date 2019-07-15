import React from 'react'
import { SearchSuggestItem } from 'types'
import './search-suggest.scss'

interface Props{
    suggests:Array<SearchSuggestItem>,
    keyword:string,
    handleClick:(keyword:string)=>void
}
class SearchSuggest extends React.Component<Props,object>{
    render():JSX.Element{
        const items = this.props.suggests.map(item=>{
            return this.renderItem(item.keyword);
        });
        return (
            <div className="search-suggest">
                <div 
                    className="key"
                    onClick={ ()=>{this.props.handleClick(this.props.keyword)} }>
                    搜索 “{ this.props.keyword }”
                </div>
                <ul className="suggest-list">
                    { items }
                </ul>
            </div>
        )
    }
    renderItem(keyword:string):JSX.Element{
        return (
            <li 
                className="suggest-item" 
                key={ keyword }
                onClick={ ()=>{this.props.handleClick(keyword)} }>
                <div className="search-icon"></div>
                <div className="txt">{ keyword }</div>
            </li>
        )
    }
}

export default SearchSuggest