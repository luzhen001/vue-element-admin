const getters = {
    sidebar: state => state.app.sidebar,//{"opened":true,"withoutAnimation":false}
    //themeColor: state => state.app.themeColor,//主题颜色
    isSideLogo: state => state.app.isSideLogo,//是否显示菜单logo
    isFixedHeader: state => state.app.isFixedHeader,//是否固定header
    isTagsView: state => state.app.isTagsView,//是否显示tabsView
    isPinyinSearch: state => state.app.isPinyinSearch,//拼音搜索
    size: state => state.app.size,//布局大小
    device: state => state.app.device,//设备 desktop
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,//Token
    avatar: state => state.user.avatar,//头像
    name: state => state.user.name,//名称
    roles: state => state.user.roles,//角色
    permission_routes: state => state.permission.routes
}
export default getters