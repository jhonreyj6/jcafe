<template>
    <div class="space-intro container">
        <div class="d-flex flex-lg-row flex-column gap-4" v-if="!stripe.state">
            <div class="card w-100">
                <div class="card-body p-0 h-75">
                    <div class="bg-light bg-gradient py-4">
                        <h3 class="text-center">
                            <i class="fa fa-gamepad h2"></i>
                            Visitor
                        </h3>
                        <div class="text-center">
                            <h3>₱250 / month</h3>
                        </div>
                    </div>
                    <div class="px-4 my-4 h6">
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Computer Peripherals Access
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Game Request
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Technical Support
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Account No Limit
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Christmas Event
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Price Promo
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Reservations Online
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Tournament Reservation
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Tournament Priority
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Membership Bonus
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Email / Call Support
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            SMS Notification
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Membership Loyalty Christmas Gift
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            VIP Units Access
                        </div>
                    </div>
                    <div class="m-4">
                        <div
                            class="btn btn-outline-primary bg-gradient w-100"
                            @click="
                                stripe.state = true;
                                subscription_plan = 'Visitor';
                            "
                        >
                            Subscribe
                        </div>
                    </div>
                </div>
            </div>
            <div class="card w-100">
                <div class="card-body p-0 h-75">
                    <div class="bg-info bg-gradient py-4 text-white">
                        <h3 class="text-center">
                            <i class="fa fa-gamepad h2"></i>
                            Regular
                        </h3>
                        <div class="text-center">
                            <h3>₱500 / month</h3>
                        </div>
                    </div>
                    <div class="px-4 my-4 h6">
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Membership Loyalty Christmas Gift
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            VIP Units Access
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Computer Peripherals Access
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Game Request
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Technical Support
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Account No Limit
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Christmas Event
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Price Promo
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Reservations Online
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Tournament Reservation
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Tournament Priority
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Membership Bonus
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            Email / Call Support
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-times text-danger me-2"></i>
                            SMS Notification
                        </div>
                    </div>
                    <div class="m-4">
                        <div
                            class="btn btn-outline-primary bg-gradient w-100"
                            @click="
                                stripe.state = true;
                                subscription_plan = 'Regular';
                            "
                        >
                            Subscribe
                        </div>
                    </div>
                </div>
            </div>
            <div class="card w-100">
                <div class="card-body p-0 h-75">
                    <div class="bg-primary bg-gradient py-4 text-white">
                        <h3 class="text-center">
                            <i class="fa fa-gamepad h2"></i>
                            Loyal
                        </h3>
                        <div class="text-center">
                            <h3>₱750 / month</h3>
                        </div>
                    </div>
                    <div class="px-4 my-4 h6">
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Membership Loyalty Christmas Gift
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            VIP Units Access
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Computer Peripherals Access
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Game Request
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Technical Support
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Account No Limit
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Christmas Event
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Price Promo
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Reservations Online
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Tournament Reservation
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Tournament Priority
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Membership Bonus
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            Email / Call Support
                        </div>
                        <div class="d-flex align-items-center py-1">
                            <i class="fa fa-check text-success me-2"></i>
                            SMS Notification
                        </div>
                    </div>
                    <div class="m-4">
                        <button
                            class="btn btn-outline-primary bg-gradient w-100"
                            @click="
                                stripe.state = true;
                                subscription_plan = 'Loyal';
                            "
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="stripe.state" class="card p-4 mx-auto stripe-form">
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
                <label for="fname" class="form-label">Full name</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="stripe.form.name"
                    id="fname"
                    placeholder="Enter your full name"
                />
            </div>
            <div class="mb-3">
                <label for="street" class="form-label">Street</label>
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
                    <label for="city" class="form-label">City</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="stripe.form.address.city"
                        id="city"
                        placeholder="Enter your City"
                    />
                </div>
                <div class="mb-3 col-md-4">
                    <label for="country" class="form-label">Country</label>
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
                    v-text="stripe.processing ? 'Processing' : 'Pay Now'"
                ></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { userStore } from "../../stores/userStore";
import { loadStripe } from "@stripe/stripe-js";
import { onBeforeMount, onMounted, ref } from "vue";

const router = useRouter();

const auth = ref({
    subscription: "",
});

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

const subscription_plan = ref();

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
        stripe.value.processing = false;
    } else {
        stripe.value.form.payment_method_id = paymentMethod.id;

        const AuthStr = "Bearer ".concat(userStore().accessToken);
        axios({
            method: "POST",
            params: {
                subscription_plan: subscription_plan.value,
                payment_method_id: stripe.value.form.payment_method_id,
            },
            url: `/api/users/membership`,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {
                userStore().$patch((state) => {
                    state.subscription = true;
                });
                router.push("/membership/status");
            })
            .catch((err) => {
                e.target.disabled = false;
                stripe.value.processing = false;
            });
    }
};

const renderStripe = async () => {
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
};

const getAuthSubscription = () => {
    const AuthStr = "Bearer ".concat(userStore().accessToken);
    axios({
        method: "GET",
        url: `/api/users/membership/show`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            auth.value.subscription = res.data.subscription[0];
            auth.value.subscription.type = JSON.parse(
                auth.value.subscription.type
            );
        })
        .catch((err) => {});
};

onBeforeMount(() => {
    getAuthSubscription();
});

onMounted(() => {
    renderStripe();
});
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        max-width: 1080px;
    }
}

.space-intro {
    margin-bottom: 64px;
}
</style>