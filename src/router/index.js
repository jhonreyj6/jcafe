import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "../stores/userStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Intro",
            component: () =>
                import(/* webpackChunkName: "Intro" */ "../views/Intro.vue"),
            meta: {
                disableIfLoggedIn: true,
                title: "J6 Cafe",
            },
        },

        {
            path: "/dashboard",
            name: "Dashboard",
            component: () =>
                import(
                    /* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"
                ),
            meta: { requiresAuth: true, title: "J6 Dashboard" },
        },

        {
            path: "/login",
            name: "Login",
            component: () =>
                import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
            meta: {
                disableIfLoggedIn: true,
                title: "J6 Login",
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
                title: "Reset Password",
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
                title: "Reset password request",
            },
        },

        {
            path: "/payment/stripe/success",
            name: "StripeSuccess",
            component: () =>
                import(
                    /* webpackChunkName: "StripeSuccess" */ "../components/stripe/StripeSuccess.vue"
                ),
            meta: {
                title: "Successful Payment",
            },
        },

        {
            path: "/payment/stripe/cancel",
            name: "StripeCancel",
            component: () =>
                import(
                    /* webpackChunkName: "StripeCancel" */ "../components/stripe/StripeCancel.vue"
                ),
            meta: {
                title: "Payment cancel",
            },
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
                title: "Register",
            },
        },

        {
            path: "/membership",
            name: "Membership",
            component: () =>
                import(
                    /* webpackChunkName: "Membership" */ "../views/membership/Membership.vue"
                ),
            meta: {
                title: "J6 Membership",
                requiresAuth: true,
                disableIfSubscribed: true,
            },
        },

        {
            name: "MembershipStatus",
            path: "/membership/status",
            component: () =>
                import(
                    /* webpackChunkName: "MembershipStatus" */ "../views/membership/MembershipStatus.vue"
                ),
            meta: {
                title: "Membership Status",
                requiresAuth: true,
                requiresSubscribe: true,
            },
        },

        {
            path: "/games",
            name: "Game",
            component: () =>
                import(/* webpackChunkName: "Game" */ "../views/Game.vue"),
            meta: {
                title: "J6 Available Games",
            },
        },

        {
            path: "/store",
            name: "Store",
            component: () =>
                import(/* webpackChunkName: "Store" */ "../views/Store.vue"),
            meta: {
                title: "J6 Store",
                requiresAuth: true,
            },
        },

        {
            path: "/reserve/rules",
            name: "Rules",
            component: () =>
                import(/* webpackChunkName: "Rules" */ "../views/Rules.vue"),
            meta: {},
        },

        // {
        //     path: "/timeline",
        //     name: "Timeline",
        //     meta: { requiresAuth: true },
        //     component: () =>
        //         import(
        //             /* webpackChunkName: "Timeline" */ "../views/Timeline.vue"
        //         ),
        // },

        {
            path: "/cart",
            name: "Cart",
            meta: { requiresAuth: true },
            component: () =>
                import(/* webpackChunkName: "Cart" */ "../views/Cart.vue"),
            // components: () => defineAsyncComponent(() => import('../views/Cart.vue')),
        },

        {
            path: "/order",
            name: "Order",
            meta: { requiresAuth: true },
            component: () =>
                import(/* webpackChunkName: "Order" */ "../views/Order.vue"),
            // components: () => defineAsyncComponent(() => import('../views/Cart.vue')),
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
            path: "/test",
            name: "Test",
            component: () =>
                import(/* webpackChunkName: "PostPage" */ "../views/Test.vue"),
        },

        {
            path: "/work",
            name: "Work",
            component: () =>
                import(/* webpackChunkName: "PostPage" */ "../views/Work.vue"),
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
    document.title = to.meta.title ?? "Welcome to J6 Cafe";

    if (to.matched.some((record) => record.meta.disableIfSubscribed)) {
        if (userStore().subscription) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

    if (to.matched.some((record) => record.meta.requiresSubscribe)) {
        if (!userStore().subscription) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

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
