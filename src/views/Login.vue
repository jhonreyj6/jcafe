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

                        <form @submit.prevent="authenticate" class="mb-4">
                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form1Example13"
                                    >Email address:</label
                                >
                                <input
                                    type="email"
                                    v-model="form.email"
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
                                    v-model="form.password"
                                    id="form1Example23"
                                    class="form-control form-control-lg"
                                />
                            </div>

                            <!-- Submit button -->
                            <button
                                type="submit"
                                ref="login_btn"
                                class="btn btn-primary w-100 bg-gradient btn-lg btn-block"
                            >
                                Sign In
                            </button>
                        </form>

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
<script>
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
        };
    },
    components: {
    },

    props: [],

    computed: {},

    methods: {

        socialiteLogin(provider) {
            // const newWindow = this.openWindow('', 'message');

            axios({
                method: "GET",
                url: `/api/auth/${provider}/redirect`,
            })
                .then((res) => {
                    window.open(res.data, "", "width=1000,height=750");
                    // newWindow.location.href = res.data;
                })
                .catch((err) => {
                    console.log(err.response);
                });
        },

        authenticate() {
            this.$refs.login_btn.setAttribute("disabled", true);
            axios({
                method: "post",
                params: {
                    email: this.form.email,
                    password: this.form.password,
                },
                url: `/api/auth/login`,
            })
                .then((res) => {
                    this.$refs.login_btn.removeAttribute("disabled");
                    userStore().$patch((state) => {
                        state.user = Object.assign({}, res.data.user, {
                            access_token: res.data.access_token,
                        });
                        state.access_token = res.data.access_token;
                        state.subscription = res.data.subscription;
                    });
                    this.$router.push("/dashboard");
                })
                .catch((err) => {
                    this.$refs.login_btn.removeAttribute("disabled");
                });
        },
    },

    // watch: {
    //     $data: {
    //         handler: function (val, oldVal) {
    //             console.log("watcher: ", val);
    //         },
    //         deep: true,
    //     },

    //     $props: {
    //         handler: function (val, oldVal) {
    //             console.log("watcher: ", val);
    //         },
    //         deep: true,
    //     },
    // },

    updated() {},

    beforeUnmount() {
    },

    mounted() {
        
    },
};
</script>

<style scoped>
/* .container {
    margin-top: 100px;
    max-width: 900px;
} */
</style>

