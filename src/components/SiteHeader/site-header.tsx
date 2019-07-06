import React from 'react';
import './site-header.scss';
import logo from './logo.svg';

const SiteHeader: React.FC = () => {
    return (
        <header className="site-header">
            <div className="header-wrapper clearfix">
                <h1 className="logo">
                    <span className="site-name">网易云音乐</span>
                    <img src={logo} alt="logo" className="logo-img"/>
                </h1>
                <div className="btn-wrapper">
                    <a href="javascript:void(0)" className="btn">下载APP</a>
                </div>
            </div>
        </header>
    );
}

export default SiteHeader