<template>
    <div>
        <ul class="pagination mb-4">
            <li class="page-item">
                <a class="page-link" @click="prev(data.prev_page_url)">Prev</a>
            </li>

            <li
                class="page-item"
                :class="index == data.current_page ? 'active' : null"
                v-for="index in data.last_page"
                :key="index"
            >
                <a class="page-link" @click="redirect(data.path, index)">{{
                    index
                }}</a>
            </li>

            <li class="page-item">
                <a class="page-link" @click="next(data.next_page_url)">Next</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { defineEmits } from "vue";
const props = defineProps(["data"]);
const emits = defineEmits(["nextPage", "prevPage", "goToPage"]);

const next = (url) => {
    if (url) {
        emits("nextPage", url);
    }
};

const prev = (url) => {
    if (url) {
        emits("prevPage", url);
    }
};

const redirect = (url, page) => {
    emits("goToPage", url, page);
};

// export default {
//     data() {
//         return {

//         }
//     },
//     components: {

//     },

//     props: [
//         'data'
//     ],

//     computed: {

//     },

//     methods: {
//         next(url) {
//             this.$parent.nextPage(url);
//         },

//         prev(url) {
//             this.$parent.prevPage(url);
//         },

//         redirect(url, page) {
//             this.$parent.goToPage(url, page);
//         }
//     },

//     // watch: {
//     //     $data: {
//     //         handler: function(val, oldVal) {
//     //             console.log('watcher: ',val);
//     //         },
//     //         deep: true
//     //     }
//     // },

//     updated() {

//     },

//     mounted() {

//     },
// }
</script>

<style scoped>
.page-link {
    cursor: pointer;
}
</style>
