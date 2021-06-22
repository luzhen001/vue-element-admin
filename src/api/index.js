import ajaxRequest from './request'

//登录
export const loginIn = () => {
    return ajaxRequest('/api/login/loginIn', 'get', {});
}
//退出登录
export const loginOut = () => {
    return ajaxRequest('/api/login/loginOut','get',{});
}
//获取用户信息
export const getUserInfo = () => {
    return ajaxRequest('/api/login/userInfo','get',{})
}

//复制
export const getClipList = () => {
    return ajaxRequest('/api/copy/list', 'get', {});
}
//excel
export const getExcelList = () => {
    return ajaxRequest('/api/excel/list', 'get', {});
}
//zip
export const getZipList = () => {
    return ajaxRequest('/api/zip/list', 'get', {});
}