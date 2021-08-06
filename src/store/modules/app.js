import Cookies from 'js-cookie';

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',//设备
    size: Cookies.get('size') || 'medium',//默认尺寸
    showSideBar:Cookies.get('showSideBar') ? Cookies.get("showSideBar") === 'true' : true,//显示侧边栏
    fixedSideBar:Cookies.get('fixedSideBar') ? Cookies.get("fixedSideBar") === 'true' : true,//固定侧边栏
    isSideLogo: Cookies.get("isSideLogo") ? Cookies.get("isSideLogo") === 'true' : true,//是否显示logo
    isFixedHeader: Cookies.get('isFixedHeader') ? Cookies.get('isFixedHeader') === 'true' : true,//是否固定头部
    isTagsView: Cookies.get('isTagsView') ? Cookies.get('isTagsView') === 'true' : true,//是否开启tagsView
    isPinyinSearch: Cookies.get('isPinyinSearch') ? Cookies.get('isPinyinSearch') === 'true' : true//是否支持拼音搜索路由
}
const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1);
        } else {
            Cookies.set('sidebarStatus', 0);
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0);
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device;
    },
    SET_SIZE: (state, size) => {
        state.size = size;
        Cookies.set('size', size);
    },
    //主题颜色
    // SET_THEMECOLOR: (state, themeColor) =>{
    //     state.themeColor = themeColor;
    //     Cookies.set('themeColor', themeColor);
    // },
    //显示侧栏Logo
    SET_SIDEBARLOGO: (state, isSideLogo) => {
        state.isSideLogo = isSideLogo;
        Cookies.set('isSideLogo', isSideLogo);
    },
    //固定Header
    SET_FIXEDHEADER: (state, isFixedHeader) => {
        state.isFixedHeader = isFixedHeader;
        Cookies.set('isFixedHeader', isFixedHeader);
    },
    //显示sidebar
    SET_SHOWSIDEBAR:(state,showSideBar)=>{
        state.showSideBar = showSideBar;
        Cookies.set('showSideBar',showSideBar);
    },
    //固定sidebar
    SET_FIXEDSIDEBAR:(state,fixedSideBar)=>{
        state.fixedSideBar = fixedSideBar;
        Cookies.set('fixedSideBar',fixedSideBar);
    },
    //开启Tags-View
    SER_TAGSVIEW: (state, isTagsView) => {
        state.isTagsView = isTagsView;
        Cookies.set('isTagsView', isTagsView);
    },
    //拼音搜索
    SET_PINYINSEARCH: (state, isPinyinSearch) => {
        state.isPinyinSearch = isPinyinSearch;
        Cookies.set('isPinyinSearch', isPinyinSearch);
    }
}
const actions = {
    toggleSideBar ({ commit }) {
        commit('TOGGLE_SIDEBAR');
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice ({ commit }, device) {
        commit('TOGGLE_DEVICE', device);
    },
    setSize ({ commit }, size) {
        commit('SET_SIZE', size);
    },
    // setThemeColor({ commit }, themeColor){
    //     commit('SET_THEMECOLOR', themeColor);
    // },
    setSidebarLogo ({ commit }, isSideLogo) {
        commit('SET_SIDEBARLOGO', isSideLogo);
    },
    setFixedHeader ({ commit }, isFixedHeader) {
        commit('SET_FIXEDHEADER', isFixedHeader);
    },
    setTagsView ({ commit }, isTagsView) {
        commit('SER_TAGSVIEW', isTagsView);
    },
    setPinyinSearch ({ commit }, isPinyinSearch) {
        commit('SET_PINYINSEARCH', isPinyinSearch);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}