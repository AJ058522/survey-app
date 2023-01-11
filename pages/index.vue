<script lang="ts" setup>
const version = 2 + 1
const config = useAppConfig()
</script>

<template>
    <div>
        <h1>{{ config.title }}</h1>
        <div class="hello">
            Hello Nuxt {{ version }}!
        </div>
    </div>
</template>

<style scoped>

</style>
