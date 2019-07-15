import { Album, Artist } from "./song";

export interface HotSearchItem{
    first:string,
    second:number,
    third:any,
    iconType:number
}

export interface HotSearchResult{
    code:number,
    result:{
        hots:Array<HotSearchItem>
    }
}

export interface SearchSuggestItem{
    keyword:string,
    type:number,
    alg:string,
    lastKeyword:string
}
export interface SearchSuggestResult{
    code:number,
    result:{
        allMatch:Array<SearchSuggestItem>
    }
}

export interface SearchSongItem{
    id:number,
    name:string,
    artists:Array<Artist>,
    album:Album,
    duration:number,
    copyrightId:number,
    alias:string[],
    mvid:number|null,
    mark:number,
    [propName:string]:any

}
export interface SearchSongResult{
    code:number,
    result:{
        songs:Array<SearchSongItem>,
        songCount:number
    }
}