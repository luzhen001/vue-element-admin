<template>
    <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
        <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
        <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
        </div>
    </div>
</template>
<script>
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
//const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.5/tinymce.min.js'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.1.5/tinymce.min.js'
export default {
    name: 'Tinymce',
    components: { editorImage },
    props: {
        id: {
            type: String,
            default: function() {
                return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
            }
        },
        value: {
            type: String,
            default: ''
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        height: {
            type: [Number, String],
            required: false,
            default: 360
        },
        width: {
            type: [Number, String],
            required: false,
            default: 'auto'
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
        }
    },
    computed: {
        containerWidth() {
            const width = this.width;
            if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
                return `${width}px`;
            }
            return width;
        }
    },
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() =>
                window.tinymce.get(this.tinymceId).setContent(val || ''))
            }
        },
    },
    mounted() {
        this.init();
    },
    activated() {
        if (window.tinymce) {
            this.initTinymce();
        }
    },
    deactivated() {
        this.destroyTinymce();
    },
    destroyed() {
        this.destroyTinymce();
    },
    methods: {
        init() {
            load(tinymceCDN, (err) => {
                if (err) {
                    this.$message.error(err.message);
                    return;
                }
                this.initTinymce();
            })
        },
        initTinymce() {
            const _this = this
            window.tinymce.init({
                language_url: 'https://lab.uxfeel.com/node_modules/tinymce/langs/zh_CN.js',
                language: 'zh_CN',//语种
                selector: `#${this.tinymceId}`,//编辑器id
                height: this.height,//高度
                min_height:500,//最小高度
                body_class: 'panel-body',//为编辑区body指定类或id  body_class&body_id
                object_resizing: false,//图片和表格是否开启在编辑器内部缩放
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,//工具栏，参数类型是个数组
                menubar: 'file edit format insert view table',//菜单栏的配置，也是数组
                plugins: plugins,//使用到的插件，参数类型为数组
                end_container_on_empty_block: true,//如果在空的内部块元素中按enter键，则此选项允许您拆分当前容器块元素
                powerpaste_word_import: 'clean',//此设置控制如何筛选从Microsoft Word粘贴的内容
                code_dialog_height: 450,
                code_dialog_width: 1000,
                forced_root_block:'p',//根元素的标签，最好使用p标签，不使用p元素作为根块会严重削弱编辑器的功能
                advlist_bullet_styles: 'square',//此选项允许您在默认bullist工具栏控件中包含特定的无序列表项标记 默认值：default,circle,disc,square
                advlist_number_styles: 'default',//此选项允许您在默认的numlist工具栏控件中包含特定的有序列表项标记,默认值：default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman
                imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'], //指定跨域地址
                default_link_target: '_blank',//链接默认打开方式
                link_title: true,//是否允许禁用链接对话框中的链接标题输入字段
                statusbar:true,//状态栏指的是编辑器最底下、左侧显示dom信息、右侧显示Tiny版权链接和调整大小的那一条。默认是显示的，设为false可将其隐藏
                resize:true,//true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
                elementpath:true,//设为false时，可隐藏底栏左边的元素路径
                draggable_modal:true,//模态窗口允许拖动
                fontsize_formats: "12px 14px 16px 18px 20px 24px 26px 28px 30px 32px 36px 38px", //字体大小
                paste_data_images: true, //允许粘贴图像
                branding:false,//设为false时，隐藏编辑器界面右下角的“Powered by Tiny”（官方汉化为：由Tiny驱动）字样。
                nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value)
                    }
                    _this.hasInit = true
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        this.hasChange = true
                        this.$emit('input', editor.getContent())
                    });
                },
                setup(editor) {
                    editor.on('FullscreenStateChanged', (e) => {
                        _this.fullscreen = e.state
                    })
                },
                // it will try to keep these URLs intact
                // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
                // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
                convert_urls: false,
                // 整合七牛上传
                // images_dataimg_filter(img) {
                //   setTimeout(() => {
                //     const $image = $(img);
                //     $image.removeAttr('width');
                //     $image.removeAttr('height');
                //     if ($image[0].height && $image[0].width) {
                //       $image.attr('data-wscntype', 'image');
                //       $image.attr('data-wscnh', $image[0].height);
                //       $image.attr('data-wscnw', $image[0].width);
                //       $image.addClass('wscnph');
                //     }
                //   }, 0);
                //   return img
                // },
                // images_upload_handler(blobInfo, success, failure, progress) {
                //   progress(0);
                //   const token = _this.$store.getters.token;
                //   getToken(token).then(response => {
                //     const url = response.data.qiniu_url;
                //     const formData = new FormData();
                //     formData.append('token', response.data.qiniu_token);
                //     formData.append('key', response.data.qiniu_key);
                //     formData.append('file', blobInfo.blob(), url);
                //     upload(formData).then(() => {
                //       success(url);
                //       progress(100);
                //     })
                //   }).catch(err => {
                //     failure('出现未知问题，刷新页面，或者联系程序员')
                //     console.log(err);
                //   });
                // },
            })
        },
        destroyTinymce() {
            const tinymce = window.tinymce.get(this.tinymceId);
            if (this.fullscreen) {
                tinymce.execCommand('mceFullScreen');
            }
            if (tinymce) {
                tinymce.destroy();
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent();
        },
        //上传图片
        imageSuccessCBK(arr) {
            const _this = this;
            arr.forEach(v => {
                window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .tinymce-container {
        position: relative;
        line-height: normal;
    }
    .tinymce-container {
        ::v-deep {
            .mce-fullscreen {
                z-index: 10000;
            }
        }
    }
    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }
    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
    }
    .fullscreen .editor-custom-btn-container {
        z-index: 10000;
        position: fixed;
    }
    .editor-upload-btn {
        display: inline-block;
    }
    >>>.mce-container, >>>.mce-container *, >>>.mce-widget, >>>.mce-widget *, >>>.mce-reset{
        white-space: unset;
    }
    >>>.mce-btn button{
        padding: 5px 8px;
        font-size: 15px;
    }
    >>>.mce-colorbutton .mce-preview{
        margin-left: -21px;
    }
</style>