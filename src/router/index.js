import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Layout from '@/layout'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from 'utils/auth'

Vue.use(Router)

/**
    当设置hidden为true的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    hidden: true 默认 false

    当设置 noRedirect 的时候该路由在面包屑导航中不可被点击 redirect: 'noRedirect'

    当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    若你想不管路由下面的 children 声明的个数都显示你的根路由
    你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由  alwaysShow: true

    name: 'router-name' 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        roles: ['admin', 'editor'] 设置该路由进入的权限，支持多个权限叠加
        title: 'title' 设置该路由在侧边栏和面包屑中展示的名字
        icon: 'svg-name' 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
        noCache: true 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        breadcrumb: false 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
        affix: true 若果设置为true，它则会固定在tags-view中(默认 false)

        当路由设置了该属性，则会高亮相对应的侧边栏。
        这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
        点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
        activeMenu: '/article/list'
    }
*/

/**
 * constantRoutes
 * 没有权限要求的基页 所有角色都可访问
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('views/errorpage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('views/errorpage/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '数据看板', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/userAccount',
        component: Layout,
        redirect: '/userAccount/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('views/userAccount/index'),
                name: 'userAccount',
                meta: { title: '个人中心', noCache: true }
            },
            {
                path: 'modifyPwd',
                component: () => import('views/userAccount/modifyPwd'),
                name: 'modifyPwd',
                meta: { title: '修改密码', noCache: true }
            }
        ]
    }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
            title: '权限设置',
            icon: 'lock',
            roles: ['admin', 'editor'] //you can set roles in root nav
        },
        children: [
            {
                path: 'page',
                component: () => import('views/permission/page'),
                name: 'PagePermission',
                meta: {
                    title: '页面权限',
                    roles: ['admin'] //or you can only set roles in sub nav
                }
            },
            {
                path: 'directive',
                component: () => import('views/permission/directive'),
                name: 'DirectivePermission',
                meta: {
                    title: '指令权限'
                    // if do not set roles, means: this page does not require permission
                }
            },
            {
                path: 'role',
                component: () => import('views/permission/role'),
                name: 'RolePermission',
                meta: {
                    title: '角色权限',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/icon',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('views/icons/index'),
                name: 'Icons',
                meta: { title: '字体图标', icon: 'icon', noCache: true }
            }
        ]
    },
    {
        path: '/components',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ComponentDemo',
        meta: {
            title: '常用组件',
            icon: 'component'
        },
        children: [
            {
                path: 'tinymce',
                component: () => import('views/components-demo/tinymce'),
                name: 'TinymceDemo',
                meta: { title: '富文本编辑器' }
            },
            {
                path: 'dropzone',
                component: () => import('views/components-demo/dropzone'),
                name: 'DropzoneDemo',
                meta: { title: 'Dropzone编辑' }
            },
            {
                path: 'sticky',
                component: () => import('views/components-demo/sticky'),
                name: 'StickyDemo',
                meta: { title: 'Sticky固定' }
            },
            {
                path: 'count-to',
                component: () => import('views/components-demo/count-to'),
                name: 'CountToDemo',
                meta: { title: 'CountTo组件' }
            },
            {
                path: 'mixin',
                component: () => import('views/components-demo/mixin'),
                name: 'ComponentMixinDemo',
                meta: { title: '小组件' }
            },
            {
                path: 'back-to-top',
                component: () => import('views/components-demo/back-to-top'),
                name: 'BackToTopDemo',
                meta: { title: '返回顶部' }
            },
            {
                path: 'drag-dialog',
                component: () => import('views/components-demo/drag-dialog'),
                name: 'DragDialogDemo',
                meta: { title: '拖拽Dialog' }
            },
            {
                path: 'drag-select',
                component: () => import('views/components-demo/drag-select'),
                name: 'DragSelectDemo',
                meta: { title: '拖拽Select' }
            },
            {
                path: 'dnd-list',
                component: () => import('views/components-demo/dnd-list'),
                name: 'DndListDemo',
                meta: { title: '列表拖拽' }
            },
            {
                path: 'drag-kanban',
                component: () => import('views/components-demo/drag-kanban'),
                name: 'DragKanbanDemo',
                meta: { title: '可拖拽看板' }
            },
            {
                path:'star-score',
                component: () => import('views/components-demo/star-score'),
                name:'starScore',
                meta:{title:'星星评分'}
            },
            {
                path:'tree',
                component: () => import('views/components-demo/tree'),
                name:'Tree',
                meta:{
                    title:'树状图'
                }
            }
        ]
    },
    {
        path: '/charts',
        component: Layout,
        redirect: 'noRedirect',
        name: 'Charts',
        meta: {
            title: '图表插件',
            icon: 'chart'
        },
        children: [
            {
                path: 'line',
                component: () => import('views/charts/line'),
                name: 'LineChart',
                meta: { title: '折线图', noCache: true }
            },
            {
                path:'pie',
                component:() => import('views/charts/pie'),
                name:'PieChart',
                meta:{ title: '饼图', noCache: true}
            },
            {
                path: 'keyboard',
                component: () => import('views/charts/keyboard'),
                name: 'KeyboardChart',
                meta: { title: '键盘图表', noCache: true }
            },
            {
                path: 'mix-chart',
                component: () => import('views/charts/mix-chart'),
                name: 'MixChart',
                meta: { title: '混合图表', noCache: true }
            }
        ]
    },
    {
        path: '/nested',
        component: Layout,
        redirect: 'noRedirect',
        name: 'Nested',
        meta: {
            title: '路由嵌套',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: '菜单一' },
                redirect: '/nested/menu1/menu1-1',
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: '菜单1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        redirect: '/nested/menu1/menu1-2/menu1-2-1',
                        meta: { title: '菜单1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: '菜单1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: '菜单1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: '菜单1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                name: 'Menu2',
                component: () => import('views/nested/menu2/index'),
                meta: { title: '菜单二' }
            }
        ]
    },
    {
        path: '/table',
        component: Layout,
        redirect: 'noRedirect',
        name: 'Table',
        meta: {
            title: '表格Table',
            icon: 'table'
        },
        children: [
            {
                path: 'dynamic-table',
                component: () => import('views/table/dynamic-table/index'),
                name: 'DynamicTable',
                meta: { title: '动态 Table' }
            },
            {
                path: 'drag-table',
                component: () => import('views/table/drag-table'),
                name: 'DragTable',
                meta: { title: '拖拽 Table' }
            },
            {
                path: 'inline-edit-table',
                component: () => import('views/table/inline-edit-table'),
                name: 'InlineEditTable',
                meta: { title: '编辑 Table' }
            },
            {
                path: 'complex-table',
                component: () => import('views/table/complex-table'),
                name: 'ComplexTable',
                meta: { title: '综合 Table' }
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        redirect: 'noRedirect',
        name: 'Example',
        meta: {
            title: '综合实例',
            icon: 'list'
        },
        children: [
            {
                path: 'create',
                component: () => import('views/example/create'),
                name: 'CreateArticle',
                meta: { title: '创建文章', icon: 'edit' }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('views/example/edit'),
                name: 'EditArticle',
                meta: { title: '编辑文章', noCache: true, activeMenu: '/example/list' },
                hidden: true
            },
            {
                path: 'list',
                component: () => import('views/example/list'),
                name: 'ArticleList',
                meta: { title: '文章列表', icon: 'list' }
            }
        ]
    },
    {
        path: '/tab',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('views/tab/index'),
                name: 'Tab',
                meta: { title: '表格Tab', icon: 'tab' }
            }
        ]
    },
    {
        path: '/excel',
        component: Layout,
        redirect: 'noRedirect',
        name: 'Excel',
        meta: {
            title: '表格excel',
            icon: 'excel'
        },
        children: [
            {
                path: 'export-excel',
                component: () => import('views/excel/export-excel'),
                name: 'ExportExcel',
                meta: { title: '导出表格' }
            },
            {
                path: 'export-selected-excel',
                component: () => import('views/excel/select-excel'),
                name: 'SelectExcel',
                meta: { title: '导出已选择项' }
            },
            {
                path: 'export-merge-header',
                component: () => import('views/excel/merge-header'),
                name: 'MergeHeader',
                meta: { title: '导出多级表头' }
            },
            {
                path: 'upload-excel',
                component: () => import('views/excel/upload-excel'),
                name: 'UploadExcel',
                meta: { title: '上传Excel' }
            }
        ]
    },
    {
        path: '/zip',
        component: Layout,
        redirect: 'noRedirect',
        alwaysShow: true,
        name: 'ZIP',
        meta: { title: 'zip相关', icon: 'zip' },
        children: [
            {
                path: 'download',
                component: () => import('views/zip/index'),
                name: 'ExportZip',
                meta: { title: '导出ZIP' }
            }
        ]
    },
    {
        path: '/pdf',
        component: Layout,
        redirect: 'noRedirect',
        name: 'PDF',
        meta: {
            title: 'pdf相关',
            icon: 'pdf'
        },
        children: [
            {
                path: 'index',
                component: () => import('views/pdf/index'),
                name: 'PDFAbout',
                meta: { title: 'PDF相关' }
            },
            {
                path: 'download',
                component: () => import('views/pdf/download'),
                name: 'PDFPrint',
                meta: { title: 'PDF打印' }
            }
        ]
    },
    {
        path: '/clipboard',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('views/clipboard/index'),
                name: 'ClipboardDemo',
                meta: { title: '复制', icon: 'clipboard' }
            }
        ]
    },
    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://mp.weixin.qq.com',
                meta: { title: '外链', icon: 'link' }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404', //404页必须放在末尾
        hidden: true
    }
]
const createRouter = () => new Router({
    mode: 'hash',
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 })
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}
NProgress.inc(0.2)
NProgress.configure({ easing:'cubic-bezier', speed:500, showSpinner: false })
const whiteList = ['/login','/401','/404'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            console.log(111);
            next({ path: '/' });
            NProgress.done();
        } else {
            //确定用户是否通过getInfo获取了权限角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0; //true/false
            if (hasRoles) {
                next();
            } else {
                try {
                    //获取用户信息
                    //注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor']
                    const { roles } = await store.dispatch('user/getInfo');
                    //基于角色生成可访问路由图
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
                    //动态添加可访问路由
                    router.addRoutes(accessRoutes)
                    //确保addRoutes完整的hack方法
                    //设置replace:true，这样导航就不会留下历史记录
                    next({ ...to, replace: true })
                } catch (error) {
                    //删除令牌并转到登录页面重新登录
                    await store.dispatch('user/resetToken');
                    Message.error(error || 'Has Error');
                    next(`/login`);
                    NProgress.done();
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            //在免费登录白名单中，直接进入
            next();
        } else {
            //其他没有访问权限的页面将被重定向到登录页面。
            next(`/login`);
            NProgress.done();
        }
    }
})
router.afterEach((to,from) => {
    NProgress.done()
})
export default router