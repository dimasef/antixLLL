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
                                <span @click="onModalToggle" class="modal-close">×</span>
                            </div>

                            <div class="modal-body">
                                <textarea 
                                    class="task-deskription" 
                                    v-model="taskParam.text"
                                    :class="{'input-err': !!validationErrors.text}"
                                    @focus="errorCleaning"
                                    placeholder="Task description">
                                </textarea>
                                <p class="valid-err" v-show="!!validationErrors.text" v-text="validationErrors.text"></p>
                                <div class="task-time">
                                    <input class="task-time--execution" 
                                        :class="{'input-err': !!validationErrors.time}" 
                                        type="text" 
                                        v-model="taskParam.time" 
                                        @focus="errorCleaning"
                                        placeholder="Execution time">
                                    <select class="task-time--value" v-model="taskParam.timeStatus">
                                        <option value="0">min</option>
                                        <option value="1">hour</option>
                                    </select>
                                    <p class="valid-err" v-show="!!validationErrors.time" v-text="validationErrors.time"></p>
                                </div>
                                <div class="weekday-settings">
                                    <label>
                                        <input class="checkbox-style" v-model="taskParam.eternity" type="checkbox" />
                                        <span class="checkbox-style-label">Daily task</span>
                                    </label>
                                    <span class="weekday-settings-manage" v-show="isDaysShowed">
                                        <span 
                                            class="btn btn-secondary btn-weekday"
                                            @click="toggleAllDays"
                                        >{{ chooseDaysParam.removedAll ? 'Choose all' : 'Remove all' }}</span>
                                        <span 
                                            class="btn btn-secondary btn-weekday"
                                            @click="oddEvenDays"
                                        >{{ chooseDaysParam.odd ? 'Even' : 'Odd' }}</span>
                                        <span class="btn btn-secondary btn-weekday" @click="randomDays">Random</span>
                                    </span>
                                </div>
                                <div class="weekday-settings-items" v-show="isDaysShowed">
                                    <span 
                                        v-for="(day, index) in days" 
                                        class="day-item" :key="index" 
                                        :class="{opted: day.checked}"
                                        @click="day.checked = !day.checked"
                                    >{{day.name}}</span>
                                </div>
                                <p class="valid-err" v-show="!!validationErrors.eternity" v-text="validationErrors.eternity"></p>
                            </div>

                            <div class="modal-footer align-center">
                                <input type="submit" class="btn btn-primary btn-create" value="Create" />
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
                taskParam: {text: '',time: null,timeStatus: 0,eternity: false},
                validationErrors: {text: '',time: '',eternity: ''},
                days: [{name: 'Mon', checked: true},{name: 'Tue', checked: true},
                    {name: 'Wed', checked: true},{name: 'Thu', checked: true},
                    {name: 'Fri', checked: true},{name: 'Sat', checked: true},
                    {name: 'Sun', checked: true}],
                chooseDaysParam: {removedAll: false,odd: false}
            }
        },
        methods: {
            async checkForm() {
                if(this.validation()) {
                    await TaskService.insertTask({
                        text: this.taskParam.text, 
                        time: this.convertedTime, 
                        eternity: this.taskParam.eternity,
                        activeDays: this.taskParam.eternity ? this.getActiveDays() : []
                    });
                    this.$emit('update-list');
                    return;
                }
            },

            errorCleaning() {
                for(let prop in this.validationErrors) {
                    if(this.validationErrors[prop] !== '') this.validationErrors[prop] = '';     
                }
            },

            onModalToggle() {
                this.showModal = !this.showModal;
            },
            
            getActiveDays() {
                const activeDays = this.days.filter(item => item.checked);
                return activeDays.map(item =>  item.name);
            },

            validation() {
                let validationResult = true;
                this.validationErrors.text = (this.taskParam.text.length < 1 || this.taskParam.text.length > 255) ?  'Field should be valid' : '';
                this.validationErrors.time = (this.convertedTime <= 0 || this.convertedTime > 1320) ? 'Field should be valid' : '';
                this.validationErrors.eternity = (this.taskParam.eternity && this.days.every(item => !item.checked)) ? 'Select at least 1 day' : '';

                for(let prop in this.validationErrors) {
                    if(this.validationErrors[prop] !== '') {
                        validationResult = false;
                        break;
                    }
                }
                return validationResult;
            },

            toggleAllDays() {
                this.days.map(item => {
                    item.checked = this.chooseDaysParam.removedAll ? true : false;
                });
                this.chooseDaysParam.removedAll = !this.chooseDaysParam.removedAll;
            },

            oddEvenDays() {
                this.days.map((item, index) => {
                    if(this.chooseDaysParam.odd) item.checked = ((index % 2) === 0) ? false : true;
                    else item.checked = ((index % 2) === 0) ? true : false;
                });
                this.chooseDaysParam.odd = !this.chooseDaysParam.odd;
            },

            randomDays() {
                let random = 0;
                this.days.map((item) => {
                    random = Math.floor(Math.random() * 2);
                    item.checked = (random) ? true : false;
                });
            },
        },

        computed: {
            
            isDaysShowed() {
                return this.taskParam.eternity ? true : false;
            },

            convertedTime() {
                return this.taskParam.timeStatus ? this.taskParam.time * 60 : this.taskParam.time;
            }
        }
    }
</script>