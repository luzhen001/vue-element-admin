<template>
    <el-card class="box-card-component">
        <div slot="header" class="box-card-header">
            <img src="~assets/images/temp/box_card.png" />
        </div>
        <div>
            <div class="progress-item">
                <span>Vue</span>
                <el-progress :percentage="98" />
            </div>
            <div class="progress-item">
                <span>JavaScript</span>
                <el-progress :percentage="67" />
            </div>
            <div class="progress-item">
                <span>Css</span>
                <el-progress :percentage="16" />
            </div>
            <div class="progress-item">
                <span>ESLint</span>
                <el-progress :percentage="100" status="success" />
            </div>
        </div>
    </el-card>
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" >
    .box-card-component{
        .el-card__header {
            padding: 0px!important;
        }
    }
</style>
<style lang="scss" scoped>
    .box-card-component {
        .box-card-header {
            position: relative;
            height: 220px;
            img {
                width: 100%;
                height: 100%;
                transition: all 0.5s linear;
                &:hover {
                    transform: scale(1.1, 1.1);
                    filter: contrast(130%);
                }
            }
        }
        .progress-item {
            font-size: 14px;
            margin-top: 14px;
        }
    }
</style>