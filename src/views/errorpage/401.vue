<template>
    <div class="app-container">
        <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">返回</el-button>
        <el-row>
            <el-col :span="12">
                <h1 class="text-jumbo text-ginormous">oh my god！</h1>
                <h2>你没有权限去访问该页面哦！</h2>
                <h4>如有不满，请去联系你的领导呀...</h4>
                <ul class="list-unstyled">
                    <li>或者你可以去：</li>
                    <li class="link-type"><router-link to="/">回首页</router-link></li>
                    <li><a href="#" @click.prevent="dialogVisible=true">点我看图</a></li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img :src="errGif" width="313" height="428" alt="" />
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" title="随便看看">
            <img src="~assets/images/temp/ewizardclap.gif" class="pan-img" />
        </el-dialog>
    </div>
</template>
<script>
import errGif from '@/assets/images/401.gif'
export default {
    name: 'Page401',
    data() {
        return {
            errGif: errGif + '?' + +new Date(),
            dialogVisible: false
        }
    },
    methods: {
        back() {
            if (this.$route.query.noGoBack) {
                this.$router.push({ path: '/dashboard' });
            } else {
                this.$router.go(-1);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        width: 800px;
        margin: 100px auto 0;
        border:1px solid red;
        .pan-back-btn {
            color: #fff;
            background: #008489;
            border: none!important;
        }
        .pan-gif {
            margin: 0 auto;
            display: block;
        }
        .pan-img {
            width: 100%;
            height: 600px;
            display: block;
            margin: 0 auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #1482f0;
            margin-bottom: 58px;
        }
        .list-unstyled {
            font-size: 16px;
            margin-top: 38px;
            li {
                padding-bottom: 15px;
            }
            a {
                color: #008489;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>