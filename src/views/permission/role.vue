<template>
    <div class="app-container">
        <el-button type="primary" @click="handleAddRole">添加角色</el-button>
        <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="角色秘钥" width="220">
                <template slot-scope="scope">{{ scope.row.key }}</template>
            </el-table-column>
            <el-table-column align="center" label="角色名称" width="220">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="描述">
                <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :title="dialogType==='edit'?'编辑角色':'新增角色'">
            <div class="role_wrap">
                <el-form :model="role" label-width="80px" label-position="left">
                    <el-form-item label="名称">
                        <el-input v-model="role.name" placeholder="Role Name" />
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="role.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Role Description" />
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
                    </el-form-item>
                </el-form>
                <div style="text-align:right;">
                    <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                    <el-button type="primary" @click="confirmRole">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import path from 'path'
import { deepClone } from 'utils/index'
import {asyncRoutes, constantRoutes} from 'utils/routerList'
const defaultRole = {
    key: '',
    name: '',
    description: '',
    routes: []
}
export default {
    data() {
        return {
            role: Object.assign({}, defaultRole),
            routes: [],
            rolesList: [],
            dialogVisible: false,
            dialogType: 'new',
            checkStrictly: false,
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            routesList:deepClone([...constantRoutes, ...asyncRoutes])
        }
    },
    computed: {
        routesData() {
            return this.routes
        }
    },
    created() {
        this.getRoutesList();
        this.getRolesList();
    },
    methods: {
        //角色列表
        async getRolesList() {
            const roles = [
                {
                    key: 'admin',
                    name: 'admin',
                    description: '超级管理员。有权查看所有页面。',
                    routes: this.routesList
                },
                {
                    key: 'editor',
                    name: 'editor',
                    description: '普通编辑器。可以查看除权限页以外的所有页面',
                    routes: this.routesList.filter(i => i.path !== '/permission')
                },
                {
                    key: 'visitor',
                    name: 'visitor',
                    description: '只是个访客。只能查看主页和文档页',
                    routes: [{
                        path: '',
                        redirect: 'dashboard',
                        children: [
                        {
                            path: 'dashboard',
                            name: 'Dashboard',
                            meta: { title: 'dashboard', icon: 'dashboard' }
                        }
                        ]
                    }]
                }
            ]
            this.rolesList = roles;
        },
        //路由列表
        async getRoutesList() {
            this.serviceRoutes = this.routesList;
            this.routes = this.generateRoutes(this.routesList);
        },
        //重塑routes结构，使其看起来与侧边栏相同
        generateRoutes(routes, basePath = '/') {
            const res = [];
            for (let route of routes) {
                if (route.hidden) { continue }
                const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
                if (route.children && onlyOneShowingChild && !route.alwaysShow) {
                    route = onlyOneShowingChild
                }
                const data = {
                    path: path.resolve(basePath, route.path),
                    title: route.meta && route.meta.title
                }
                if (route.children) {
                    data.children = this.generateRoutes(route.children, data.path)
                }
                res.push(data);
            }
            return res;
        },
        generateArr(routes) {
            let data = []
            routes.forEach(route => {
                data.push(route)
                if (route.children) {
                    const temp = this.generateArr(route.children)
                if (temp.length > 0) {
                    data = [...data, ...temp]
                }
                }
            })
            return data;
        },
        handleAddRole() {
            this.role = Object.assign({}, defaultRole);
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedNodes([]);
            }
            this.dialogType = 'new';
            this.dialogVisible = true;
        },
        //编辑角色
        handleEdit(scope) {
            this.dialogType = 'edit';
            this.dialogVisible = true;
            this.checkStrictly = true;
            this.role = deepClone(scope.row);
            this.$nextTick(() => {
                const routes = this.generateRoutes(this.role.routes);
                this.$refs.tree.setCheckedNodes(this.generateArr(routes));
                // 设置节点的选中状态不影响其父节点和子节点
                this.checkStrictly = false;
            });
        },
        //删除角色
        handleDelete({ $index, row }) {
            this.$confirm('确定要删除这个角色?', '温馨提示', {
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '想一想',
            }).then(async() => {
                this.rolesList.splice($index, 1);
                this.$message({
                    type: 'success',
                    showClose:true,
                    message: '删除成功！'
                });
            }).catch(err => { console.error(err) })
        },
        generateTree(routes, basePath = '/', checkedKeys) {
            const res = []
            for (const route of routes) {
                const routePath = path.resolve(basePath, route.path)
                if (route.children) {
                    route.children = this.generateTree(route.children, routePath, checkedKeys)
                }
                if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
                    res.push(route)
                }
            }
            return res;
        },
        async confirmRole() {
            const isEdit = this.dialogType === 'edit';
            const checkedKeys = this.$refs.tree.getCheckedKeys();
            this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys);
            if (isEdit) {
                //await updateRole(this.role.key, this.role);
                for (let index = 0; index < this.rolesList.length; index++) {
                    if (this.rolesList[index].key === this.role.key) {
                        this.rolesList.splice(index, 1, Object.assign({}, this.role));
                        break;
                    }
                }
            } else {
                //const { data } = await addRole(this.role);
                this.role.key = data.key;
                this.rolesList.push(this.role);
            }
            const { description, key, name } = this.role;
            this.dialogVisible = false;
            this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `
                    <div>Role Key: ${key}</div>
                    <div>Role Name: ${name}</div>
                    <div>Description: ${description}</div>
                `,
                type: 'success'
            })
        },
        onlyOneShowingChild(children = [], parent) {
            let onlyOneChild = null;
            const showingChildren = children.filter(item => !item.hidden);
            // 当只有一个子路由时，默认情况下显示子路由
            if (showingChildren.length === 1) {
                onlyOneChild = showingChildren[0];
                onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
                return onlyOneChild;
            }
            //如果没有要显示的子路由，则显示父路由
            if (showingChildren.length === 0) {
                onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                return onlyOneChild;
            }
            return false;
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        .roles-table {
            margin-top: 30px;
        }
        .permission-tree {
            margin-bottom: 30px;
        }
        .role_wrap{
            height: 600px;
            overflow-y: auto;
        }
    }
</style>