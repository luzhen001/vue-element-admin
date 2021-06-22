<template>
    <li>
        <div @click="toggle">
            <em v-if="hasChild" class="icon" :class="open?'fold':'open'"></em>
            <template v-if="!hasChild">
                <span class="avatar text" v-bind:class="'theme'+(data.id) % 5">{{data | textAvatarFilter}}</span>
                <span>{{data.id}}</span>
            </template>
            {{ data.name }}
        </div>
        <ul v-show="open" v-if="hasChild">
            <tree-item v-for="(item, index) in data.children" :data="item" :key="index"></tree-item>
        </ul>
    </li>
</template>
<script>
export default {
    name: 'TreeItem',
    props: {
        data: {
            type: [Object, Array],
            required: true
        }
    },
    data() {
        return {
            open: false
        }
    },
    filters: {
        textAvatarFilter(data){
            return (data.name || '').slice(-2)
        }
    },
    computed: {
        hasChild() {
            return this.data.children && this.data.children.length
        }
    },
    methods: {
        toggle() {
            if(this.hasChild) {
                this.open = !this.open
            }
        }
    }
}
</script>
<style lang="scss" scoped>
li {
    padding: 3px 0;
}
li > div {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}
li > div:visited{
    background: #fff;
}
em.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-repeat: no-repeat;
    vertical-align: middle;
    content: '';
    top: 50%;
    margin-top: -.06666666666666667rem;
    height: 0;
    width: 0;
    border: 3px solid;
    border-color: transparent #b1b1b1 #b1b1b1 transparent;
    left: .3466666666666667rem;
    transition: all 0.15s linear;
}
.icon.fold{
    margin-top: -5px;
    transform: rotateZ(45deg);
}
.icon.open{
    transform: rotateZ(-45deg);
}
.tree-menu > ul{
    padding-left: 0;
}
.tree-menu li {
    line-height: 1.5;
}

.avatar{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-right: 10px;
    color: #fff;
    background: #EDBC7D;
    border-radius: 50%;
    display: inline-block;
    vertical-align: top;
}
.avatar.theme0{
    background: #4a90e2;
}
.avatar.theme1{
    background: #3774bc;
}
.avatar.theme2{
    background: #47b099;
}
.avatar.theme3{
    background: #fd9486;
}
.avatar.theme4{
    background: #8eb563;
}
</style>