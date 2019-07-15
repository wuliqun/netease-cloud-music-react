import React from 'react'

import { getComments } from 'service'
import {formatDate} from 'utils/util'
import { comment } from 'types'

import './comment.scss'
import thumb from './thumb.svg'

interface Props{
    id:number,
    type:string,
    inPlayer:boolean
}
interface State{
    hotComments:Array<comment> | null,
    comments:Array<comment> | null,
    commentCount:number
}

class Comment extends React.Component<Props,State>{
    static defaultProps = {
        inPlayer:false
    }
    constructor(props:Props){
        super(props);
        this.state = {
            hotComments:null,
            comments:null,
            commentCount:0
        }
    }
    render():JSX.Element{
        if(!this.state.hotComments || !this.state.comments){
            return (
                <div></div>
            )
        }
        const hotCommentItems = this.state.hotComments.map(item=>{
            return this.renderComment(item);
        });
        const commentItems = this.state.comments.map(item=>{
            return this.renderComment(item);
        });
        return (
            <div className={ this.props.inPlayer ? 'm-comment in-player' : 'm-comment' }>
                {
                    !!this.state.hotComments.length &&
                    <div className="hot">
                        <div className="line-title">精彩评论</div>
                        <ul className="comment-list">
                            { hotCommentItems }
                        </ul>
                    </div>
                }
                <div className="normal">
                    <div className="line-title">最新评论({this.state.commentCount})</div>
                    <ul className="comment-list">
                        { commentItems }
                    </ul>
                </div>
            </div>
        )

    }
    renderComment(cmt:comment):JSX.Element{
        return(
            <li className="comment-item" key={cmt.commentId}>
                <div className="avatar">
                    <img src={cmt.user.avatarUrl} alt=""/>
                </div>
                <div className="cnt">
                    <div className="top">
                        <div className="user">
                            <div className="name f-thide">{cmt.user.nickname}</div>
                            <div className="time">{formatDate(cmt.time,'Y年M月D日')}</div>
                        </div>
                        <div className="like-info">
                            <span className="num">{cmt.likedCount ? cmt.likedCount : ''}</span>
                            <img src={thumb} className="thumb"></img>
                        </div>
                    </div>
                    <div className="info">
                        <div className="txt">{cmt.content}</div>
                        {
                            !!cmt.beReplied.length && 
                            <div className="reply">
                                @{cmt.beReplied[0].user.nickname}:{cmt.beReplied[0].content}
                            </div>
                        }
                    </div>                    
                </div>
                
            </li>
        )
    }
    fetchComments():void{
        getComments(this.props.id,this.props.type).then(res=>{
            this.setState({
                hotComments:res.hotComments,
                comments:res.comments,
                commentCount:res.total
            });
        })
    }
    componentDidMount():void{
        this.fetchComments();
    }
}

export default Comment