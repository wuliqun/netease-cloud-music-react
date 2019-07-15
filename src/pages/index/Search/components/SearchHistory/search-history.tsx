import React from 'react'
import './search-history.scss'

interface Props{
    history:string[],
    handleClick:(index:number)=>void,
    handleDelete:(index:number)=>void
}
class SearchHistory extends React.Component<Props,object>{
    render():JSX.Element{
        const items = this.props.history.map((key,index)=>{
            return this.renderItem(key,index);
        });
        return (
            <ul className="search-history-list">
                { items }
            </ul>
        )
    }
    renderItem(key:string,index:number):JSX.Element{
        return (
            <li className="history-item" key={key}>
                <div className="icon-clock"></div>
                <div className="content">
                    <span
                        className="txt"
                        onClick={()=>{this.props.handleClick(index)}}>{ key }</span>
                    <div 
                        onClick={()=>{this.props.handleDelete(index)}}
                        className="close">
                        <span className="close-icon"></span>
                    </div>
                </div>
            </li>
        )
    }
}

export default SearchHistory