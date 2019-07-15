interface user{
    vipType:number,
    userType:number,
    nickname:string,
    authStatus:number,
    avatarUrl:string,
    userId:number,
    [propName:string]:any
}
interface replyComment{
    user:user,
    beRepliedCommentId:number,
    content:string,
    status:number,
    [propName:string]:any
}
export interface comment{
    user:user,
    status:number,
    commentId:number,
    content:string,
    time:number,
    likedCount:number,
    repliedMark:boolean,
    beReplied:Array<replyComment>,
    [propName:string]:any
}

export interface CommentResult{
    total:number,
    userId:number,
    more:boolean,
    moreHot:boolean,
    hotComments:Array<comment>,
    comments:Array<comment>,
    code:number,
    [propName:string]:any
}