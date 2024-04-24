<template>
    <div class="space-intro container">
        <div class="row">
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h5 class="text-end">Order ID:24214</h5>
                    </div>
                    <div class="card-body"></div>
                </div>
            </div>
            <div class="col-md-3">
                <Ads />
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed, watch, reactive } from "vue";
import Ads from "../components/Ads.vue";
import { userStore } from "../stores/userStore";

//  watch method if make changes, v-model, refs

export default {
    props: {
        title: String,
    },

    components: {
        Ads,
    },

    setup(props, context) {
        const data = reactive({
            orders: "",
        });

        const currentUser = computed(() => {
            return userStore();
        });

        onMounted(() => {
            console.log();
        });

        // doesnt work
        watch(data, function (val) {
            console.log(val);
        });

        return {
            data,
            currentUser,
        };
    },
};
</script>

<style scoped>
</style>
