<template>
    <div class="app-container createPost-container">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
                <CommentDropdown v-model="postForm.comment_disabled" />
                <PlatformDropdown v-model="postForm.platforms" />
                <SourceUrlDropdown v-model="postForm.source_uri" />
                <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布</el-button>
                <el-button v-loading="loading" type="warning" @click="draftForm">保存</el-button>
            </sticky>
            <div class="createPost-main-container">
                <el-row>
                    <div class="tip">
                        创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见
                        <a href="https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html" target="_blank">Document</a>
                    </div>
                    <el-col :span="24">
                        <el-form-item style="margin-bottom: 40px;" prop="title">
                            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
                            </el-form-item>
                        <div class="postInfo-container">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                                        <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                                            <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label-width="120px" label="日期:" class="postInfo-container-item">
                                        <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label-width="90px" label="重要性:" class="postInfo-container-item">
                                        <el-rate v-model="postForm.importance" :max="5" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1" :high-threshold="5" style="display:inline-block" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item style="margin-bottom: 40px;" label-width="70px" label="摘要:">
                    <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
                    <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
                </el-form-item>
                <el-form-item prop="content" style="margin-bottom: 30px;">
                    <Tinymce ref="editor" v-model="postForm.content" :height="400" />
                </el-form-item>
                <el-form-item prop="image_uri" style="margin-bottom: 30px;">
                    <Upload v-model="postForm.image_uri" />
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/UploadImage/uploadMutiple'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/StickyTop' // 粘性header组件
import { validURL } from '@/utils/index'
import { getExcelList } from 'api'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0
}
export default {
    name: 'ArticleDetail',
    components: { Tinymce, MDinput, Upload, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const validateRequire = (rule, value, callback) => {
            if (value === '') {
                this.$message({
                    type: 'error',
                    message: rule.field + '为必传项'
                });
                callback(new Error(rule.field + '为必传项'));
            } else {
                callback();
            }
        }
        const validateSourceUri = (rule, value, callback) => {
            if (value) {
                if (validURL(value)) {
                    callback();
                } else {
                    this.$message({
                        type: 'error',
                        message: '外链url填写不正确'
                    });
                    callback(new Error('外链url填写不正确'));
                }
            } else {
                callback();
            }
        }
        return {
            postForm: Object.assign({}, defaultForm),
            loading: false,
            userListOptions: [],
            rules: {
                image_uri: [{ validator: validateRequire }],
                title: [{ validator: validateRequire }],
                content: [{ validator: validateRequire }],
                source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
            },
            tempRoute: {}
        }
    },
    computed: {
        contentShortLength() {
            return this.postForm.content_short.length;
        },
        displayTime: {
            get() {
                return (+new Date(this.postForm.display_time));
            },
            set(val) {
                this.postForm.display_time = new Date(val);
            }
        }
    },
    created() {
        if (this.isEdit) {
            const id = this.$route.params && this.$route.params.id;
            this.fetchData(id);
        }
        this.tempRoute = Object.assign({}, this.$route);
    },
    methods: {
        fetchData(id) {
            fetchArticle(id).then(res => {
                this.postForm = res.data;
                this.postForm.title += `   Article Id:${this.postForm.id}`;
                this.postForm.content_short += `   Article Id:${this.postForm.id}`;
                this.setTagsViewTitle();
                this.setPageTitle();
            }).catch(err => {
                console.log(err);
            })
        },
        setTagsViewTitle() {
            const title = '编辑文章';
            const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` });
            this.$store.dispatch('tagsView/updateVisitedView', route);
            },
        setPageTitle() {
            const title = 'Edit Article';
            document.title = `${title} - ${this.postForm.id}`;
        },
        submitForm() {
            console.log(this.postForm)
            this.$refs.postForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$notify({
                        title: '成功',
                        type: 'success',
                        duration: 2000,
                        message: '发布文章成功'
                    });
                    this.postForm.status = 'published';
                    this.loading = false;
                } else {
                    return false;
                }
            })
        },
        draftForm() {
            if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '请填写必要的标题和内容'
                });
                return;
            }
            this.$message({
                message: '保存成功',
                type: 'success',
                showClose: true,
                duration: 1000
            });
            this.postForm.status = 'draft';
        },
        getRemoteUserList(query) {
            this.userListOption = [];
        }
    }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/mixin.scss";
    .createPost-container {
        position: relative;
        .createPost-main-container {
            padding: 40px 0 20px 0;
            .postInfo-container {
                position: relative;
                @include clearfix;
                margin-bottom: 10px;
                .postInfo-container-item {
                    float: left;
                }
            }
        }
        .word-counter {
            width: 40px;
            position: absolute;
            right: 10px;
            top: 0px;
        }
    }
    .article-textarea ::v-deep {
        textarea {
            padding-right: 40px;
            resize: none;
            border: none;
            border-radius: 0px;
            border-bottom: 1px solid #bfcbd9;
        }
    }
    .tip {
        background: #eef1f6;
        padding: 8px 24px;
        margin-bottom: 20px;
        border-radius: 2px;
        display: block;
        line-height: 32px;
        font-size: 16px;
        color: #2c3e50;
        a {
            color: #337ab7;
            cursor: pointer;
            &:hover {
                color: rgb(32, 160, 255);
            }
        }
    }
</style>
