<template>
    <div class="panel task-item">
        <div class="task-item--switch">
            <div class="switch">
                <label>
                    <input type="checkbox" v-model="doneStatus" @change="updateTask">
                    <span class="lever"></span>
                </label>
            </div>
        </div>
        <div class="task-item--content">
            <p class="task-description">{{description}}</p>
            <p class="task-spend-time">The time you need to spend: {{timeConverter}}</p>
        </div>
        <div class="task-item--manage">
            <i v-if="eternity" class="infinity-icon"></i>
            <span class="task-remove" @click="removeTask"></span>
        </div>
    </div>
</template>
<script>
    import TaskService from '../TaskService';

    export default {
        props: ['id', 'time', 'description', 'eternity', 'isDone'],
         data () {
            return {
                doneStatus: this.isDone,
                Tasktime: this.time
            }
        },

        methods: {
            async removeTask() {
                await TaskService.removeTask(this.id);
                this.$emit('task-removed');
            },

            async updateTask() {
                await TaskService.updateTask(this.id, this.doneStatus);
            }
        },

        computed: {
            timeConverter() {
                return (this.Tasktime < 60) ? `${this.Tasktime} min` :
                    ((this.Tasktime % 60) === 0) ? `${this.Tasktime / 60} h` :
                    `${~~(this.Tasktime / 60)} h ${this.Tasktime % 60} min`;
            }
        }
    }
</script>
