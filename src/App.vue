<template>
    <div>
        <Nav />

        <router-view v-slot="{ Component }">
            <keep-alive include="Dashboard">
                <component :is="Component" />
            </keep-alive>
        </router-view>

        <Footer v-if="$route.name == 'Intro'" />

        <ChatBox v-if="currentUser && $route.name != 'Rules'" />
    </div>
</template>
<script>
import ChatBox from "./components/ChatBox.vue";
import Footer from "./components/Footer.vue";
import Nav from "./components/Nav.vue";
import { userStore } from "./stores/userStore";

export default {
    
        
    data() {
        return {};
    },
    components: {
        Nav,
        Footer,
        ChatBox,
    },

    props: {},

    computed: {
        currentUser() {
            return userStore().access_token;
        },
    },

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
        some_prop: function () {},
    },

    updated() {},

    beforeMounted() {},

    mounted() {},
};
</script>

<style scoped>
</style>