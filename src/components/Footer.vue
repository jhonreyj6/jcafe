<template>
    <footer>
        <div
            class="bg-primary bg-gradient text-white"
            :class="
                $route.name == 'ResetPasswordRequest' ||
                $route.name == 'Game' ||
                $route.name == 'Login' ||
                $route.name == 'UpdateAccount' ||
                $route.name == 'Rules' ||
                $route.name == 'Save'
                    ? 'fixed-bottom'
                    : null
            "
        >
            <div class="container">
                <div class="d-flex flex-column flex-md-row">
                    <div class="p-4 flex-fill">
                        <h5>Location</h5>
                        <div>
                            <a href="#!" class="text-white"
                                >Lapu-lapu, San Pedro</a
                            >
                        </div>
                        <div>
                            <a href="#!" class="text-white"
                                >Bangus, San Pedro</a
                            >
                        </div>
                        <div>
                            <a href="#!" class="text-white"
                                >Bagdhad, San Vicente</a
                            >
                        </div>
                    </div>
                    <div class="p-4 flex-fill">
                        <h5>Frequest Asked Question</h5>
                        <div>
                            <a href="#!" class="text-white">Price</a>
                        </div>
                        <div>
                            <a href="#!" class="text-white">Opening Time</a>
                        </div>
                        <div>
                            <a href="#!" class="text-white"
                                >Reservation Rules</a
                            >
                        </div>
                    </div>
                    <div class="p-4 flex-fill">
                        <h5>Subscribe</h5>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Email"
                            />
                            <button
                                class="btn btn-info text-white"
                                type="button"
                            >
                                <i class="fa fa-send"></i> Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
</script>

<style scoped>
</style>
