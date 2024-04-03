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

                <div ref="chat_body" class="d-none">
                    <div
                        class="card-body relative h-chat overflow-auto"
                        ref="chat_div"
                        v-if="drag.state == false"
                        @scroll="paginateMessage"
                        @dragenter="drag.state = true"
                    >
                        <div v-for="chat in chats.data" :key="chat.id">
                            <div
                                class="d-flex flex-row align-items-center gap-3 mb-2"
                                v-if="chat.user_id == currentUser.id"
                            >
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    width="40"
                                    height="40"
                                    class="rounded-circle"
                                    alt=""
                                />
                                <div class="border p-2 rounded">
                                    {{ chat.message }}
                                </div>
                                <div
                                    class="ms-auto text-sm text-secondary opacity-75"
                                    v-if="chat.sending"
                                >
                                    <i class="fa fa-circle-o-notch fa-spin"></i>
                                </div>
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

                    <div
                        v-else
                        class="bg-gray h-chat w-100 d-flex"
                        @dragleave="drag.state = false"
                        @drop="dropInit"
                    >
                        <div class="m-auto">Drop your files</div>
                    </div>

                    <div class="card-footer px-2 bg-white">
                        <div class="mb-2 d-flex gap-2" v-if="addAttach">
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                            >
                                <i class="fa fa-smile-o fa-lg"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                            >
                                <i class="fa fa-image fa-lg"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                            >
                                <i class="fa fa-phone fa-lg"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                            >
                                <i class="fa fa-video-camera fa-lg"></i>
                            </button>
                        </div>

                        <div class="d-flex gap-1">
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                                @click="addAttach = !addAttach"
                            >
                                <i class="fa fa-plus"></i>
                            </button>
                            <input
                                type="text"
                                id="content-span"
                                class="border rounded py-1 px-2 w-100 d-inline-block"
                                contentEditable="true"
                                @keyup="updateFormMessage"
                                ref="chatbox"
                            />
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
                drop_file: "",
            },
            addAttach: false,
            chats: "",
            currentRoom: "",
            chatbox_toggle: false,
            pagination: {
                state: false,
                chat_collection: [],
            },
            chatbox_state: false,
            sms_counter: -1,
            sms_state: "",
            drag: {
                state: false,
            },
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
        dropInit(e) {
            this.form.drop_file = e.dataTransfer.files;
            this.drag.state = false;
        },

        paginateMessage(e) {
            if (
                e.target.scrollTop < 100 &&
                this.pagination.state == false &&
                this.chats.next_page_url
            ) {
                this.pagination.state = true;
                let last_scrollT = this.$refs.chat_div.scrollTop;

                const AuthStr = "Bearer ".concat(userStore().access_token);
                axios({
                    method: "get",
                    url: this.chats.next_page_url,
                    headers: { Authorization: AuthStr },
                })
                    .then((res) => {
                        res.data.data.forEach((data, index) => {
                            if (
                                !this.pagination.chat_collection.includes(
                                    data.id
                                )
                            ) {
                                this.chats.data.unshift(data);
                                this.pagination.chat_collection.push(data.id);
                            }
                        });
                        this.chats.next_page_url = res.data.next_page_url;
                        this.pagination.state = false;
                        this.$refs.chat_div.scrollTop = last_scrollT;
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            }
        },

        toggleChatBox() {
            if (this.chatbox_state) {
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
                    let chatbox = this.$refs.chat_div;
                    chatbox.scrollTop = chatbox.scrollHeight;
                }
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
                    this.chats.data.reverse();
                    this.chats.data.forEach((chat) => {
                        this.pagination.chat_collection.push(chat.id);
                    });
                    this.chatbox_state = true;
                })
                .catch((err) => {
                    console.log(err.response);
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
                    console.log(err.response);
                });
        },

        updateFormMessage(e) {
            if (e.keyCode == 13) {
                this.sendMessage();
            } else {
                this.form.message = e.target.value.trim();
            }
        },

        loadNewMessages() {
            this.getChatMessages();
            let vm = this;
            window.Echo.private("chat." + this.currentRoom).listen(
                ".message.new",
                (e) => {
                    vm.chats.data.push(e.chat);
                }
            );
        },

        disconnectChat() {
            window.Echo.leave("chat." + this.currentRoom);
        },

        sendMessage() {
            this.sms_state = true;

            this.chats.data.push({
                id: this.sms_counter,
                message: this.form.message.trim(),
                room_id: this.currentRoom,
                user_id: this.currentUser.id,
                created_at: null,
                updated_at: null,
                sending: true,
            });

            this.$refs.chatbox.value = "";
            let temp_counter = this.sms_counter;
            let temp_msg = this.form.message;
            this.form.message = "";
            this.sms_counter = this.sms_counter - 1;

            const formData = new FormData();
            formData.append("message", temp_msg);
            // formData.append("file", this.form.drop_file);

            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "post",
                data: formData,
                url: `/api/chat`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.chats.data.forEach((data, index) => {
                        if (data.id == temp_counter) {
                            data.id = res.data.id;
                            data.created_at = res.data.created_at;
                            data.updated_at = res.data.updated_at;
                            data.sending = false;
                        }
                    });

                    this.sms_state = false;
                })
                .catch((err) => {
                    console.log(err.response);
                });
        },
    },

    watch: {
        // $data: {
        //     handler: function (val, oldVal) {
        //         console.log("watcher: ", val);
        //     },
        //     deep: true,
        // },

        currentRoom: function (val, oldVal) {
            window.Echo.connector.options.auth.headers.Authorization =
                "Bearer " + userStore().access_token;
            this.loadNewMessages();
        },
    },

    updated() {
        if (this.sms_state) {
            this.$refs.chat_div.scrollTop = this.$refs.chat_div.scrollHeight;
        }
    },

    created() {},

    mounted() {
        this.getChatRoom();

        window.addEventListener(
            "dragover",
            function (e) {
                e = e || event;
                e.preventDefault();
            },
            false
        );
        window.addEventListener(
            "drop",
            function (e) {
                e = e || event;
                e.preventDefault();
            },
            false
        );
    },

    beforeUnmount() {
        this.disconnectChat();
    },
};
</script>

<style scoped>
.pointer {
    cursor: pointer;
}

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
    width: 400px;
    z-index: 999;
}

@media (max-width: 576px) {
    .w-chat {
        width: 100% !important;
    }
}

.h-chat {
    height: 360px;
}

#content-span:focus {
    outline: none;
}

.bg-gray {
    background: #f5f5f5;
}
</style>
