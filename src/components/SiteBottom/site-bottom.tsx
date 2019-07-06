import React from 'react'
import footLogo from './foot-logo.svg'
import './site-bottom.scss'

const SiteBottom:React.FC = ()=>{
    return (
        <footer className="site-footer">
            <div className="logo">
                <img src={footLogo} alt="foot-logo" className="logo-img"/>
            </div>
            <div className="btn-wrapper">
                <a className="btn">打开APP，发现更多好音乐 ></a>
            </div>
            <div className="copyright">
                <span>基于React typescript的个人实践项目 @Quino</span>
            </div>
        </footer>
    )
}

export default SiteBottom