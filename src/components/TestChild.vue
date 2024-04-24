<template>
    <div class="mb-3">
        <div class="mb-3" v-for="message in messages" :key="message.id">
            Author: {{ message.author }} <br />
            message: {{ message.message }}
        </div>

        <button type="button" class="btn btn-primary">Trigger Emit</button>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(["messages", "trigger"]);
</script>


<style scoped>
</style>