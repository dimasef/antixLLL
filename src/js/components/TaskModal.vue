<template>
    <div>
        <button @click="onModalToggle" class="btn btn-primary btn-circle"><i class="plus-icon"></i></button><span>Task list:</span>
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
                                        <option value="1">мин</option>
                                        <option value="2">часы</option>
                                    </select>
                                </div>
                                 <label>
                                    <input id="eternity" v-model="taskParam.eternity" class="valid" data-valid="checkbox" type="checkbox" />
                                    <span class="dark-color">Ежедневная задача</span>
                                </label>
                            </div>

                            <div class="modal-footer ">
                                <input type="submit" class="" value="Create" />
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
                }
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