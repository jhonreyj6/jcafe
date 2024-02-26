<template>
    <div class="card">
        <img
            class="card-img-top"
            src="../assets/img/ads.jpg"
            alt="Title"
            height="200"
        />
        <div class="card-body">
            <div
                class="d-flex flex-row justify-content-between align-items-center text-black-50"
            >
                <h4 class="card-title">Sponsors</h4>
                <i class="fa fa-exclamation-circle"></i>
            </div>
            <p class="card-text">
                Commodo non non enim aute cillum nostrud elit sint ad magna ad.
                Deserunt pariatur tempor ea eiusmod elit quis quis fugiat culpa
                id. Ut velit duis exercitation eiusmod mollit.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    components: {},

    computed: {},

    methods: {},

    watch: {
        $data: {
            handler: function (val, oldVal) {
                console.log("watcher: ", val);
            },
            deep: true,
        },

        $props: {
            handler: function (val, oldVal) {
                console.log("watcher: ", val);
            },
            deep: true,
        },
        some_prop: function () {
            //do something if some_prop updated
        },
    },

    updated() {},

    beforeMounted() {},

    mounted() {},
};
</script>

<style scoped>
</style>