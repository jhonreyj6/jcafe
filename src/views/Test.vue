<template>
    <div class="space-intro">
        <div class="container">
            <TestChild :messages="messages" :trigger="`trigger`" />

            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"
                        >Message</label
                    >
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="6"
                        class="form-control"
                    ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import TestChild from "../components/TestChild.vue";
import { onMounted, ref } from "vue";
import { userStore } from "../stores/userStore";

const messages = ref();
messages.value = [
    {
        id: 0,
        author: "Maxwell",
        message: "1st Test",
    },
    {
        id: 1,
        author: "Robert",
        message: "Poor dad",
    },
];

// const trigger =
const getProducts = () => {
    axios({
        method: "get",
        url: `/api/products`,
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {});
};
</script>

<style scoped>
</style>