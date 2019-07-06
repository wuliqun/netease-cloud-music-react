export interface indexTabProp{
    top:number,
    [propName:string]:any
}

export interface Playlist{
    id:number,
    type:number,
    name:string,
    copywriter:string,
    picUrl:string,
    playCount:number,
    trackCount:number,
    highQuality:boolean,
    [propName:string]:any
}

export interface ArrResult<T>{
    code:number,
    category:number,
    result:Array<T>,
    [propName:string]:any
}
export interface Song{
    id:number,
    name:string,
    alias:string[],
    artists:Artist[],
    album:Album,
    starred:boolean,
    duration:number,
    starredNum:number,
    [propName:string]:any
}
export interface SongWrap{
    id:number,
    type:number,
    name:string,
    copywriter:string|null,
    picUrl:string|null,
    canDislike:boolean,
    alg:string,
    song:Song
}
export interface Artist{
    name:string,
    picUrl:string,
    id:number,
    briefDesc:string,
    alias:string[],
    img1v1Url:string,
    albumSize:number,
    musicSize:number,
    [propName:string]:any
}

export interface Album{
    name:string,
    id:number,
    size:number,
    blurPicUrl:string,
    companyId:number,
    picUrl:string,
    publishTime:number,
    description:string,
    tags:string|string[],
    company:string,
    briefDesc:string,
    artist:Artist,
    artists:Artist[],
    alias:string[],
    songs:Song[],
    copyrightId:number,    
    [propName:string]:any
}
