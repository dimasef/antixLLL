<template>
    <div class="task-list">
        <TaskModal @update-list="updateTaskList" />
        <div class="task-list--content">
            <div class="task-item" 
                v-for="(task, index) in tasks"
                :index="index"
                :task_id="task._id"
                :key="task._id"
            >
                <p>{{task.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import TaskService from '../TaskService'
import TaskModal from './TaskModal.vue';
export default {
    name: 'TaskComponent',
    components: {TaskModal},
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
