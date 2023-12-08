<template>
    <div>
        <Nav />
        <router-view></router-view>
        <Footer v-if="$route.name == 'Intro' || $route.name == 'Login' || $route.name == 'Rules'" />
        
    </div>
</template>
<script>
import Footer from './components/Footer.vue';
import Nav from './components/Nav.vue'

export default {
    data() {
        return {
            
        }
    },
    components: {
        Nav,
        Footer,
    },

    props: {

    },

    computed: {

    },

    methods: {

    },

    watch: {
        $data: {
            handler: function(val, oldVal) {
                console.log('watcher: ',val);
            },
            deep: true
        },

        $props: {
            handler: function(val, oldVal) {
                console.log('watcher: ',val);
            },
            deep: true
        },
        some_prop: function() {
            
        },
    },

    updated() {

    },

    beforeMounted() {

    },

    mounted() {

    },
}
</script>

<style scoped>

</style>