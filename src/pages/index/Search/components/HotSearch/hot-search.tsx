import React from 'react'
import { HotSearchItem } from 'types'

import './hot-search.scss'
interface Props{
    list:Array<HotSearchItem>,
    handleClick:(index:number)=>void
}
class HotSearch extends React.Component<Props,object>{
    render():JSX.Element{
        const items = this.props.list.map((item,index)=>{
            return this.renderItem(item.first,index);
        });
        return (
            <div className="hot-search">
                <div className="title">
                    热门搜索
                </div>
                <ul className="hot-search-list">
                    { items }
                </ul>
            </div>
        )
    }
    renderItem(key:string,index:number):JSX.Element{
        return (
            <li 
                className="hot-search-item" 
                key={key} 
                onClick={()=>{this.props.handleClick(index)}}>
                { key }
            </li>
        )
    }
}

export default HotSearch