<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                    <user-card :user="user" />
                </el-col>
                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="活动" name="activity">
                                <activity />
                            </el-tab-pane>
                            <el-tab-pane label="时间轴" name="timeline">
                                <timeline />
                            </el-tab-pane>
                            <el-tab-pane label="账户" name="account">
                                <account :user="user" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserCard from './childcomps/UserCard'
import Activity from './childcomps/Activity'
import Timeline from './childcomps/Timeline'
import Account from './childcomps/Account'
export default {
    name: 'userAccount',
    components: { UserCard, Activity, Timeline, Account },
    data() {
        return {
            user: {},
            activeTab: 'activity'
        }
    },
    computed: {
        ...mapGetters([
            'name',
            'avatar',
            'roles'
        ])
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.user = {
                name: this.name,
                role: this.roles.join(' | '),
                email: 'luzhenlimengcai@foxmail.com',
                avatar: this.avatar
            }
        }
    }
}
</script>