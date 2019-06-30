<template>
    <div class="tasks">
        <div class="task-item" 
            v-for="(task, index) in tasks"
            :item="task"
            :index="index"
            :key="task._id"
        >
            <p>{{task.text}}</p>
        </div>
    </div>
</template>

<script>
import TaskService from '../TaskService'
export default {
    name: 'TaskComponent',

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
