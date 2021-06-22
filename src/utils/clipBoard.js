import Vue from 'vue'
import Clipboard from 'clipboard'
function clipboardSuccess () {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message({
        type: 'success',
        duration: 1000,
        showClose: true,
        message: '复制成功！'
    });
}
function clipboardError () {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message({
        type: 'error',
        duration: 1000,
        showClose: true,
        message: '复制失败，请稍后再试！'
    });
}
export default function handleClipboard (text, event) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    });
    clipboard.on('success', () => {
        clipboardSuccess();
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        clipboardError();
        clipboard.destroy();
    });
    clipboard.onClick(event);
}