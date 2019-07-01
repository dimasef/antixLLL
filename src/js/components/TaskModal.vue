<template>
    <div>
        <button @click="showModal = !showModal" class="">Show Modal</button>
        <transition name="modal">
            <div class="modal" v-show="showModal" @click="showModal = false">
                <div class="modal-wrapper">
                    <div class="modal-container" @click.stop>
                        <form action="/" method="post" @submit.prevent="checkForm">
                            <div class="modal-header">
                                <h2>Creating new task</h2>
                            </div>
                        
                            <div class="modal-body">
                                <textarea id="task-text" class="valid" data-valid="area" v-model="taskParam.text" placeholder="Описание задачи"></textarea>
                                <input id="task-time" class="valid" data-valid="time" v-model="taskParam.time" placeholder="Время выполнения">
                                <select>
                                    <option value="1">мин</option>
                                    <option value="2">часы</option>
                                </select>
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
                await TaskService.insertTask({text: this.taskParam.text, time: this.taskParam.time, eternity: this.taskParam.eternity});
            }
        }
    }
</script>