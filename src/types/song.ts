export interface Song{
    id:number,
    name:string,
    alias:string[],
    artists:Artist[],
    album:Album,
    starred:boolean,
    duration:number,
    starredNum:number,
    no:number,
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

export interface SongDetail{
    name:string,
    id:number,
    pst: 0,
    t: 0,
    ar:Array<{
        id:number,
        name:string,
        [propName:string]:any
    }>,
    al: {
        id:number,
        name:string,
        picUrl:string,
        pic:number,
        [propName:string]:any
    },
    dt:number,
    h: {
        br: 320000,
        fid: 0,
        size: 13070578,
        vd: 0.109906
    },
    m: {
        br: 160000,
        fid: 0,
        size: 6549371,
        vd: 0.272218
    },
    l: {
        br: 96000,
        fid: 0,
        size: 3940469,
        vd: 0.228837
    },
    no:number,
    copyright:number,
    mark:number,
    mv:number,
    publishTime:number
}