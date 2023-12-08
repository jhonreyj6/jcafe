<template>
    <div>
        <div class="space-intro">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="mb-4">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <i class="fa fa-upload"></i> Upload Save
                            </button>
                        </div>

                        <!-- <div class="d-flex mb-4" v-if="isUploading">
                            <div class="progress flex-fill mt-2 me-4">
                                <div
                                    class="progress-bar progress-bar-striped progress-bar-animated"
                                    style="width: 0%"
                                >
                                    0%
                                </div>
                            </div>
                            <div>
                                <button
                                    class="btn btn-sm btn-primary bg-gradient"
                                    @click="UploadFile"
                                >
                                    Upload
                                </button>
                                <button
                                    class="btn btn-danger bg-gradient btn-sm"
                                    @click="cancelUpload"
                                >
                                    <i class="fa fa-close"></i> Cancel
                                </button>
                            </div>
                        </div> -->

                        <SaveListing :saves="saves" />
                    </div>

                    <div class="col-md-4">s</div>
                </div>
            </div>
        </div>

        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Upload File / Save
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div
                            class="d-flex justify-content-center mb-3"
                            id="myId"
                        >
                            <label
                                for="input_upload"
                                class="pointer border border-info"
                                ref="dropbox"
                                @dragover="dragOver"
                                @dragleave="dragLeave"
                            >
                                <div class="card border-0">
                                    <div
                                        class="m-auto bg-muted text-center"
                                        style="
                                            height: 200px;
                                            padding: 50px;
                                            width: 450px;
                                        "
                                        @drop="dropped"
                                    >
                                        <input
                                            type="file"
                                            class="d-none"
                                            @change="inputFile($event)"
                                            id="input_upload"
                                            accept=".zip,.rar,.7zip"
                                        />
                                        <i
                                            class="fa fa-upload fa-5x text-primary"
                                        ></i>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div class="progress flex-fill mt-2 mx-2" v-if="isUploading">
                                <div
                                    class="progress-bar progress-bar-striped progress-bar-animated"
                                    style="width: 100%"
                                >
                                    100%
                                </div>
                            </div>

                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            @click="cancelUpload"
                        >
                            Cancel
                        </button>
                        <button type="button" class="btn btn-primary" @click="UploadFile" data-bs-dismiss="modal">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SaveListing from "../components/SaveListing.vue";
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            input_file: "",
            isUploading: false,
            saves: "",
        };
    },
    components: {
        SaveListing,
    },

    props: [],

    computed: {},

    methods: {
        dragOver(e) {
            e.preventDefault();
            this.$refs.dropbox.classList.add("shadow", "border-5");
        },

        dragLeave() {
            this.$refs.dropbox.classList.remove("shadow", "border-5");
        },

        dropped(e) {
            e.preventDefault();
            if (e.dataTransfer.files[0].size > 20480000) {
                this.$parent.notification.message.push(
                    "File is too large. Only 20MB allowed!"
                );
                return;
            }

            this.input_file = e.dataTransfer.files[0];
            this.isUploading = true;
        },

        inputFile(e) {
            if (e.target.files[0].size > 20480000) {
                this.$parent.notification.message.push(
                    "File is too large. Only 20MB allowed!"
                );
                return;
            }
            this.input_file = e.target.files[0] || e.dataTransfer.files[0];
            this.isUploading = true;
        },

        UploadFile() {
            const formData = new FormData();
            formData.append("file", this.input_file);

            const AuthStr = "Bearer ".concat(
                userStore().access_token
            );
            axios
                .post(`/api/save`, formData, {
                    headers: {
                        Authorization: AuthStr,
                    },
                })
                .then((res) => {
                    this.isUploading = false;
                    this.input_file = "";
                    this.saves.unshift(res.data);
                })
                .catch((err) => {});
        },

        cancelUpload() {
            this.isUploading = false;
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
    //     some_prop: function () {
    //         //do something if some_prop updated
    //     },
    // },

    updated() {},

    mounted() {
        const AuthStr = "Bearer ".concat(userStore().access_token);
        axios({
            method: "get",
            url: `/api/save`,
            headers: { Authorization: AuthStr },
        })
            .then((res) => {
                this.saves = res.data;
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    },
};
</script>
