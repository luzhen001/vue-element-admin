<template>
    <div class="app-container">
        <div class="score-list" v-for="(item,index) in scoreList" :key="index">
            <starScore :score="item"></starScore>
        </div>
    </div>
</template>
<script>
import starScore from 'components/starScore'
export default {
    components:{
        starScore
    },
    data () {
        return {
            scoreList:[4.3,0, 2.5, 5, 1.2,2.8, 8.5,6,3.9,5.2,7.4,10,4.6,8.8,1.5]
        }
    },
    created () {

    },
    methods:{

    }
}
</script>
<style scoped>
.score-list{
    margin-top: 20px;
}
</style>