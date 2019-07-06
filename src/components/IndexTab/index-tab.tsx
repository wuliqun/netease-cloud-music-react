import React from 'react'
import { indexTabProp } from '../../types'
import './index-tab.scss'

class IndexTab extends React.Component<Partial<indexTabProp>>{
    render(){
        return (
            <div className="index-tab" style={{top:this.props.top}}>
                <ul className="tab-list clearfix">
                    <li className="tab-item">
                        <a className="tab-link active">推荐音乐</a>
                    </li>
                    <li className="tab-item">
                        <a className="tab-link">热歌榜</a>
                    </li>
                    <li className="tab-item">
                        <a className="tab-link">搜索</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default IndexTab