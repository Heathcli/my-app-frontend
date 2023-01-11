const isNodeEnv = () => {
    if (typeof window === "object") {
        return false
    }
    return true
}

const httpEnv = () => {
    return 'http://127.0.0.1:3333'
}

const getCookie = (name:string) => {
    if(isNodeEnv()) return ''
    const strCookie = document.cookie
    const cookieList = strCookie.split(';')
    //遍历匹配
    for ( var i = 0; i < cookieList.length; i++) {
        var arr = cookieList[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}

const parseSearch = (str:string) => {
    let searchList = str.slice(1).split('&')
    let searchObj:any = {}
    for (let i = 0; i < searchList.length; i++) {
        let searchItem = searchList[i].split('=')
        searchObj[searchItem[0]] = searchItem[1]
    }
    return searchObj
}


export {
    isNodeEnv,
    httpEnv,
    getCookie,
    parseSearch
}