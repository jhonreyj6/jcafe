<template>
    <div>
        <div class="vh-100">
            <div
                class="mask space-intro d-flex align-items-center h-100 gradient-custom-3 pb-5"
            >
                <div class="container">
                    <div
                        class="row d-flex justify-content-center align-items-center h-100"
                    >
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style="border-radius: 15px">
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-3">
                                        Create an account
                                    </h2>
                                    <form @submit.prevent="register">
                                        <div class="form-outline mb-2">
                                            <label
                                                class="form-label"
                                                for="form3Example1cg"
                                                >First Name:</label
                                            >
                                            <input
                                                type="text"
                                                id="form3Example1cg"
                                                v-model="fname"
                                                class="form-control form-control-lg"
                                            />
                                            <span
                                                class="text-danger"
                                                v-for="(
                                                    message, index
                                                ) in error.first_name"
                                                :key="index"
                                                >{{ message }}</span
                                            >
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label
                                                class="form-label"
                                                for="form4Example1cg"
                                                >Last Name</label
                                            >
                                            <input
                                                type="text"
                                                id="form4Example1cg"
                                                v-model="lname"
                                                class="form-control form-control-lg"
                                            />
                                            <span
                                                class="text-danger"
                                                v-for="(
                                                    message, index
                                                ) in error.last_name"
                                                :key="index"
                                                >{{ message }}</span
                                            >
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label
                                                class="form-label"
                                                for="form3Example3cg"
                                                >Your Email</label
                                            >
                                            <input
                                                type="email"
                                                id="form3Example3cg"
                                                v-model="email"
                                                class="form-control form-control-lg"
                                            />
                                            <span
                                                class="text-danger"
                                                v-for="(
                                                    message, index
                                                ) in error.email"
                                                :key="index"
                                                >{{ message }}</span
                                            >
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label
                                                class="form-label"
                                                for="form3Example4cg"
                                                >Password</label
                                            >
                                            <input
                                                type="password"
                                                id="form3Example4cg"
                                                v-model="password"
                                                class="form-control form-control-lg"
                                                required
                                            />
                                            <span
                                                class="text-danger"
                                                v-for="(
                                                    message, index
                                                ) in error.password"
                                                :key="index"
                                                >{{ message }}</span
                                            >
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label
                                                class="form-label"
                                                for="form3Example4cdg"
                                                >Repeat password</label
                                            >
                                            <input
                                                type="password"
                                                id="form3Example4cdg"
                                                v-model="confirm"
                                                class="form-control form-control-lg"
                                            />
                                            <span
                                                class="text-danger"
                                                v-for="(
                                                    message, index
                                                ) in error.confirm"
                                                :key="index"
                                                >{{ message }}</span
                                            >
                                        </div>

                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-block btn-lg text-white bg-gradient"
                                            >
                                                Register
                                            </button>
                                        </div>

                                        <p
                                            class="text-center text-muted mt-5 mb-0"
                                        >
                                            Have already an account?
                                            <router-link
                                                to="/login"
                                                class="fw-bold text-body"
                                                ><u>Login here</u></router-link
                                            >
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const fname = ref();
const lname = ref();
const email = ref();
const password = ref();
const confirm = ref();
const error = ref({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
});

const router = useRouter();

const register = () => {
    axios({
        method: "post",
        params: {
            first_name: fname.value,
            last_name: lname.value,
            email: email.value,
            password: password.value,
            confirm: confirm.value,
        },
        url: `/api/auth/register`,
    })
        .then((res) => {
            router.push("/login");
        })
        .catch((err) => {
            error.value.first_name = err.response.data.first_name;
            error.value.last_name = err.response.data.last_name;
            error.value.email = err.response.data.email;
            error.value.password = err.response.data.password;
            error.value.confirm = err.response.data.confirm;
            console.log(err);
        });
};
</script>

<style scoped>
.gradient-custom-3 {
    /* fallback for old browsers */
    background: #84fab0;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(
        to right,
        rgba(132, 250, 176, 0.5),
        rgba(143, 211, 244, 0.5)
    );

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(
        to right,
        rgba(132, 250, 176, 0.5),
        rgba(143, 211, 244, 0.5)
    );
}

.space-intro {
    margin-top: 55px;
}
</style>
