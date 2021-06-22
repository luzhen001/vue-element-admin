import { loginIn, loginOut, getUserInfo } from 'api'
import { getToken, setToken, removeToken } from 'utils/auth'
import router, { resetRouter } from '@/router'
const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }
}
const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            loginIn({ username: username.trim(), password: password }).then(res => {
                const { result } = res;
                commit('SET_TOKEN', result.token);
                setToken(result.token);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(res => {
                const { result } = res;
                if (!result) {
                    reject('验证失败，请重新登录！');
                }
                const { roles, name, avatar } = result
                //角色必须是非空数组
                if (!roles || roles.length <= 0) {
                    reject('验证失败，请重新登录！');
                }
                commit('SET_ROLES', roles);
                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    logOut({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            loginOut(state.token).then(() => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                removeToken();
                resetRouter();
                dispatch('tagsView/delAllViews', null, { root: true });
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },
    //remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
        });
    },
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token';
            commit('SET_TOKEN', token);
            setToken(token);
            const { roles } = await dispatch('getInfo');
            resetRouter();
            //基于角色生成可访问路由图
            const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true });
            // 动态添加可访问路由
            router.addRoutes(accessRoutes);
            //重置访问的视图和缓存的视图
            dispatch('tagsView/delAllViews', null, { root: true });
            resolve();
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}