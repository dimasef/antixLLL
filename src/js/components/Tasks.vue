<template>
    <div class="task-list">
        <TaskModal @update-list="updateTaskList" />
        <div class="task-list--content">
            <task-item 
                v-for="task in tasks"
                :key="task._id"
                :id="task._id"
                :time="task.time"
                :description="task.text"
                :eternity="task.eternity"
                :isDone="task.doneStatus"
                @task-removed="updateTaskList"
            />
        </div>
    </div>
</template>

<script>
    import TaskService from '../TaskService';
    import TaskModal from './TaskModal.vue';
    import TaskItem from './TaskItem.vue';

    export default {
        name: 'TaskComponent',
        components: {TaskModal, TaskItem},
        data() {
            return {
                tasks: []
            }
        },

        created() {
            this.updateTaskList()
        },

        methods: {
            async updateTaskList() {
                try {
                    this.tasks = await TaskService.getTasks();
                } catch(err) {
                    console.error("Server is't working!");
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
