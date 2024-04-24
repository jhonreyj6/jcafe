<template>
    <div>
        <section class="space-intro">
            <div class="container py-5 h-100">
                <div
                    class="row d-flex align-items-center justify-content-center h-100"
                >
                    <div class="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            class="img-fluid"
                            alt="Phone image"
                        />
                    </div>
                    <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <!-- <div class="mb-4 d-flex flex-row gap-2">
                            <button
                                type="button"
                                class="btn btn-primary w-100"
                                @click="socialiteLogin('facebook')"
                            >
                                <i class="fa fa-facebook-f"></i> Facebook
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger w-100"
                                @click="socialiteLogin('google')"
                            >
                                <i class="fa fa-google"></i> Google
                            </button>
                        </div> -->

                        <div class="mb-4">
                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form1Example13"
                                    >Email address:</label
                                >
                                <input
                                    type="email"
                                    v-model="email"
                                    id="form1Example13"
                                    class="form-control form-control-lg"
                                />
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form1Example23"
                                    >Password:</label
                                >
                                <input
                                    type="password"
                                    v-model="password"
                                    id="form1Example23"
                                    class="form-control form-control-lg"
                                />
                            </div>

                            <!-- Submit button -->
                            <button
                                type="button"
                                @click="authenticate"
                                class="btn btn-primary w-100 bg-gradient btn-lg btn-block"
                            >
                                Sign In
                            </button>
                        </div>

                        <div
                            class="d-flex justify-content-around align-items-center mb-4"
                        >
                            <router-link to="/reset/password/request"
                                >Forgot password?</router-link
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { userStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const email = ref();
const password = ref();
const router = useRouter();

const authenticate = async (e) => {
    e.target.setAttribute("disabled", true);
    axios({
        method: "post",
        params: {
            email: email.value,
            password: password.value,
        },
        url: `/api/auth/login`,
    })
        .then((res) => {
            e.target.removeAttribute("disabled");
            userStore().$patch((state) => {
                state.user = Object.assign({}, res.data.user, {
                    access_token: res.data.access_token,
                });
                state.access_token = res.data.access_token;
                state.subscription = res.data.subscription;
            });
            router.push("/dashboard");
        })
        .catch((err) => {
            e.target.removeAttribute("disabled");
        });
};
</script>

<style scoped>
</style>

