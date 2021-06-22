<template>
    <div class="app-container">
        <el-row>
            <el-card class="box-card">
                <div slot="header" class="clearfix"><span>按钮</span></div>
                <div style="margin-bottom:50px;margin-top:20px">
                    <el-col :span="4" class="btn-item">
                        <router-link class="pan-btn" style="background:#324157;" to="/">首页</router-link>
                    </el-col>
                    <el-col :span="4" class="btn-item">
                        <router-link class="pan-btn" style="background:#E65D6E;" to="/icon/index">字体图表</router-link>
                    </el-col>
                    <el-col :span="4" class="btn-item">
                        <router-link class="pan-btn" style="background:#C03639;" to="/excel/export-excel">Excel</router-link>
                    </el-col>
                    <el-col :span="4" class="btn-item">
                        <router-link class="pan-btn" style="background:#30B08F;" to="/table/complex-table">表格</router-link>
                    </el-col>
                    <el-col :span="4" class="btn-item">
                        <router-link class="pan-btn" style="background:#4AB7BD;" to="/example/create">表单</router-link>
                    </el-col>
                    <el-col :span="4" class="btn-item">
                        <router-link class="pan-btn" style="background:#FEC171;" to="/clipboard/index">复制</router-link>
                    </el-col>
                </div>
            </el-card>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px;">
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Material Design 的input</span>
                    </div>
                    <div style="height:100px;">
                        <el-form :model="demo" :rules="demoRules">
                            <el-form-item prop="title">
                                <md-input v-model="demo.title" type="text" icon="search" name="title" placeholder="输入标题">标题</md-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>图片hover效果</span>
                    </div>
                    <div class="component-item">
                        <pan-thumb width="90px" height="90px" :image="panthumbImage">vue-element-admin</pan-thumb>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>水波纹 waves v-directive</span>
                    </div>
                    <div class="component-item">
                        <el-button v-waves type="primary">水波纹效果</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>DownMenu</span>
                    </div>
                    <div class="component-item">
                        <down-menu :items="items" :isActive="true"></down-menu>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:30px;">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>上传多张</span>
                </div>
                <upload-mutiple v-model="image_uri" />
            </el-card>
        </el-row>
        <el-row style="margin-top:30px;">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>上传单张</span>
                </div>
                <upload-single v-model="image_uri2" />
            </el-card>
        </el-row>
    </div>
</template>
<script>
import PanThumb from 'components/PanThumb'
import MdInput from 'components/MDinput' //input
import DownMenu from 'components/DownMenu'
import waves from 'directive/waves' //水波纹指令
import uploadMutiple from 'components/UploadImage/uploadMutiple'
import uploadSingle from 'components/UploadImage/uploadSingle'
import panthumbImage from 'assets/images/temp/activity_01.jpg'
export default {
    name: 'ComponentMixinDemo',
    components: {
        PanThumb,
        MdInput,
        DownMenu,
        uploadMutiple,
        uploadSingle,
    },
    directives: {
        waves
    },
    data() {
        const validate = (rule, value, callback) => {
            if (value.length !== 6) {
                callback(new Error('请输入六个字符'))
            } else {
                callback()
            }
        }
        return {
            panthumbImage:panthumbImage,
            demo: {
                title: '',
            },
            demoRules: {
                title: [{ required: true, trigger: 'change', validator: validate }]
            },
            items:[
                {'title':'微信小程序','href':'https://mp.weixin.qq.com'},
                {'title':'iconfont图标','href':'https://www.iconfont.cn/'}
            ],
            image_uri:'',
            image_uri2:'',
        }
    },
}
</script>
<style lang="scss" scoped>
    .app-container {
        background-color: #f0f2f5;
    }
    .component-item{
        min-height: 100px;
    }
    .box-card{
        .btn-item{
            text-align: center;
        }
    }
    .pan-btn {
        border: none;
        outline: none;
        color: #fff;
        font-size: 14px;
        padding: 14px 36px;
        border-radius: 8px;
    }
</style>