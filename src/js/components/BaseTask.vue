<template>
    <div class="task-component">
        <div class="task-progress">
            <div class="card mb-5 p-2">
                <h2>Tasks performed today:</h2>
                <day-progress />
            </div>
        </div>
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
                    :class="{'task-hidden': !isNeedToPerform(task.activeDays)}"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import DayProgress from './DayProgress.vue';
    import TaskService from '../TaskService';
    import TaskModal from './TaskModal.vue';
    import TaskItem from './TaskItem.vue';

    export default {
        name: 'BaseTaskComponent',
        components: {TaskModal, TaskItem, DayProgress},
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
            },

            isNeedToPerform(activeDays) {
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const currentDay = days[new Date().getDay()];
                return activeDays.includes(currentDay) ? true : false;
            }
        }
    }
</script>
