<script setup>
import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import { userStore } from "../stores/userStore";

const addAttach = ref(false);
const chats = ref();
const currentRoom = ref("");
const chatbox_toggle = ref(false);
const chatbox_state = ref(false);
const sms_counter = ref(-1);
const sms_state = ref("");
const chat_body = ref();
const chat_angle = ref();
const chat_div = ref();
const editable_div = ref();

const form = ref({
    message: "",
    drop_file: "",
});
const pagination = ref({
    state: false,
    chat_collection: [],
});
const drag = ref({
    state: false,
});

const currentUser = computed(() => {
    return userStore().user;
});

const dropInit = async (e) => {
    form.value.drop_file = e.dataTransfer.files;
    drag.value.state = false;
};

const paginateMessage = async (e) => {
    if (
        e.target.scrollTop < 100 &&
        pagination.value.state == false &&
        chats.next_page_url
    ) {
        pagination.value.state = true;
        let last_scrollT = chat_div.scrollTop;

        const AuthStr = "Bearer ".concat(userStore().access_token);
        axios({
            method: "get",
            url: chats.value.next_page_url,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {
                res.data.data.forEach((data, index) => {
                    if (!pagination.value.chat_collection.includes(data.id)) {
                        chats.value.data.unshift(data);
                        pagination.value.chat_collection.push(data.id);
                    }
                });
                chats.value.next_page_url = res.data.next_page_url;
                pagination.value.state = false;
                chat_div.value.scrollTop = last_scrollT;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const toggleChatBox = async () => {
    if (chatbox_state.value) {
        if (chatbox_toggle.value) {
            chatbox_toggle.value = false;
            chat_body.value.classList.add("d-none");
            chat_angle.value.classList.remove("fa-angle-down");
            chat_angle.value.classList.add("fa-angle-up");
        } else {
            chat_body.value.classList.remove("d-none");
            chatbox_toggle.value = true;
            chat_angle.value.classList.remove("fa-angle-up");
            chat_angle.value.classList.add("fa-angle-down");
            let chatbox = chat_div.value;
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }
};

const getChatMessages = async () => {
    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "get",
        url: `/api/chat`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            chats.value = res.data;
            chats.value.data.reverse();
            chats.value.data.forEach((chat) => {
                pagination.value.chat_collection.push(chat.id);
            });
            chatbox_state.value = true;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getChatRoom = async () => {
    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "get",
        url: `/api/chat/room/show`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            currentRoom.value = res.data.id;
        })
        .catch((err) => {
            console.log(err.response);
        });
};

const sendMessage = () => {
    sms_state.value = true;
    chats.value.data.push({
        id: sms_counter.value,
        message: form.value.message.trim(),
        room_id: currentRoom.value,
        user_id: currentUser.value.id,
        created_at: null,
        updated_at: null,
        sending: true,
    });

    let temp_counter = sms_counter.value;
    let temp_msg = form.value.message;
    form.message = "";
    sms_counter.value = sms_counter.value - 1;

    const formData = new FormData();
    formData.append("message", temp_msg);
    // formData.append("file", this.form.drop_file);

    editable_div.value.innerHTML = "";

    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "post",
        data: formData,
        url: `/api/chat`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            chats.value.data.forEach((data, index) => {
                if (data.id == temp_counter) {
                    data.id = res.data.id;
                    data.created_at = res.data.created_at;
                    data.updated_at = res.data.updated_at;
                    data.sending = false;
                }
            });

            // reset
            form.value.message = null;

            sms_state.value = false;
        })
        .catch((err) => {
            console.log(err.response);
        });
};

const updateFormMessage = async (e) => {
    if (e.keyCode == 13) {
        console.log("enter is press");
        document.execCommand("insertHTML", false, "<br/>");
        // prevent the default behaviour of return key pressed
        return false;
        sendMessage();
    } else {
        form.value.message = e.target.innerHTML.trim();
    }
};

const loadNewMessages = async () => {
    getChatMessages();
    window.Echo.private("chat." + currentRoom.value).listen(
        ".message.new",
        (e) => {
            chats.value.data.push(e.chat);
        }
    );
};

const disconnectChat = async () => {
    window.Echo.leave("chat." + currentRoom.value);
};

watch(currentRoom, () => {
    window.Echo.connector.options.auth.headers.Authorization =
        "Bearer " + userStore().access_token;
    loadNewMessages();
});

onUpdated(() => {
    if (sms_state) {
        chat_div.scrollTop = chat_div.scrollHeight;
    }
});

onMounted(() => {
    getChatRoom();

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
});

onUnmounted(() => {
    disconnectChat();
});
</script>


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
                        <div v-for="chat in chats?.data" :key="chat.id">
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
                                v-else
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

                        <div
                            class="px-2 rounded d-flex flex-row gap-2 align-items-center"
                        >
                            <a
                                role="button"
                                class="text-primary"
                                @click="addAttach = !addAttach"
                            >
                                <i class="fa fa-plus"></i>
                            </a>
                            <div
                                class="w-100 border rounded px-2 py-1 position-relative d-flex align-bottom"
                            >
                                <div
                                    contenteditable="true"
                                    class="w-100 me-4"
                                    ref="editable_div"
                                    @keyup="updateFormMessage"
                                ></div>

                                <div class="position-absolute end-0 me-2">
                                    <a role="button" class="text-primary">
                                        <i class="fa fa-smile-o"></i>
                                    </a>
                                </div>
                            </div>
                            <a
                                role="button"
                                class="text-primary"
                                @click="sendMessage"
                            >
                                <i class="fa fa-paper-plane"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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
