<template>
    <div class="app-container">
        <div class="clearfix">
            <pan-thumb :image="avatar" style="float: left">
                Your roles:
                <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
            </pan-thumb>
            <div class="info-container">
                <span class="display_name">{{ name }}</span>
                <span class="display_info">你是普通权限哦！</span>
            </div>
        </div>
        <img src="~assets/images/temp/editrole.gif" class="emptyGif">
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PanThumb from 'components/PanThumb'
export default {
    name: 'DashboardEditor',
    components: { PanThumb },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'name',
            'avatar',
            'roles'
        ])
    }
}
</script>
<style lang="scss" scoped>
.app-container{
    height:calc(100vh - 94px);
    padding: 50px 60px 0px;
    background-color: #e3e3e3;
    .pan-info-roles {
        font-size: 12px;
        font-weight: 700;
        color: #333;
        display: block;
    }
    .info-container {
        position: relative;
        margin-left: 190px;
        height: 150px;
        line-height: 200px;
        .display_name {
            font-size: 48px;
            line-height: 48px;
            color: #212121;
            position: absolute;
            top: 25px;
        }
        .display_info{
            font-size:20px;
            padding-top:20px;
            display:inline-block;
        }
    }
    .emptyGif {
        display: block;
        width: 45%;
        margin: 0 auto;
    }
}
</style>