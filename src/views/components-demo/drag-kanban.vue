<template>
    <div class="app-container board">
        <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
        <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
        <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />
    </div>
</template>
<script>
import Kanban from 'components/Kanban'
export default {
    name: 'DragKanbanDemo',
    components: {
        Kanban
    },
    data() {
        return {
            group: 'mission',
            list1: [
                { name: 'todo', id: 1 },
                { name: 'todo', id: 2 },
                { name: 'todo', id: 3 },
                { name: 'todo', id: 4 }
            ],
            list2: [
                { name: 'working', id: 5 },
                { name: 'working', id: 6 },
                { name: 'working', id: 7 }
            ],
            list3: [
                { name: 'done', id: 8 },
                { name: 'done', id: 9 },
                { name: 'done', id: 10 }
            ]
        }
    }
}
</script>
<style lang="scss">
    .board {
        width: 1000px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
    }
    .kanban {
        &.todo {
            .board-column-header {
                background: #4A9FF9;
            }
        }
        &.working {
            .board-column-header {
                background: #f9944a;
            }
        }
        &.done {
            .board-column-header {
                background: #2ac06d;
            }
        }
    }
</style>