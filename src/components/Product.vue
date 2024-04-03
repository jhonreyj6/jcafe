<template>
    <div>
        <div
            class="card shadow-0 border rounded-3 mb-3"
            v-for="(data, index) in datas.data"
            :key="index"
        >
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 col-12">
                        <div
                            class="bg-image hover-zoom ripple rounded mb-3 ripple-surface"
                        >
                            <img
                                :src="data.image_url"
                                class="w-100 product-img img-thumbnail"
                            />
                        </div>
                    </div>
                    <div class="col-md-6 col-7">
                        <h5>{{ data.name }}</h5>
                        <div class="d-flex flex-row mb-2">
                            <Star :rating="data.rating" />
                        </div>
                        <p class="mb-2 product-description">
                            {{ data.description }}
                        </p>
                        <h6>Size:</h6>
                        <div class="mt-2">
                            <span
                                v-for="(size, index) in data.get_variants"
                                :key="index"
                            >
                                <input
                                    v-if="index == 0"
                                    type="hidden"
                                    :id="`input_size_` + data.id"
                                    :value="data.default_variant"
                                />
                                <button
                                    class="btn btn-sm me-1 text-white"
                                    :class="
                                        data.default_variant == size.value
                                            ? 'btn-info'
                                            : 'btn-outline-info'
                                    "
                                    @click="changeSize($event, data, size)"
                                >
                                    {{ size.value + size.unit }}
                                </button>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-3 col-5 border-sm-start-none">
                        <!-- <h4 class="mb-1 text-center" :id="`price_` + data.id">
                            ₱{{ data.default_price }}
                        </h4> -->
                        <div class="text-center">
                            <!-- <div class="input-group mb-1">
                                <button
                                    class="btn btn-primary btn-sm"
                                    type="button"
                                    @click="decreaseQuantity(data)"
                                >
                                    <i class="fa fa-minus"></i>
                                </button>
                                <input
                                    type="number"
                                    class="form-control text-center"
                                    :id="'input_' + data.id"
                                    min="1"
                                    max
                                    value="1"
                                    @change="changeQuantity(data)"
                                />
                                <button
                                    class="btn btn-primary btn-sm"
                                    type="button"
                                    @click="increaseQuantity(data)"
                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div> -->

                            <button
                                type="button"
                                @click="addToCart(data)"
                                v-if="currentUser"
                                class="btn btn-outline-primary mb-2 my-auto"
                            >
                                Add to cart
                            </button>

                            <router-link
                                v-else
                                to="/login"
                                class="btn btn-outline-primary mb-2 my-auto"
                            >
                                Add to cart
                            </router-link>

                            <div class="text-muted">
                                {{ data.default_stocks }} stocks left
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { userStore } from "../stores/userStore";
import Star from "./Star.vue";

export default {
    data() {
        return {};
    },
    components: {
        Star,
    },

    props: ["datas"],

    computed: {
        currentUser() {
            return userStore().user;
        },
    },

    methods: {
        addToCart(data) {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "POST",
                data: {
                    product_id: data.id,
                    quantity: 1,
                    product_variant_id: data.default_product_variant_id,
                },
                url: `/api/cart`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    userStore().$patch((state) => {
                        state.cart_count = res.data.quantity;
                    });
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        increaseQuantity(data) {
            if (
                +document.getElementById("input_" + data.id).value <
                data.default_stocks
            ) {
                document.getElementById("input_" + data.id).value++;
            }
        },

        decreaseQuantity(data) {
            if (document.getElementById("input_" + data.id).value > 1) {
                document.getElementById("input_" + data.id).value--;
            }
        },

        changeQuantity(data) {
            if (document.getElementById("input_" + data.id).value > 1) {
                document.getElementById("input_" + data.id).value =
                    data.default_stocks;
            }

            if (document.getElementById("input_" + data.id).value == "") {
                document.getElementById("input_" + data.id).value =
                    data.default_stocks;
            }
        },

        changeSize(e, data, size) {
            data.default_price = size.price;
            data.default_variant = size.value; // changing the size and color class
            data.default_product_variant_id = size.id;
            data.default_stocks = size.stock;
        },
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
    // },

    updated() {},

    mounted() {},
};
</script>

<style scoped>
.product-img {
    height: 170px;
}

.product-description {
    max-height: 100px;
    overflow-y: hidden;
}
</style>

