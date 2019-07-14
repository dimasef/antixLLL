<template>
    <div class="progress">
        <div class="progress-done-line" :class="[`bg-color-${getNameColorClass}`]" :style="{width: `${doneProgress}%`}"></div>
    </div>
</template>
<script>

    export default {
        props: ['allTime', 'alreadyDone'],
        
        data () {
            return {
                doneProgress: 1,
                allTimeToday: 0,
                doneTimeToday: 0
            }
        },

        methods: {
            renderingProgressBar() {
                const onePercent = this.allTimeToday / 100;
                this.doneProgress = this.doneTimeToday ? (this.doneTimeToday / onePercent) : 1;
            }
        },

        computed: {
            getNameColorClass() {
                return (this.doneProgress <= 25) ? 'badly' : 
                (this.doneProgress > 25 && this.doneProgress < 50) ? 'poorly' :
                (this.doneProgress >= 50 && this.doneProgress < 75) ? 'decently' : 'perfectly';

            }
        },

        watch: {
            allTime() {
                this.allTimeToday = this.allTime;
                this.renderingProgressBar();
            },
        
            alreadyDone() {
                this.doneTimeToday = this.alreadyDone;
                this.renderingProgressBar();
            }
        }
    }
</script>
