import Vue from 'vue'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { parseTime } from 'utils/index'
export function export_txt_to_zip (th, jsonData, txtName, zipName) {
    const zip = new JSZip();
    const txt_name = txtName || parseTime(new Date(), '{y}{m}{d}{h}{i}{s}');
    const zip_name = zipName || parseTime(new Date(), '{y}{m}{d}{h}{i}{s}{w}');
    const data = jsonData;
    let txtData = `${th}\r\n`;
    data.forEach((row) => {
        let tempStr = '';
        tempStr = row.toString();
        txtData += `${tempStr}\r\n`;
    });
    zip.file(`${txt_name}.txt`, txtData);
    zip.generateAsync({ type: "blob" })
        .then((blob) => {
            saveAs(blob, `${zip_name}.zip`);
        }, (err) => {
            Vue.prototype.$message({
                type: 'error',
                duration: 1000,
                showClose: true,
                message: '导出失败，请稍后再试'
            });
        });
}