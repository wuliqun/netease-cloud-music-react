export interface ArrResult<T>{
    code:number,
    category:number,
    result:Array<T>,
    [propName:string]:any
}

export * from './comment'
export * from './playlist'
export * from './song'
export * from './search'