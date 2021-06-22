<template>
    <div class="user-activity">
        <div class="post">
            <div class="user-block">
                <img class="img-circle" src="~assets/images/temp/activity_01.jpg">
                <span class="username text-muted">Iron Man</span>
                <span class="description"> publicly - 7:30 PM today</span>
            </div>
            <p>
                Lorem ipsum represents a long-held tradition for designers,
                typographers and the like. Some people hate it and argue for
                its demise, but others ignore the hate as they create awesome
                tools to help create filler text for everyone from bacon lovers
                to Charlie Sheen fans.
            </p>
            <ul class="list-inline">
                <li><span class="link-black text-sm"><i class="el-icon-share" />分享</span></li>
                <li><span class="link-black text-sm"><svg-icon icon-class="like" />喜欢</span></li>
            </ul>
        </div>
        <div class="post">
            <div class="user-block">
                <img class="img-circle" src="~assets/images/temp/activity_02.jpg">
                <span class="username text-muted">Captain American</span>
                <span class="description">Sent you a message - yesterday</span>
            </div>
            <p>
                Lorem ipsum represents a long-held tradition for designers,
                typographers and the like. Some people hate it and argue for
                its demise, but others ignore the hate as they create awesome
                tools to help create filler text for everyone from bacon lovers
                to Charlie Sheen fans.
                 Lorem ipsum represents a long-held tradition for designers,
                typographers and the like. Some people hate it and argue for
                its demise, but others ignore the hate as they create awesome
                tools to help create filler text for everyone from bacon lovers
                to Charlie Sheen fans.
            </p>
            <ul class="list-inline">
                <li><span class="link-black text-sm"><i class="el-icon-share" />分享</span></li>
                <li><span class="link-black text-sm"><svg-icon icon-class="like" />喜欢</span></li>
            </ul>
        </div>
        <div class="post">
            <div class="user-block">
                <img class="img-circle" src="~assets/images/temp/activity_03.jpg">
                <span class="username">Spider Man</span>
                <span class="description">Posted 4 photos - 2 days ago</span>
            </div>
            <div class="user-images">
                <el-carousel :interval="6000" type="card" height="220px">
                    <el-carousel-item v-for="item in carouselImages" :key="item">
                        <img :src="item" class="image">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <ul class="list-inline">
                <li><span class="link-black text-sm"><i class="el-icon-share" />分享</span></li>
                <li><span class="link-black text-sm"><svg-icon icon-class="like" />喜欢</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import carouse_01 from 'assets/images/temp/carouse_01.jpg'
import carouse_02 from 'assets/images/temp/carouse_02.jpg'
import carouse_03 from 'assets/images/temp/carouse_03.jpg'
import carouse_04 from 'assets/images/temp/carouse_04.jpg'
export default {
    data() {
        return {
            carouselImages: [
                carouse_01,
                carouse_02,
                carouse_03,
                carouse_04
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .user-activity {
        .user-block {
            .username,
            .description {
                display: block;
                margin-left: 50px;
                padding: 2px 0;
            }
            .username{
                font-size: 16px;
                color: #000;
            }
            :after {
                clear: both;
            }
            .img-circle {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                float: left;
            }
            span {
                font-weight: 500;
                font-size: 12px;
            }
        }
        .post {
            font-size: 14px;
            border-bottom: 1px solid #d2d6de;
            margin-bottom: 15px;
            padding-bottom: 15px;
            color: #666;
            .image {
                width: 100%;
                height: 100%;
            }
            .user-images {
                padding-top: 20px;
            }
        }
        .list-inline {
            padding-left: 0;
            margin-left: -5px;
            list-style: none;
            li {
                display: inline-block;
                padding-right: 5px;
                padding-left: 5px;
                font-size: 13px;
            }
            .link-black {
                &:hover,
                &:focus {
                    color: #999;
                }
            }
        }
    }
    .box-center {
        margin: 0 auto;
        display: table;
    }
    .text-muted {
        color: #777;
    }
</style>