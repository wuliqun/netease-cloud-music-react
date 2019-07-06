import React from 'react'
import './loading.scss'

const Loading:React.FC = () =>{
    return (
        <div className="j-loading">
            <div className="loading-content clearfix">
                <div className="loading-item loading-item-1"></div>
                <div className="loading-item loading-item-2"></div>
                <div className="loading-item loading-item-3"></div>
                <div className="loading-item loading-item-4"></div>
            </div>
        </div>
    )
}

export default Loading