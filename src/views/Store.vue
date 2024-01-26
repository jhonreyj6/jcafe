<template>
    <div>
        <div class="space-intro">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <Product :datas="products"/>
                        <div class="float-end mt-2">
                            <PaginateButton :paginate_data="products"/>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Product from '../components/Product.vue'
import PaginateButton from '../components/PaginateButton.vue'
import { userStore } from '../stores/userStore'

export default {
    data() {
        return {
            products: '',
        }
    },
    components: {
        Product,
        PaginateButton,
    },

    props: [],

    computed: {
        currentUser() {
            return userStore().user;
        },
    },

    methods: {
        getProducts() {
            const AuthStr = 'Bearer '.concat(userStore().access_token);
            axios({
                method: 'get',
                url: `/api/products`,
                headers: {Authorization: AuthStr}
            }).then(res => {
                this.products = res.data;
            }).catch(err => {
                console.log(err.response.data.message);
            });
        },

        nextPage(url) {
            axios({
                method: 'get',
                url: url,
            }).then(res => {
                this.products = res.data;
            }).catch(err => {

            });
        },

        prevPage(url) {
            axios({
                method: 'get',
                url: url,
            }).then(res => {
                this.products = res.data;
            }).catch(err => {

            });
        },

        goToPage(url, page) {
            axios({
                method: 'get',
                url: `${url}?page=${page}`,
            }).then(res => {
                this.products = res.data;
            }).catch(err => {

            });
        }

    },

    updated() {

    },

    // watch: {
    //     $data: {
    //         handler: function(val, oldVal) {
    //             console.log('watcher: ',val);
    //         },
    //         deep: true
    //     },

    //     $props: {
    //         handler: function(val, oldVal) {
    //             console.log('watcher: ',val);
    //         },
    //         deep: true
    //     },
    //     some_prop: function() {
    //         //do something if some_prop updated
    //     },
    // },

    deactivated() {
        this.$destroy();
    },

    mounted() {
        this.getProducts();
    },
}
</script>

