<template>
    <div class="star-wrap">
        <span v-for="(item,index) in starList" :key="index" class="star-item" :class="item"></span>
        <span class="score-text">{{score}}</span>
    </div>
</template>
<script>
const LENGTH = 10;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
    props:{
        score:{
            type:Number
        }
    },
    computed:{
        starList(){
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0;
            let interger = Math.floor(score);
            for(let i=0;i<interger;i++){
                result.push(CLS_ON);
            }
            if(hasDecimal){
                result.push(CLS_HALF);
            }
            while(result.length<LENGTH){
                result.push(CLS_OFF);
            }
            return result;
        }
    },
}
</script>
<style scoped>
    .star-wrap{
        width: 100%;
        font-size: 0;
        display: flex;
        align-items: center;
    }
    .star-item{
        width: 30px;
        height:30px;
        margin-right: 20px;
        background-repeat: no-repeat;
        background-size:30px auto;
    }
    .star-item.on{
        background:url('./star_on.png');
    }
    .star-item.half{
        background:url('./star_half.png');
    }
    .star-item.off{
        background:url('./star_off.png');
    }
    .score-text{
        font-size: 26px;
    }
    .score-text::after{
        content: '分';
        color: #999;
        font-size: 16px;
        margin-left: 2px;
    }
</style>