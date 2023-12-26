import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./helpers/axios";
import "./helpers/pusher";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount("#app");
