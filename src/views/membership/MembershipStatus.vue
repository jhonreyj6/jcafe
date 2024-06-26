<script setup>
import { computed, onMounted, ref } from "vue";
import { userStore } from "../../stores/userStore";

const subscription = ref();

const currentUser = computed(() => {
    return userStore();
});

const getSubscription = async () => {
    const AuthStr = "Bearer ".concat(userStore().accessToken);
    axios({
        method: "GET",
        url: `/api/users/membership/show`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            let new_res_type = JSON.parse(res.data.type);
            res.data.type = new_res_type;
            subscription.value = res.data;

            console.log(subscription.value);
        })
        .catch((err) => {});
};

const resumeSubscription = () => {
    const AuthStr = "Bearer ".concat(userStore().accessToken);

    axios({
        method: "POST",
        data: {
            subscription: subscription.value,
        },
        url: `/api/users/membership/resume`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            let new_res_type = JSON.parse(res.data.type);
            res.data.type = new_res_type;
            subscription.value = res.data;

            console.log(subscription.value);
        })
        .catch((err) => {});
};

const cancelSubscription = async () => {
    const AuthStr = "Bearer ".concat(userStore().accessToken);

    // return to original type value

    axios({
        method: "POST",
        data: {
            id: subscription.value.id,
        },
        url: `/api/users/membership/cancel`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            let new_res_type = JSON.parse(res.data.type);
            res.data.type = new_res_type;
            subscription.value = res.data;

            console.log(subscription.value);
        })
        .catch((err) => {});
};

onMounted(() => {
    getSubscription();
});
</script>

<style scoped>
</style>

<template>
    <div class="space-intro container mb-4">
        <div class="row" v-if="subscription">
            <div class="col-lg-8 mb-4">
                <div
                    class="card w-100"
                    v-if="subscription?.type.name == 'Visitor'"
                >
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
                    </div>
                </div>

                <div
                    class="card w-100"
                    v-if="subscription?.type.name == 'Regular'"
                >
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
                    </div>
                </div>

                <div
                    class="card w-100"
                    v-if="subscription?.type.name == 'Loyal'"
                >
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
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title text-primary">
                            {{ subscription?.type.name }}
                        </h4>

                        <div class="d-flex mb-1">
                            <span>Trial Status:</span
                            ><span class="ms-auto">
                                {{ subscription.trial_ends }}</span
                            >
                        </div>

                        <div class="d-flex mb-1">
                            <span>Date Started:</span
                            ><span class="ms-auto">{{
                                subscription.creation_time
                            }}</span>
                        </div>

                        <div class="d-flex mb-4">
                            <span>Date End:</span
                            ><span class="ms-auto">{{
                                subscription.end_time
                            }}</span>
                        </div>

                        <div class="d-grid">
                            <button
                                type="button"
                                class="btn btn-primary"
                                v-if="!subscription.ends_at"
                                @click="cancelSubscription"
                            >
                                Cancel Subscription
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary"
                                v-else
                                @click="resumeSubscription"
                            >
                                Resume Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
