<template>
    <section>
        <h3>Section title</h3>
        <p>Section {{message}}</p>
        <a href="#">link</a>
    </section>
</template>

<script>
export default {
    data() {
        return {
            message: '.. .. .. ..'
        }
    }
}
</script>
<style lang="scss" scoped>
    section {
        color: violet;
    }
</style>
