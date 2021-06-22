const constantRoutes = [
    {
        path: '/redirect',
        component: 'layout/Layout',
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: 'views/redirect/index'
            }
        ]
    },
    {
        path: '/login',
        component: 'views/login/index',
        hidden: true
    },
    {
        path: '/404',
        component: 'views/errorpage/404',
        hidden: true
    },
    {
        path: '/401',
        component: 'views/errorpage/401',
        hidden: true
    },
    {
        path: '',
        component: 'layout/Layout',
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: 'views/dashboard/index',
                name: 'Dashboard',
                meta: { title: '数据看板', icon: 'dashboard', affix: true }
            }
        ]
    }
]
const asyncRoutes = [
    {
        path: '/permission',
        component: 'layout/Layout',
        redirect: '/permission/index',
        alwaysShow: true,
        meta: {
            title: '权限设置',
            icon: 'lock',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'page',
                component: 'views/permission/page',
                name: 'PagePermission',
                meta: {
                    title: '页面权限',
                    roles: ['admin']
                }
            },
            {
                path: 'directive',
                component: 'views/permission/directive',
                name: 'DirectivePermission',
                meta: {
                    title: '指令权限'
                }
            },
            {
                path: 'role',
                component: 'views/permission/role',
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
        component: 'layout/Layout',
        children: [
            {
                path: 'index',
                component: 'views/icons/index',
                name: 'Icons',
                meta: { title: '字体图标', icon: 'icon', noCache: true }
            }
        ]
    },

    {
        path: '/components',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        name: 'ComponentDemo',
        meta: {
            title: '组件',
            icon: 'component'
        },
        children: [
            {
                path: 'tinymce',
                component: 'views/components-demo/tinymce',
                name: 'TinymceDemo',
                meta: { title: '富文本编辑器' }
            },
            {
                path: 'dropzone',
                component: 'views/components-demo/dropzone',
                name: 'DropzoneDemo',
                meta: { title: 'Dropzone编辑' }
            },
            {
                path: 'sticky',
                component: 'views/components-demo/sticky',
                name: 'StickyDemo',
                meta: { title: 'Sticky固定' }
            },
            {
                path: 'count-to',
                component: 'views/components-demo/count-to',
                name: 'CountToDemo',
                meta: { title: 'CountTo组件' }
            },
            {
                path: 'mixin',
                component: 'views/components-demo/mixin',
                name: 'ComponentMixinDemo',
                meta: { title: '小组件' }
            },
            {
                path: 'back-to-top',
                component: 'views/components-demo/back-to-top',
                name: 'BackToTopDemo',
                meta: { title: '返回顶部' }
            },
            {
                path: 'drag-dialog',
                component: 'views/components-demo/drag-dialog',
                name: 'DragDialogDemo',
                meta: { title: '拖拽Dialog' }
            },
            {
                path: 'drag-select',
                component: 'views/components-demo/drag-select',
                name: 'DragSelectDemo',
                meta: { title: '拖拽Select' }
            },
            {
                path: 'dnd-list',
                component: 'views/components-demo/dnd-list',
                name: 'DndListDemo',
                meta: { title: '列表拖拽' }
            },
            {
                path: 'drag-kanban',
                component: 'views/components-demo/drag-kanban',
                name: 'DragKanbanDemo',
                meta: { title: '可拖拽看板' }
            },
            {
                path: 'star-score',
                component: 'views/components-demo/star-score',
                name: 'starScore',
                meta: { title: '星星评分'}
            }
        ]
    },
    {
        path: '/charts',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        name: 'Charts',
        meta: {
            title: '图表插件',
            icon: 'chart'
        },
        children: [
            {
                path: 'line',
                component: 'views/charts/line',
                name: 'LineChart',
                meta: { title: '折线图', noCache: true }
            },
            {
                path: 'pie',
                component: 'views/charts/pie',
                name: 'PieChart',
                meta: { title: '饼图', noCache: true }
            },
            {
                path: 'keyboard',
                component: 'views/charts/keyboard',
                name: 'KeyboardChart',
                meta: { title: '键盘图表', noCache: true }
            },
            {
                path: 'mixchart',
                component: 'views/charts/mixChart',
                name: 'MixChart',
                meta: { title: '混合图表', noCache: true }
            }
        ]
    },
    {
        path: '/nested',
        component: 'layout/Layout',
        redirect: '/nested/menu1/menu1-1',
        name: 'Nested',
        meta: {
            title: '路由嵌套',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: 'views/nested/menu1/index',
                name: 'Menu1',
                meta: { title: '菜单一' },
                redirect: '/nested/menu1/menu1-1',
                children: [
                    {
                        path: 'menu1-1',
                        component: 'views/nested/menu1/menu1-1',
                        name: 'Menu1-1',
                        meta: { title: '菜单1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: 'views/nested/menu1/menu1-2',
                        name: 'Menu1-2',
                        redirect: '/nested/menu1/menu1-2/menu1-2-1',
                        meta: { title: '菜单1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                                name: 'Menu1-2-1',
                                meta: { title: '菜单1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                                name: 'Menu1-2-2',
                                meta: { title: '菜单1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: 'views/nested/menu1/menu1-3',
                        name: 'Menu1-3',
                        meta: { title: '菜单1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                name: 'Menu2',
                component: 'views/nested/menu2/index',
                meta: { title: '菜单二' }
            }
        ]
    },

    {
        path: '/example',
        component: 'layout/Layout',
        redirect: '/example/list',
        name: 'Example',
        meta: {
            title: '综合实例',
            icon: 'example'
        },
        children: [
            {
                path: 'create',
                component: 'views/example/create',
                name: 'CreateArticle',
                meta: { title: '创建文章', icon: 'edit' }
            },
            {
                path: 'edit/:id(\\d+)',
                component: 'views/example/edit',
                name: 'EditArticle',
                meta: { title: '编辑文章', noCache: true },
                hidden: true
            },
            {
                path: 'list',
                component: 'views/example/list',
                name: 'ArticleList',
                meta: { title: '文章列表', icon: 'list' }
            }
        ]
    },

    {
        path: '/tab',
        component: 'layout/Layout',
        children: [
            {
                path: 'index',
                component: 'views/tab/index',
                name: 'Tab',
                meta: { title: '表格Tab', icon: 'tab' }
            }
        ]
    },
    {
        path: '/error',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: '错误页面',
            icon: '404'
        },
        children: [
            {
                path: '401',
                component: 'views/error-page/401',
                name: 'Page401',
                meta: { title: '401页面', noCache: true }
            },
            {
                path: '404',
                component: 'views/error-page/404',
                name: 'Page404',
                meta: { title: '404页面', noCache: true }
            }
        ]
    },
    {
        path: '/excel',
        component: 'layout/Layout',
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
            title: '表格excel',
            icon: 'excel'
        },
        children: [
            {
                path: 'export-excel',
                component: 'views/excel/export-excel',
                name: 'ExportExcel',
                meta: { title: '导出表格' }
            },
            {
                path: 'export-selected-excel',
                component: 'views/excel/select-excel',
                name: 'SelectExcel',
                meta: { title: '导出已选择项' }
            },
            {
                path: 'export-merge-header',
                component: 'views/excel/merge-header',
                name: 'MergeHeader',
                meta: { title: '导出多级表头' }
            },
            {
                path: 'upload-excel',
                component: 'views/excel/upload-excel',
                name: 'UploadExcel',
                meta: { title: '上传Excel' }
            }
        ]
    },
    {
        path: '/zip',
        component: 'layout/Layout',
        redirect: '/zip/download',
        alwaysShow: true,
        meta: { title: 'ZIP相关', icon: 'zip' },
        children: [
            {
                path: 'download',
                component: 'views/zip/index',
                name: 'ExportZip',
                meta: { title: '导出ZIP' }
            }
        ]
    },
    {
        path: '/pdf',
        component: 'layout/Layout',
        redirect: '/pdf/index',
        name: 'PDF',
        meta: {
            title: 'PDF相关',
            icon: 'pdf'
        },
        children: [
            {
                path: 'index',
                component: 'views/pdf/index',
                name: 'PDF',
                meta: { title: 'PDF相关' }
            },
            {
                path: 'download',
                component: 'views/pdf/download',
                name: 'PDF',
                meta: { title: 'PDF打印' }
            }
        ]
    },
    {
        path: '/clipboard',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        children: [
            {
                path: 'index',
                component: 'views/clipboard/index',
                name: 'ClipboardDemo',
                meta: { title: '复制', icon: 'clipboard' }
            }
        ]
    },
    {
        path: 'external-link',
        component: 'layout/Layout',
        children: [
            {
                path: 'https://mp.weixin.qq.com',
                meta: { title: '外链', icon: 'link' }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
module.exports = {
    constantRoutes,
    asyncRoutes
}