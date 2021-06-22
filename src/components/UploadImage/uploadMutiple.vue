<template>
    <div class="upload-container">
         <el-upload
                :drag="true"
                :multiple="true"
                :file-list="fileList"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                action="https://httpbin.org/post"
                list-type="picture-card"
                accept=".jpg, .jpeg, .png, .gif"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </div>
</template>
<script>
export default {
    name: 'SingleImageUpload3',
    data() {
        return {
            listObj: {},
            fileList: []
        }
    },
    methods: {
        handleSuccess(response, file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = response.files.file;
                    this.listObj[objKeyArr[i]].hasSuccess = true;
                    return;
                }
            }
        },
        //删除
        handleRemove(file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]];
                    return;
                }
            }
        },
        beforeUpload(file) {
            const _self = this;
            const _URL = window.URL || window.webkitURL;
            const fileName = file.uid;
            this.listObj[fileName] = {};
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function() {
                    _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
                }
                resolve(true);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "assets/styles/mixin.scss";
    .editor-slide-upload {
        margin-bottom: 20px;
        ::v-deep .el-upload--picture-card {
            width: 100%;
        }
    }
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
</style>