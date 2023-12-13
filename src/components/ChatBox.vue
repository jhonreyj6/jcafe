<template>
    <div class="w-chat end-0 fixed-btm">
        <div class="card rounded-0">
            <div class="card-title mb-0">
                <div
                    class="d-flex border-bottom p-3 bg-primary text-white pointer"
                    @click="toggleChatBox"
                >
                    <div class="text">Message</div>
                    <div class="ms-auto">
                        <i class="fa fa-angle-down fa-lg" ref="chat_angle"></i>
                    </div>
                </div>

                <div ref="chat_body">
                    <div class="card-body relative h-chat overflow-auto">
                        <div v-for="chat in chats" :key="chat.id">
                            <div
                                class="d-flex gap-2 mb-2"
                                v-if="chat.user_id == currentUser.id"
                            >
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    width="40"
                                    height="40"
                                    class="rounded-circle"
                                    alt=""
                                />
                                <p class="border px-2 py-1 rounded">
                                    {{ chat.message }}
                                </p>
                            </div>
                            <div
                                class="d-flex flex-row-reverse gap-2 mb-2"
                                v-if="chat.user_id != currentUser.id"
                            >
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    width="40"
                                    height="40"
                                    class="rounded-circle"
                                    alt=""
                                />
                                <p class="border px-2 py-1 rounded">
                                    {{ chat.message }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex gap-1">
                            <span
                                class="border rounded p-2 w-100"
                                contenteditable="true"
                                @keyup="updateFormMessage"
                                ref="chatbox"
                            >
                            </span>
                            <button
                                class="btn text-primary"
                                @click="sendMessage"
                            >
                                <i class="fa fa-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            form: {
                message: "",
            },
            chats: "",
            currentRoom: "",
            chatbox_toggle: true,
        };
    },
    components: {},

    props: {},

    computed: {
        currentUser() {
            return userStore().user;
        },
    },

    methods: {
        toggleChatBox() {
            if (this.chatbox_toggle) {
                this.chatbox_toggle = false;
                this.$refs.chat_body.classList.add("d-none");
                this.$refs.chat_angle.classList.remove("fa-angle-down");
                this.$refs.chat_angle.classList.add("fa-angle-up");
            } else {
                this.$refs.chat_body.classList.remove("d-none");
                this.chatbox_toggle = true;
                this.$refs.chat_angle.classList.remove("fa-angle-up");
                this.$refs.chat_angle.classList.add("fa-angle-down");
            }
        },

        getChatMessages() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "get",
                url: `/api/chat`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.chats = res.data;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        getChatRoom() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "get",
                url: `/api/chat/room/show`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.currentRoom = res.data.id;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        updateFormMessage(e) {
            this.form.message = e.target.innerText.trim();
        },

        // loadNewMessages() {
        //   window.Echo.channel("chat").listen(".new_chat_message", (e) => {
        //     this.chats.push(e.chat);
        //     console.log(e.chat);
        //   });
        
        loadNewMessages() {
            window.Echo.private("chat." + this.currentRoom).listen(".new_chat_message", (e) => {
                this.chats.push(e.chat);
                console.log('load new message');
            });
        },

        sendMessage() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "post",
                params: { message: this.form.message },
                url: `/api/chat`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {console.log(res.data);
                    this.form.message = "";
                    this.$refs.chatbox.textContent = "";
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },
    },

    watch: {
        $data: {
            handler: function (val, oldVal) {
                console.log("watcher: ", val);
            },
            deep: true,
        },
    },

    updated() {},

    beforeMounted() {},

    mounted() {
        this.getChatMessages();
        this.getChatRoom();
        this.loadNewMessages();
    },
};
</script>

<style scoped>
.fixed-btm {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1030;
}

.accordion {
    border: 1px solid #e1e1e1;
}

.w-chat {
    width: 450px !important;
}

.h-chat {
    height: 450px;
}
</style>
