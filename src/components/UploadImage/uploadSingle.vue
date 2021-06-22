<template>
    <div class="upload-container">
        <el-upload
            :drag="true"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            class="image-uploader"
            action="https://httpbin.org/post"
            accept=".jpg, .jpeg, .png, .gif"
              list-type="picture-card"
        >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="image-preview">
            <div class="image-preview-wrapper" v-show="imageUrl.length>1">
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i class="el-icon-zoom-in"></i>
                    <i class="el-icon-delete" @click="removeImage"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SingleImageUpload3',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    computed: {
        imageUrl() {
            return this.value
        }
    },
    methods: {
        //删除
        removeImage() {
            this.$confirm('确定要删除吗？','温馨提示',{
                type:'info',
                showClose:false,
                confirmButtonText:'确定',
                cancelButtonText:'想一想',
                dangerouslyUseHTMLString:true
            }).then(()=>{
                this.emitInput('');
            }).catch(()=>{})
        },
        handleImageSuccess(file) {
            this.emitInput(file.files.file);
        },
        emitInput(val) {
            this.$emit('input', val);
        },
    }
}
</script>
<style lang="scss" scoped>
    @import "assets/styles/mixin.scss";
    >>>.el-upload--picture-card{
        height: auto;
        line-height: unset;
    }
    >>>.el-upload-dragger{
        height: auto;
        border: unset;
        display: flex;
        flex-direction: column;
    }
    >>>.el-upload-dragger.is-dragover{
        border: unset;
    }
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 35%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            float: left;
            position: relative;
            margin-left: 50px;
            border: 1px dashed #d9d9d9;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                transition: opacity .3s;
                background-color: rgba(0, 0, 0, .5);
                .el-icon-delete {
                    font-size: 36px;
                }
                .el-icon-zoom-in {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }
</style>