<template>
    <el-card class="card-wrap">
        <div slot="header" class="clearfix">
            <svg-icon icon-class="people" />
            <span>个人信息</span>
        </div>
        <div class="user-profile">
            <div class="box-center">
                <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
                    <span>Hello</span>
                    <b>{{user.role}}</b>
                </pan-thumb>
            </div>
            <div class="box-center">
                <div class="user-name">欢迎您，{{user.name}}</div>
                <div class="user-role text-muted">{{user.role=='admin'?'超级管理员':'普通管理员'}}</div>
            </div>
        </div>
        <div class="user-bio">
            <div class="user-education user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="education" />
                    <span>简介</span>
                </div>
                <div class="user-bio-section-body">
                    <div class="text-muted">当天边那颗星出现，你可知我又开始想念，有多少爱恋只能遥遥相望，就像月光洒向海面，年少的我们曾以为，相爱的人就能到永远，当我们相信情到深处在一起，听不见风中的叹息，谁知道爱是什么，短暂的相遇却念念不忘，用尽一生的时间，竟学不会遗忘，如今我们已天各一方，生活得像周围人一样，眼前人给我最信任的依赖，但愿你被温柔对待，多少恍惚的时候，仿佛看见你在人海川流，隐约中你已浮现，一转眼又不见，短暂的相遇却念念不忘，多少恍惚的时候，仿佛看见你在人海川流，隐约中你已浮现，一转眼又不见，当天边那颗星出现，你可知我又开始想念，有多少爱恋今生无处安放，冥冥中什么已改变，月光如春风拂面。</div>
                </div>
            </div>
            <div class="user-skills user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="skill" />
                    <span>技能</span>
                </div>
                <div class="user-bio-section-body">
                    <div class="skill-item">
                        <span>Vue</span>
                        <el-progress :percentage="98" />
                    </div>
                    <div class="skill-item">
                        <span>JavaScript</span>
                        <el-progress :percentage="18" />
                    </div>
                    <div class="skill-item">
                        <span>Css</span>
                        <el-progress :percentage="66" />
                    </div>
                    <div class="skill-item">
                        <span>ESLint</span>
                        <el-progress :percentage="100" status="success" />
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>
<script>
import PanThumb from '@/components/PanThumb'
export default {
    components: { PanThumb },
    props: {
        user: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    email: '',
                    avatar: '',
                    role: ''
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .card-wrap{
        margin-top: 20px;
    }
    .box-center {
        margin: 0 auto;
        display: table;
    }
    .text-muted {
        color: #777;
        line-height: 20px;
    }
    .user-profile {
        .user-name {
            text-align: center;
            font-weight: bold;
        }
        .box-center {
            padding-top: 10px;
        }
        .user-role {
            text-align: center;
            padding-top: 10px;
            font-weight: 400;
            font-size: 14px;
        }
        .box-social {
            padding-top: 30px;
            .el-table {
                border-top: 1px solid #dfe6ec;
            }
        }
    }
    .user-bio {
        margin-top: 20px;
        color: #606266;
        span {
            padding-left: 4px;
        }
        .user-bio-section {
            font-size: 14px;
            padding: 15px 0;
            .user-bio-section-header {
                padding-bottom: 10px;
                margin-bottom: 10px;
                font-weight: bold;
                border-bottom: 1px solid #dfe6ec;
            }
            .skill-item{
                margin-bottom: 15px;
            }
        }
    }
</style>