import { defineStore } from "pinia";

export const actionStore = defineStore("action", {
    state: () => ({
        mentionPopup: false,
    }),

    actions: {
        setMentionPopup(payload) {
            this.mentionPopup = payload;
        },
    },

    persist: true,
});
