<template>
    <div>
        <nav
            class="navbar navbar-expand-sm navbar-dark bg-primary bg-gradient fixed-top"
        >
            <div class="container-lg container-fluid">
                <router-link to="/"
                    ><a class="navbar-brand" href="#!">Jcafe</a></router-link
                >
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-lg-0">
                        <li class="nav-item">
                            <router-link to="/games" class="nav-link">
                                Games
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/reserve/rules" class="nav-link">
                                Rules
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="currentUser.user">
                            <router-link to="/store" class="nav-link">
                                Store
                            </router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav mt-lg-0">
                        <template v-if="tokenExist">
                            <li class="nav-item">
                                <router-link
                                    to="/cart"
                                    class="nav-link position-relative"
                                >
                                    <i
                                        class="fa fa-shopping-cart fa-lg me-1"
                                    ></i>
                                    <span
                                        class="badge bg-info"
                                        id="cart_count"
                                        >{{ cartCount }}</span
                                    >
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/membership"
                                    v-if="!currentUser.subscription"
                                    class="nav-link position-relative"
                                >
                                    <i class="fa fa-diamond"></i>
                                </router-link>
                                <router-link
                                    to="/membership/status"
                                    v-else
                                    class="nav-link position-relative"
                                >
                                    <i class="fa fa-diamond"></i>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <div class="dropdown">
                                    <a
                                        class="dropdown-toggle nav-link"
                                        data-bs-toggle="dropdown"
                                        role="button"
                                    >
                                        <i class="fa fa-cog fa-lg"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <router-link
                                                to="/account/update"
                                                class="dropdown-item"
                                                href="#"
                                                >Update Account</router-link
                                            >
                                        </li>
                                        <li>
                                            <router-link
                                                to="/setting"
                                                class="dropdown-item"
                                                href="#"
                                                >Setting</router-link
                                            >
                                        </li>
                                        <li>
                                            <router-link
                                                to="/save"
                                                class="dropdown-item"
                                                href="#"
                                                >My Saves</router-link
                                            >
                                        </li>
                                        <!-- <li>
                                            <router-link
                                                to="/order"
                                                class="dropdown-item"
                                                href="#"
                                                >My Order</router-link
                                            >
                                        </li> -->
                                        <li><hr class="dropdown-divider" /></li>
                                        <li>
                                            <a
                                                class="dropdown-item"
                                                href="#"
                                                @click.prevent="logout"
                                                >Logout</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </template>

                        <template v-else>
                            <li class="nav-item">
                                <router-link to="/login" class="nav-link"
                                    >Login</router-link
                                >
                            </li>
                            <li class="nav-it">
                                <router-link to="/register" class="nav-link"
                                    >Register</router-link
                                >
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<script setup>
import { computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../stores/userStore";

const router = useRouter();

const tokenExist = computed(() => {
    return userStore().access_token ? true : false;
});

const currentUser = computed(() => {
    return userStore();
});

const cartCount = computed(() => {
    return userStore().cart_count;
});

const logout = () => {
    const AuthStr = "Bearer ".concat(userStore().authUser.access_token);
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            router.push("/login");
            userStore().$reset();
        })
        .catch((err) => {
            console.log(err.response);
        });
};

onUpdated(() => {
    if (currentUser.user) {
        const AuthStr = "Bearer ".concat(userStore().access_token);
        axios({
            method: "get",
            url: `/api/cart`,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {
                userStore().$patch((state) => {
                    state.cart_count = res.data.cart_count;
                });
            })
            .catch((err) => {});
    }
});
</script>

<style scoped>
.nav-link {
    color: #ffffff;
}
</style>
