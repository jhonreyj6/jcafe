<template>
    <div>
        <div class="space-intro">
            <div class="container">
                <div class="mb-5">
                    <div class="row" v-show="!stripe.state">
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-body p-4">
                                    <div class="h5" v-if="cart_items">
                                        Shopping Cart
                                    </div>
                                    <div v-else class="h5">
                                        No items in the cart yet.
                                    </div>
                                    <hr />

                                    <div
                                        class="d-flex flex-row justify-content-between align-items-center mb-4"
                                    >
                                        <div
                                            class="form-check"
                                            v-if="cart_items"
                                        >
                                            <label
                                                class="form-check-label fs-5"
                                            >
                                                <input
                                                    class="form-check-input"
                                                    ref="select_all"
                                                    type="checkbox"
                                                    @change="selectAll($event)"
                                                />
                                                Select All
                                            </label>
                                        </div>
                                        <div v-if="cart_items">
                                            <a
                                                role="button"
                                                class="text-danger fs-5"
                                                @click="deleteCartItem"
                                            >
                                                <i class="fa fa-trash mr-1"></i>
                                                Delete
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        class="card mb-3"
                                        v-for="(item, index) in cart_items"
                                        :key="index"
                                    >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-2 mb-2">
                                                    <label
                                                        :for="
                                                            'label_' + item.id
                                                        "
                                                    >
                                                        <img
                                                            :src="
                                                                item.image_url
                                                            "
                                                            :alt="item.name"
                                                            class="img"
                                                            height="150"
                                                        />
                                                    </label>
                                                    <div class="text-center">
                                                        <input
                                                            class="form-check-input"
                                                            @change="
                                                                selectProduct(
                                                                    $event,
                                                                    item
                                                                )
                                                            "
                                                            type="checkbox"
                                                            v-model="orders"
                                                            :value="item.id"
                                                            :id="
                                                                'label_' +
                                                                item.id
                                                            "
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-7 mb-2">
                                                    <div
                                                        class="h5 mb-1 text-primary"
                                                    >
                                                        {{
                                                            item.product_details
                                                                .name
                                                        }}
                                                    </div>
                                                    <div
                                                        class="text-black-50 mb-1"
                                                    >
                                                        Variant:
                                                        {{
                                                            item
                                                                .product_variant_details
                                                                .value +
                                                            item
                                                                .product_variant_details
                                                                .unit
                                                        }}
                                                    </div>
                                                    <div
                                                        class="product-description"
                                                    >
                                                        {{
                                                            item.product_details
                                                                .description
                                                        }}
                                                    </div>
                                                    <div class="mt-2">
                                                        <Star
                                                            :rating="
                                                                item
                                                                    .product_details
                                                                    .rating
                                                            "
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="text-center h4">
                                                        P
                                                        {{
                                                            item
                                                                .product_variant_details
                                                                .price
                                                        }}
                                                    </div>
                                                    <div
                                                        class="input-group mb-1"
                                                    >
                                                        <button
                                                            @click="
                                                                decreaseQuantity(
                                                                    item
                                                                )
                                                            "
                                                            class="btn btn-primary btn-sm bg-gradient"
                                                            type="button"
                                                        >
                                                            <i
                                                                class="fa fa-minus"
                                                            ></i>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            @change="
                                                                changeQuantity(
                                                                    item
                                                                )
                                                            "
                                                            :id="
                                                                'input_' +
                                                                item.id
                                                            "
                                                            :value="
                                                                item.quantity
                                                            "
                                                            min="1"
                                                            class="form-control text-center"
                                                        />
                                                        <button
                                                            @click="
                                                                increaseQuantity(
                                                                    item
                                                                )
                                                            "
                                                            class="btn btn-primary btn-sm bg-gradient"
                                                            type="button"
                                                        >
                                                            <i
                                                                class="fa fa-plus"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <div class="text-center">
                                                        {{
                                                            item
                                                                .product_variant_details
                                                                .stock
                                                        }}
                                                        stocks left
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-body p-4">
                                    <h3>Summary</h3>
                                    <hr />
                                    <div class="mt-4">
                                        <div class="d-flex">
                                            <div class="h5">Products</div>
                                            <div class="ms-auto">
                                                <span>P</span>
                                                <span>{{
                                                    computedSubTotal
                                                }}</span>
                                            </div>
                                        </div>

                                        <div class="d-flex">
                                            <div class="h5">Discount</div>
                                            <div class="ms-auto">0</div>
                                        </div>

                                        <div class="d-flex mb-2">
                                            <div class="h5">Total</div>
                                            <div class="ms-auto">
                                                <span>P</span>
                                                <span>{{ computedTotal }}</span>
                                            </div>
                                        </div>
                                        <hr />

                                        <div class="text-center">
                                            <button
                                                @click="
                                                    stripe.state =
                                                        true && orders.length
                                                "
                                                class="btn btn-primary w-100"
                                            >
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-show="stripe.state && orders.length"
                        class="card p-4 mx-auto stripe-form"
                    >
                        <div class="mb-2">
                            <div
                                class="d-flex flex-row justify-content-between align-items-center mb-4"
                            >
                                <h4>Payment Details</h4>
                                <button
                                    type="button"
                                    class="btn btn-danger text-lg"
                                    @click="stripe.state = false"
                                >
                                    Go back
                                </button>
                            </div>
                            <div id="card-element"></div>
                        </div>
                        <div class="mb-3">
                            <label for="fname" class="form-label"
                                >Full name</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                v-model="stripe.form.name"
                                id="fname"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div class="mb-3">
                            <label for="street" class="form-label"
                                >Street</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                v-model="stripe.form.address.street"
                                id="street"
                                placeholder="Enter your Street"
                            />
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-4">
                                <label for="city" class="form-label"
                                    >City</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="stripe.form.address.city"
                                    id="city"
                                    placeholder="Enter your City"
                                />
                            </div>

                            <div class="mb-3 col-md-4">
                                <label for="country" class="form-label"
                                    >Country</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="stripe.form.address.country"
                                    id="country"
                                    placeholder="Enter your Country"
                                />
                            </div>

                            <div class="mb-3 col-md-4">
                                <label for="postal_code" class="form-label"
                                    >Postal code</label
                                >
                                <input
                                    type="number"
                                    class="form-control"
                                    v-model="stripe.form.address.postal_code"
                                    id="postal_code"
                                    placeholder="Enter your Postal Code"
                                />
                            </div>
                        </div>

                        <div class="mb-2 mt-2">
                            <button
                                class="btn btn-primary text-center w-100"
                                @click="processPayment($event)"
                                v-text="
                                    stripe.processing ? 'Processing' : 'Pay Now'
                                "
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { userStore } from "../stores/userStore";
import { loadStripe } from "@stripe/stripe-js";
import Star from "../components/Star.vue";
import { computed, onMounted, ref, watch } from "vue";

const cart_items = ref();
const orders = ref([]);
const subtotal = ref();
const select_all = ref();
const stripe = ref({
    state: false,
    processing: false,
    load_stripe: "",
    card_element: "",
    form: {
        name: "",
        address: {
            street: "",
            city: "",
            country: "",
            postal_code: "",
        },
        payment_method_id: "",
    },
});

const computedSubTotal = computed(() => {
    subtotal.value = null;
    orders.value.forEach((elem, index) => {
        cart_items.value.forEach((item) => {
            if (elem == item.id) {
                subtotal.value = subtotal.value +=
                    item.product_variant_details.price * item.quantity;
            }
        });
    });
    return subtotal.value;
});

const computedTotal = computed(() => {
    return subtotal.value;
});

const increaseQuantity = (item) => {
    if (item.quantity < item.product_variant_details.stock) {
        item.quantity++;
        userStore().$patch((state) => {
            state.cart_count++;
        });

        const AuthStr = "Bearer ".concat(userStore().access_token);
        axios({
            method: "patch",
            params: {
                quantity: item.quantity,
            },
            url: `/api/cart/${item.id}`,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {})
            .catch((err) => {});
    }
};

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
        userStore().$patch((state) => {
            state.cart_count--;
        });

        const AuthStr = "Bearer ".concat(userStore().access_token);
        axios({
            method: "patch",
            params: {
                quantity: item.quantity,
            },
            url: `/api/cart/${item.id}`,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {})
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }
};

const changeQuantity = (item) => {
    if (
        document.getElementById("input_" + item.id).value == "" ||
        document.getElementById("input_" + item.id).value <= 0
    ) {
        document.getElementById("input_" + item.id).value = item.quantity;
    }

    if (
        document.getElementById("input_" + item.id).value >
        item.product_variant_details.stock
    ) {
        document.getElementById("input_" + item.id).value =
            item.product_variant_details.stock;
    }

    // commit mutation for cart count
    if (item.quantity > +document.getElementById("input_" + item.id).value) {
        userStore().$patch((state) => {
            state.cart_count -
                (item.quantity -
                    +document.getElementById("input_" + item.id).value);
        });
    } else {
        userStore().$patch((state) => {
            state.cart_count +
                document.getElementById("input_" + item.id).value -
                item.quantity;
        });
    }

    item.quantity = +document.getElementById("input_" + item.id).value;

    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "patch",
        params: {
            quantity: item.quantity,
        },
        url: `/api/cart/${item.id}`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {})
        .catch((err) => {
            console.log(err);
        });
};

const deleteCartItem = () => {
    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios
        .delete(`/api/cart`, {
            params: {
                orders: orders.value,
            },
            headers: {
                Authorization: AuthStr,
            },
        })
        .then((res) => {
            cart_items.value = cart_items.value.filter((item) => {
                return !orders.value.includes(item.id);
            });
            orders.value = [];
            select_all.checked = false;
            // userStore().$patch((state) => {
            //     state.cart_count = res.data.quantity;
            // });
        })
        .catch((err) => {});
};

const selectProduct = (e, item) => {
    if (select_all.checked && orders.value.length < cart_items.value.length) {
        select_all.checked = false;
    }

    if (orders.value.length == cart_items.value.length) {
        select_all.checked = true;
    }
};

const selectAll = (e) => {
    if (e.target.checked) {
        orders.value = [];
        cart_items.value.forEach((elem) => {
            orders.value.push(elem.id);
        });
    } else {
        orders.value = [];
    }
};

const getCartITems = () => {
    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "get",
        url: `/api/cart`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            cart_items.value = res.data.cart_items;
        })
        .catch((err) => {});
};

const processPayment = async (e) => {
    stripe.value.processing = true;
    e.target.disabled = true;

    const { paymentMethod, error } =
        await stripe.value.load_stripe.createPaymentMethod(
            "card",
            stripe.value.card_element,
            {
                billing_details: {
                    name: stripe.value.form.name,
                    email: userStore().user.email,
                    address: {
                        line1: stripe.value.form.address.street,
                        city: stripe.value.form.address.city,
                        country: "PH",
                        postal_code: stripe.value.form.address.postal_code,
                    },
                },
            }
        );

    if (error) {
        paymentProcessing.value = false;
        console.error(error);
    } else {
        stripe.value.form.payment_method_id = paymentMethod.id;

        const AuthStr = "Bearer ".concat(userStore().accessToken);
        axios({
            method: "POST",
            params: {
                orders: orders.value,
                payment_method_id: stripe.value.form.payment_method_id,
            },
            url: `/api/orders`,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {
                let cart_count_deduct = 0;

                cart_items.value.forEach((item) => {
                    if (orders.value.includes(item.id)) {
                        cart_count_deduct = cart_count_deduct + item.quantity;
                    }
                });

                userStore().$patch((state) => {
                    state.cart_count -= cart_count_deduct;
                });
                window.location.reload();
            })
            .catch((err) => {
                e.target.disabled = false;
            });
    }
};

watch(orders, async (val, oldVal) => {
    console.log(val);
});

onMounted(async () => {
    getCartITems();

    stripe.value.load_stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    stripe.value.card_element = stripe.value.load_stripe
        .elements()
        .create("card", {
            classes: {
                base: "bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out",
            },
            hidePostalCode: true,
        });

    stripe.value.card_element.mount("#card-element");
});

// export default {
//     data() {
//         return {
//             cart_items: "",
//             orders: [],
//             subtotal: "",
//             // event: null,
//             stripe: {
//                 state: false,
//                 processing: false,
//                 load_stripe: "",
//                 card_element: "",
//                 form: {
//                     name: "",
//                     address: {
//                         street: "",
//                         city: "",
//                         country: "",
//                         postal_code: "",
//                     },
//                     payment_method_id: "",
//                 },
//             },
//         };
//     },
//     components: {
//         Star,
//     },

//     props: [],

//     computed: {
//         computedSubTotal() {
//             this.subtotal = null;
//             this.orders.forEach((elem, index) => {
//                 this.cart_items.forEach((item) => {
//                     if (elem == item.id) {
//                         this.subtotal = this.subtotal +=
//                             item.product_variant_details.price * item.quantity;
//                     }
//                 });
//             });
//             return this.subtotal;
//         },

//         computedTotal() {
//             return this.subtotal;
//         },
//     },

//     methods: {
//         increaseQuantity(item) {
//             if (item.quantity < item.product_variant_details.stock) {
//                 item.quantity++;
//                 userStore().$patch((state) => {
//                     state.cart_count++;
//                 });

//                 const AuthStr = "Bearer ".concat(userStore().access_token);
//                 axios({
//                     method: "patch",
//                     params: {
//                         quantity: item.quantity,
//                     },
//                     url: `/api/cart/${item.id}`,
//                     headers: { Authorization: AuthStr },
//                 })
//                     .then((res) => {})
//                     .catch((err) => {});
//             }
//         },

//         decreaseQuantity(item) {
//             if (item.quantity > 1) {
//                 item.quantity--;
//                 userStore().$patch((state) => {
//                     state.cart_count--;
//                 });

//                 const AuthStr = "Bearer ".concat(userStore().access_token);
//                 axios({
//                     method: "patch",
//                     params: {
//                         quantity: item.quantity,
//                     },
//                     url: `/api/cart/${item.id}`,
//                     headers: { Authorization: AuthStr },
//                 })
//                     .then((res) => {})
//                     .catch((err) => {
//                         console.log(err.response.data.message);
//                     });
//             }
//         },

//         changeQuantity(item) {
//             if (
//                 document.getElementById("input_" + item.id).value == "" ||
//                 document.getElementById("input_" + item.id).value == 0
//             ) {
//                 document.getElementById("input_" + item.id).value =
//                     item.quantity;
//             }

//             if (
//                 document.getElementById("input_" + item.id).value >
//                 item.product_variant_details.stock
//             ) {
//                 document.getElementById("input_" + item.id).value =
//                     item.product_variant_details.stock;
//             }

//             // commit mutation for cart count
//             if (
//                 item.quantity >
//                 +document.getElementById("input_" + item.id).value
//             ) {
//                 userStore().$patch((state) => {
//                     state.cart_count -
//                         (item.quantity -
//                             +document.getElementById("input_" + item.id).value);
//                 });
//             } else {
//                 userStore().$patch((state) => {
//                     state.cart_count +
//                         document.getElementById("input_" + item.id).value -
//                         item.quantity;
//                 });
//             }

//             item.quantity = +document.getElementById("input_" + item.id).value;

//             const AuthStr = "Bearer ".concat(userStore().access_token);
//             axios({
//                 method: "patch",
//                 params: {
//                     quantity: item.quantity,
//                 },
//                 url: `/api/cart/${item.id}`,
//                 headers: { Authorization: AuthStr },
//             })
//                 .then((res) => {})
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         },

//         deleteCartItem() {
//             const AuthStr = "Bearer ".concat(userStore().access_token);
//             axios
//                 .delete(`/api/cart`, {
//                     params: {
//                         orders: this.orders,
//                     },
//                     headers: {
//                         Authorization: AuthStr,
//                     },
//                 })
//                 .then((res) => {
//                     this.orders = [];
//                     this.$refs.selectAll.checked = false;
//                     // userStore().$patch((state) => {
//                     //     state.cart_count = res.data.quantity;
//                     // });
//                 })
//                 .catch((err) => {});
//         },

//         selectProduct(e, item) {
//             if (
//                 this.$refs.selectAll.checked &&
//                 this.orders.length < this.cart_items.length
//             ) {
//                 this.$refs.selectAll.checked = false;
//             }

//             if (this.orders.length == this.cart_items.length) {
//                 this.$refs.selectAll.checked = true;
//             }
//         },

//         selectAll(e) {
//             if (e.target.checked) {
//                 this.orders = [];
//                 this.cart_items.forEach((elem) => {
//                     this.orders.push(elem.id);
//                 });
//             } else {
//                 this.orders = [];
//             }
//         },

//         getCartITems() {
//             const AuthStr = "Bearer ".concat(userStore().access_token);
//             axios({
//                 method: "get",
//                 url: `/api/cart`,
//                 headers: { Authorization: AuthStr },
//             })
//                 .then((res) => {
//                     this.cart_items = res.data.cart_items;
//                 })
//                 .catch((err) => {});
//         },

//         // submitOrder(e) {
//         //     e.target.disabled = true;
//         //     const AuthStr = "Bearer ".concat(userStore().access_token);
//         //     axios({
//         //         method: "POST",
//         //         params: {
//         //             orders: this.orders,
//         //         },
//         //         url: `/api/orders`,
//         //         headers: { Authorization: AuthStr },
//         //     })
//         //         .then((res) => {
//         //             e.target.disabled = false;
//         //             this.cart_items.forEach((item, index) => {
//         //                 if (this.orders.includes(item.id)) {
//         //                     this.cart_items.splice(index, 1);
//         //                 }
//         //             });
//         //             this.orders = [];
//         //         })
//         //         .catch((err) => {});
//         // },

//         async processPayment(e) {
//             this.stripe.processing = true;
//             e.target.disabled = true;

//             const { paymentMethod, error } =
//                 await this.stripe.load_stripe.createPaymentMethod(
//                     "card",
//                     this.stripe.card_element,
//                     {
//                         billing_details: {
//                             name: this.stripe.form.name,
//                             email: userStore().user.email,
//                             address: {
//                                 line1: this.stripe.form.address.street,
//                                 city: this.stripe.form.address.city,
//                                 country: "PH",
//                                 postal_code:
//                                     this.stripe.form.address.postal_code,
//                             },
//                         },
//                     }
//                 );

//             if (error) {
//                 this.paymentProcessing = false;
//                 console.error(error);
//             } else {
//                 this.stripe.form.payment_method_id = paymentMethod.id;

//                 const AuthStr = "Bearer ".concat(userStore().accessToken);
//                 axios({
//                     method: "POST",
//                     params: {
//                         orders: this.orders,
//                         payment_method_id: this.stripe.form.payment_method_id,
//                     },
//                     url: `/api/orders`,
//                     headers: { Authorization: AuthStr },
//                 })
//                     .then((res) => {
//                         let cart_count_deduct = 0;

//                         this.cart_items.forEach((item) => {
//                             if (this.orders.includes(item.id)) {
//                                 cart_count_deduct =
//                                     cart_count_deduct + item.quantity;
//                             }
//                         });

//                         userStore().$patch((state) => {
//                             state.cart_count -= cart_count_deduct;
//                         });
//                         window.location.reload();
//                     })
//                     .catch((err) => {
//                         e.target.disabled = false;
//                     });
//             }
//         },
//     },

//     // watch: {
//     //     $data: {
//     //         handler: function (val, oldVal) {
//     //             console.log("watcher: ", val);
//     //         },
//     //         deep: true,
//     //     },
//     // },

//     updated() {},

//     beforeCreate() {},

//     async mounted() {
//         this.getCartITems();

//         this.stripe.load_stripe = await loadStripe(
//             import.meta.env.VITE_STRIPE_PK
//         );
//         this.stripe.card_element = this.stripe.load_stripe
//             .elements()
//             .create("card", {
//                 classes: {
//                     base: "bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out",
//                 },
//                 hidePostalCode: true,
//             });

//         this.stripe.card_element.mount("#card-element");
//     },
// };
</script>

<style scoped>
.btn-info {
    color: white;
}

label {
    display: block !important;
}

.stripe-form {
    max-width: 768px;
}

.product-description {
    max-height: 120px;
    overflow-y: hidden;
}
</style>
