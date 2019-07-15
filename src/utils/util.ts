function formatNumber(n:number):string{
    return n > 9 ? String(n) : '0' + String(n);
}

function formatDate(d:number|Date,formatStr:string='YYYY年MM月DD日 hh:mm:ss'):string{
    let n:number = Number(d);
    if(Number.isNaN(n)){
        n = Date.now();
    }
    let time = new Date(n);
    return formatStr.replace(/Y+|M+|D+|h+|m+|s+/g,function(s:string){
        switch(s[0]){
            case 'Y':
                if(s.length === 2){
                    return String(time.getFullYear()).slice(2);
                }
                return String(time.getFullYear());
            case 'M':
                return formatNumber(time.getMonth() + 1);
            case 'D':
                return formatNumber(time.getDate());
            case 'h':
                return formatNumber(time.getHours());
            case 'm':
                return formatNumber(time.getMinutes());
            case 's':
                return formatNumber(time.getSeconds());
            default:
                return '';
        }
    })
}

function formatCount(n:number):string{
    if(n >= 100000000){
        return (n/100000000).toFixed(1) + '亿';
    }else if(n >= 10000){
        return (n/10000).toFixed(0) + '万';
    }else{
        return String(n);
    }
}

export {
    formatDate,
    formatNumber,
    formatCount
}