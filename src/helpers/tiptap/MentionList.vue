<template>
    <div class="dropdown-menu">
        <template v-if="items.length">
            <button
                :class="{ 'is-selected': index === selectedIndex }"
                v-for="(item, index) in items"
                :key="index"
                @click="selectItem(index)"
            >
                {{ item }}
            </button>
        </template>
        <div class="item" v-else>No result</div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            selectedIndex: 0,
        };
    },

    watch: {
        items() {
            this.selectedIndex = 0;
        },
    },

    methods: {
        onKeyDown({ event }) {
            if (event.key === "ArrowUp") {
                this.upHandler();
                return true;
            }

            if (event.key === "ArrowDown") {
                this.downHandler();
                return true;
            }

            if (event.key === "Enter") {
                this.enterHandler();
                return true;
            }

            return false;
        },

        upHandler() {
            this.selectedIndex =
                (this.selectedIndex + this.items.length - 1) %
                this.items.length;
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
        },

        enterHandler() {
            this.selectItem(this.selectedIndex);
        },

        selectItem(index) {
            const item = this.items[index];

            if (item) {
                this.command({ id: item });
            }
        },
    },
};
</script>

<style scoped>
.dropdown-menu {
    background: #ffffff;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    padding: 0.4rem;
    position: relative;
}
.dropdown-menu button {
    align-items: center;
    background-color: transparent;
    display: flex;
    border: none;
    color: rgb(65, 65, 226);
    gap: 0.25rem;
    text-align: left;
    width: 100%;
}
.dropdown-menu button:hover,
.dropdown-menu button:hover.is-selected {
    background-color: #e1e1e1;
}
.dropdown-menu button.is-selected {
    background-color: #e1e1e1;
}
</style>
