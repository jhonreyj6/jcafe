import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "../stores/userStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Intro",
            component: () =>
                import(
                    /* webpackChunkName: "Intro" */ "../views/Intro.vue"
                ),
                meta: {
                    disableIfLoggedIn: true,
                },
        },
        
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () =>
                import(
                    /* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"
                ),
                meta: { requiresAuth: true },
        },

        {
            path: "/login",
            name: "Login",
            component: () =>
                import(
                    /* webpackChunkName: "Login" */ "../views/Login.vue"
                ),
            meta: {
                disableIfLoggedIn: true,
            },
        },

        {
            path: "/reset/password/",
            name: "ResetPassword",
            component: () =>
                import(
                    /* webpackChunkName: "ResetPassword" */ "../components/auth/ResetPassword.vue"
                ),
            meta: {
                disableIfLoggedIn: true,
            },
        },

        {
            path: "/reset/password/request",
            name: "ResetPasswordRequest",
            component: () =>
                import(
                    /* webpackChunkName: "ResetPasswordRequest" */ "../components/auth/ResetPasswordRequest.vue"
                ),
            meta: {
                disableIfLoggedIn: true,
            },
        },

        {
            path: "/payment/stripe/success",
            name: "StripeSuccess",
            component: () =>
                import(
                    /* webpackChunkName: "StripeSuccess" */ "../components/stripe/StripeSuccess.vue"
                ),
        },

        {
            path: "/payment/stripe/cancel",
            name: "StripeCancel",
            component: () =>
                import(
                    /* webpackChunkName: "StripeCancel" */ "../components/stripe/StripeCancel.vue"
                ),
        },

        {
            path: "/api/oauth/login/callback/:provider",
            name: "Callback_provider",
            component: () =>
                import(
                    /* webpackChunkName: "Oauth" */ "../components/auth/Oauth.vue"
                ),
            meta: {
                disableIfLoggedIn: true,
            },
        },

        {
            path: "/register",
            name: "Register",
            component: () =>
                import(
                    /* webpackChunkName: "Register" */ "../components/auth/Register.vue"
                ),
            meta: {
                disableIfLoggedIn: true,
            },
        },

        {
            path: "/games",
            name: "Game",
            component: () =>
                import(/* webpackChunkName: "Game" */ "../views/Game.vue"),
        },

        {
            path: "/store",
            name: "Store",
            component: () =>
                import(
                    /* webpackChunkName: "Store" */ "../views/Store.vue"
                ),
        },

        {
            path: "/reserve/rules",
            name: "Rules",
            component: () =>
                import(
                    /* webpackChunkName: "Rules" */ "../views/Rules.vue"
                ),
        },

        {
            path: "/timeline",
            name: "Timeline",
            meta: { requiresAuth: true },
            component: () =>
                import(
                    /* webpackChunkName: "Timeline" */ "../views/Timeline.vue"
                ),
        },

        {
            path: "/cart",
            name: "Cart",
            meta: { requiresAuth: true },
            component: () =>
                import(/* webpackChunkName: "Cart" */ "../views/Cart.vue"),
        },

        {
            path: "/account/update",
            name: "UpdateAccount",
            meta: { requiresAuth: true },
            component: () =>
                import(
                    /* webpackChunkName: "UpdateAccount" */ "../views/UpdateAccount.vue"
                ),
        },

        {
            path: "/save",
            name: "Save",
            component: () =>
                import(/* webpackChunkName: "Save" */ "../views/Save.vue"),
            meta: { requiresAuth: true },
        },

        {
            path: "/post/:id",
            name: "PostPage",
            component: () =>
                import(
                    /* webpackChunkName: "PostPage" */ "../views/PostPage.vue"
                ),
            meta: { requiresAuth: true },
            props: true,
        },

        {
            path: "/:catchAll(.*)",
            name: "PageNotFound",
            component: () =>
                import(
                    /* webpackChunkName: "NotFound" */ "../views/PageNotFound.vue"
                ),
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!userStore().access_token) {
            userStore().$reset();
            next({ path: "/login", query: { redirect: to.fullPath } });
            return false;
        }
    }

    if (to.matched.some((record) => record.meta.disableIfLoggedIn)) {
        if (userStore().access_token) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

    next();
});


export default router;
