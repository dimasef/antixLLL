export default {
    data () {
        return {
            taskParam: {text: '',time: null,timeStatus: 0,eternity: false},
            validationErrors: {text: '',time: '',eternity: ''},
        }
    },
    methods: {
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
    }
}