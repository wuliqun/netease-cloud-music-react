import React from 'react'
import { NavLink } from 'react-router-dom'

import './index-tab.scss'

interface Props{
    top:number,
    [propName:string]:any
}
class IndexTab extends React.Component<Partial<Props>>{
    render(){
        return (
            <div className="index-tab" style={{top:this.props.top}}>
                <ul className="tab-list clearfix">
                    <li className="tab-item">
                        <NavLink to="/" exact className="tab-link">推荐音乐</NavLink>
                    </li>
                    <li className="tab-item">
                        <NavLink to="/toplist" className="tab-link">热歌榜</NavLink>
                    </li>
                    <li className="tab-item">
                        <NavLink to="/search" className="tab-link">搜索</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default IndexTab