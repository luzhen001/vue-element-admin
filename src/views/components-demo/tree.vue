<template>
    <div class="app-container tree-menu">
        <tree-list :data="data"></tree-list>
    </div>
</template>
<script>
import treeList from "components/Tree";
let myData = [
    {
        name: "研发部",
        children: [
            {
                id: 100,
                name: "James",
            },
            {
                name: "Web前端",
                children: [
                    {
                        id: 101,
                        name: "Javanx",
                    },
                    {
                        id: 102,
                        name: "Mark",
                    },
                    {
                        id: 103,
                        name: "Rool",
                    },
                    {
                        id: 115,
                        name: "康康",
                    },
                ]
            },
            {
                name: "测试",
                children: [
                    {
                        id: 104,
                        name: "Finny",
                    },
                    {
                        id: 105,
                        name: "Jesse",
                    },
                    {
                        id: 104,
                        name: "kangkang",
                    },
                    {
                        id: 105,
                        name: "mark",
                    }
                ]
            },
            {
                name: "后台",
                children: [
                    {
                        name: "Java后台",
                        children: [
                            {
                                id: 106,
                                name: "Owen",
                            },
                            {
                                id: 107,
                                name: "Carry",
                            },
                        ]
                    },
                    {
                        name: "运维",
                        children: [
                            {
                                id: 108,
                                name: "Kim",
                            },
                        ]
                    }
                ]
            },
        ],
    },
    {
        name: "市场部",
        children: [
            {
                id: 109,
                name: "Amiee",
            },
            {
                name: "市场主管",
                children: [
                    {
                        id: 110,
                        name: "Firse",
                    },
                    {
                        id: 111,
                        name: "Jake",
                    },
                    {
                        id: 110,
                        name: "tom",
                    },
                    {
                        id: 111,
                        name: "ruby",
                    }
                ]
            },
            {
                name: "市场员工",
                children: [
                    {
                        id: 112,
                        name: "Firse",
                    },
                    {
                        id: 113,
                        name: "Jake",
                    }
                ]
            }
        ]
    },
    {
        name: "综合管理部",
        children: [
            {
                id: 109,
                name: "Amiee",
            },
            {
                name: "财务",
                children: [
                    {
                        id: 110,
                        name: "Firse",
                    },
                    {
                        id: 111,
                        name: "Jake",
                    },
                    {
                        id: 110,
                        name: "tom",
                    },
                    {
                        id: 111,
                        name: "ruby",
                    }
                ]
            },
            {
                name: "人事",
                children: [
                    {
                        id: 112,
                        name: "Firse",
                    },
                    {
                        id: 113,
                        name: "Jake",
                    }
                ]
            }
        ]
    },
    {
        name: "前台",
        children: [
            {
                name: "前台主管",
                children: [
                    {
                        id: 101,
                        name: "Javanx",
                    },
                    {
                        id: 102,
                        name: "Mark",
                    },
                    {
                        id: 103,
                        name: "Rool",
                    },
                    {
                        id: 115,
                        name: "康康",
                    },
                ]
            },
            {
                name: "前台小姐姐",
                children: [
                    {
                        id: 104,
                        name: "Finny",
                    },
                    {
                        id: 105,
                        name: "Jesse",
                    },
                    {
                        id: 104,
                        name: "kangkang",
                    },
                    {
                        id: 105,
                        name: "mark",
                    }
                ]
            },
            {
                name: "前台客服",
                children: [
                    {
                        name: "客服小姐姐",
                        children: [
                            {
                                id: 106,
                                name: "Owen",
                            },
                            {
                                id: 107,
                                name: "Carry",
                            },
                        ]
                    },
                    {
                        name: "助理",
                        children: [
                            {
                                id: 108,
                                name: "Kim",
                            },
                        ]
                    }
                ]
            },
        ],
    },
]
export default {
    name: "tree",
    components: { treeList },
    data() {
        return {
            data: myData
        }
    }
}
</script>
<style lang="scss" scoped></style>