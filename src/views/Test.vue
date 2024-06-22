<template>
    <div v-if="editor" class="space-intro">
        <editor-content :editor="editor" class="ms-5" />
    </div>
</template>
  
  <script>
import Document from "@tiptap/extension-document";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/vue-3";

import suggestion from "../helpers/tiptap/suggestion";

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
        };
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                Document,
                Paragraph,
                Text,
                Mention.configure({
                    HTMLAttributes: {
                        class: "mention",
                    },
                    suggestion,
                }),
            ],
            content: "",
        });
    },

    beforeUnmount() {
        this.editor.destroy();
    },
};
</script>
  
<style scoped>
/* Basic editor styles */
.tiptap :first-child {
    margin-top: 0;
}
.tiptap .mention {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    box-decoration-break: clone;
    color: var(--purple);
    padding: 0.1rem 0.3rem;
}
</style>