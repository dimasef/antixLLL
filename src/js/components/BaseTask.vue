<template>
    <div class="task-component">
        <div class="task-progress">
            <div class="card mb-5 p-2">
                <h2>Tasks performed today:</h2>
                <day-progress 
                    :all-time="getOverallTime"
                    :already-done="alreadyDoneTime"
                />
            </div>
        </div>
        <div class="task-list">
            <div class="task-list--header mb-5">
                <button @click="$refs.taskModal.onModalToggle()" class="btn btn-primary btn-circle animated">
                    <i class="plus-icon"></i>
                </button>
                <span class="list-title pl-1">Task list:</span>
                <button v-if="isHiddenTasksToday" class="btn btn-primary right-align" @click="onHiddenTasksToggle">
                    {{isShowHiddenList ? 'Hide' : 'Show'}}
                </button>
                <TaskModal @update-list="updateTaskList" ref="taskModal" />
            </div>
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
                    @progress-updated="updatingProgress"
                    :class="{'task-hidden': !isNeedToPerform(task.activeDays)}"
                    v-if="isShowHiddenList || isNeedToPerform(task.activeDays)"
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
                tasks: [],
                alreadyDoneTime: 0,
                isShowHiddenList: false
            }
        },

        created() {
            this.updateTaskList();
        },

        methods: {
            async updateTaskList() {
                try {
                    this.tasks = await TaskService.getTasks();
                } catch(err) {
                    console.error("Server is't working!");
                }

                this.alreadyDoneTime = this.getAlreadyDoneTime;
            },

            /* Checking if needs to perform the task today */
            isNeedToPerform(activeDays) {
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const currentDay = days[new Date().getDay()];
                return activeDays.includes(currentDay) ? true : false;
            },

            updatingProgress(data) {
                this.alreadyDoneTime += data.doneStatus ? +(data.time) : -(data.time);
            },

            onHiddenTasksToggle() {
                this.isShowHiddenList = !this.isShowHiddenList;
            },

            
        },

        computed: {
            getOverallTime() {
                return this.tasks.reduce((accumulator, currentValue) => 
                    accumulator + ((this.isNeedToPerform(currentValue.activeDays)) ? (+currentValue.time) : 0), 0
                );
            },

            getAlreadyDoneTime() {
                return this.tasks.reduce((accumulator, currentValue) => 
                    accumulator + ((currentValue.doneStatus) ? (+currentValue.time) : 0), 0
                );
            },

            isHiddenTasksToday() {
                return this.tasks.some(item => !this.isNeedToPerform(item.activeDays)); 
            }
        }
    }
</script>
