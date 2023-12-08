<template>
  <div ref="body">
    <Nav />

    <div>
      <keep-alive include="IntroComponent">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </div>
    <!-- <div v-if="$route.name != 'Dashboard' || $route.name != 'Store'">
      <Footer />
    </div> -->

    <div v-if="$route.name == 'Home' || $route.name == 'Save' ">
      <div class="toast-container"
        v-for="(message, index) in notification.message"
        :key="index"
      >
        <div
          class="position-fixed top-0 end-50 px-3"
          style="z-index: 11"
        >
          <div
            class="toast mb-2 d-block"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header bg-danger">
              <strong class="me-auto text-white">Error</strong>
              <a
                role="button"
                class="text-white"
                @click="notification.message = ''"
              >
                <i class="fa fa-close"></i>
              </a>
            </div>
            <div class="toast-body" ref="toast_message">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentUser">
      <ChatBox />
    </div>

  </div>
</template>


<script>
import Nav from "./templates/Nav.vue";
import Footer from "./Footer.vue";
// import ChatBox from '../components/ChatBox.vue'
import { userStore } from "../stores/userStore";

export default {
  data() {
    return {
      notification: {
        message: [],
        multi_data: {
          message: "",
        },
      },
    };
  },

  components: {
    Nav,
    Footer,
    // ChatBox,
  },

  methods: {

  },
  
  

  created () {

  },

  mounted() {
    alert('mihnted');
  },
};
</script>

<style scoped>
.top-0 {
  top: 2% !important;
}
</style>
