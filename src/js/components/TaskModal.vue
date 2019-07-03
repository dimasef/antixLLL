<template>
    <div class="task-list--header">
        <button @click="onModalToggle" class="btn btn-primary btn-circle animated">
            <i class="plus-icon"></i>
        </button>
        <span class="list-title">Task list:</span>
        <transition name="modal">
            <div class="modal" v-show="showModal" @click="onModalToggle">
                <div class="modal-wrapper">
                    <div class="modal-container" @click.stop>
                        <form action="/" method="post" @submit.prevent="checkForm">
                            <div class="modal-header">
                                <h2 class="modal-title">Creating new task</h2>
                            </div>

                            <div class="modal-body">
                                <textarea class="task-deskription valid" v-model="taskParam.text" placeholder="Task description"></textarea>
                                <div class="task-time">
                                    <input class="task-time--execution" type="text" v-model="taskParam.time" placeholder="Execution time">
                                    <select class="task-time--value">
                                        <option value="1">min</option>
                                        <option value="2">hour</option>
                                    </select>
                                </div>
                                 <label>
                                    <input class="checkbox-style" v-model="taskParam.eternity" type="checkbox" />
                                    <span class="checkbox-style-label">Daily task</span>
                                </label>
                                 <div class="weekday-settings-items">
                                    <span v-for="(day, index) in days" class="day-item" :key="index" :class="{opted: day.checked}">{{day.name}}</span>
                                </div>
                            </div>

                            <div class="modal-footer align-center">
                                <input type="submit" class="btn btn-primary" value="Create" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </transition>
    </div>
</template>

<script>
    import TaskService from '../TaskService'

    export default {
        data () {
            return {
                showModal: false,
                taskParam: {
                    text: null,
                    time: null,
                    eternity: false
                },
                days: [
                    {name: 'Mon', checked: true},
                    {name: 'Tue', checked: true},
                    {name: 'Wed', checked: true},
                    {name: 'Thu', checked: true},
                    {name: 'Fri', checked: true},
                    {name: 'Sat', checked: true},
                    {name: 'Sun', checked: true}
                ]
            }
        },
        methods: {
            async checkForm() {
                await TaskService.insertTask({
                    text: this.taskParam.text, 
                    time: this.taskParam.time, 
                    eternity: this.taskParam.eternity
                });
                
                this.$emit('update-list');
            },

            onModalToggle() {
                this.showModal = !this.showModal;
            }
        },

        computed: {

        }
    }
</script>