<template>
    <div>
        <TaskModal />
        <div class="tasks">
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

    async created() {
        try {
            this.tasks = await TaskService.getTasks();
        } catch(err) {
            console.error("Server is't working!");
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
