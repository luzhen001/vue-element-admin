<template>
    <div class="app-container">
        <div class="tip">drag-list base on<a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a></div>
        <div class="editor-container">
            <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool" />
        </div>
    </div>
</template>
<script>
import DndList from 'components/DndList'
export default {
    name: 'DndListDemo',
    components: { DndList },
    data() {
        return {
            list1: [],
            list2: []
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.listLoading = true;
            let tempArr = [];
            for(let i=0;i<20;i++){
                tempArr.push({
                'id':i+1,
                'author':'作者'+(i+1),
                'title':'I am testing data---'+(i+1)
                });
            }
            this.list1 = tempArr.splice(0, 5);
            this.list2 = tempArr;
        }
    }
}
</script>
<style scoped lang="scss">
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