<template>
    <div>
        <ul v-for="(item,index) in data" :key="index">
            <tree-item :data="item"></tree-item>
        </ul>
    </div>
</template>
<script>
import treeItem from './childComps/TreeItem'
export default {
    name:'Tree',
    components:{
        treeItem
    },
    props:{
        data:{
            type:[Object, Array],
            required:true
        }
    }
}
</script>