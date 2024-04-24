<template>
    <div>
        <div class="space-intro">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <Product :datas="products" />
                        <div class="float-end mt-2">
                            <PaginateButton
                                :data="products"
                                @nextPage="nextPage"
                                @goToPage="goToPage"
                                @prevPage="prevPage"
                            />
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <Ads />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Product from "../components/Product.vue";
import PaginateButton from "../components/PaginateButton.vue";
import { userStore } from "../stores/userStore";
import Ads from "../components/Ads.vue";
import { onBeforeMount, ref } from "vue";

const products = ref([]);

const getProducts = async () => {
    const AuthStr = "Bearer ".concat(userStore().access_token);
    await axios({
        method: "get",
        url: `/api/products`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            products.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const nextPage = (url) => {
    axios({
        method: "get",
        url: url,
    })
        .then((res) => {
            products.value = res.data;
        })
        .catch((err) => {});
};

const prevPage = (url) => {
    axios({
        method: "get",
        url: url,
    })
        .then((res) => {
            products.value = res.data;
        })
        .catch((err) => {});
};

const goToPage = (url, page) => {
    axios({
        method: "get",
        url: `${url}?page=${page}`,
    })
        .then((res) => {
            products.value = res.data;
        })
        .catch((err) => {});
};

onBeforeMount(() => {
    getProducts();
});
</script>

