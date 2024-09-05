<script setup lang="ts">
const model = defineModel<string>({required: true});

const editor = useEditor({
    content: model.value,
    extensions: [TiptapStarterKit],
    editorProps: {
        attributes: {
            class: 'focus:outline-none'
        }
    },

    onUpdate({editor}) {
        model.value = editor.getHTML();
    }
});

watch(model, (value: string, oldValue: string) => {
    if (editor.value?.getHTML() === value)
        return;

    editor.value?.commands.setContent(value);
});

onBeforeUnmount(() => {
    unref(editor).destroy();
});
</script>

<template>
    <div class="rounded-md overflow-clip ring-1 ring-gray-300 dark:ring-gray-700 has-[:focus]:ring-2 has-[:focus]:ring-primary has-[:focus]:dark:ring-primary">
        <div v-if="editor" class="flex justify-between bg-gray-50 dark:bg-gray-800 p-1">
            <div class="flex gap-1">
                <UButton icon="i-heroicons-bold"
                         color="gray"
                         :variant="editor.isActive('bold') ? 'solid' : 'ghost'"
                         :disabled="!editor.can().chain().focus().toggleBold().run()"
                         @click="editor.chain().focus().toggleBold().run()"/>

                <UButton icon="i-heroicons-italic"
                         color="gray"
                         :variant="editor.isActive('italic') ? 'solid' : 'ghost'"
                         :disabled="!editor.can().chain().focus().toggleItalic().run()"
                         @click="editor.chain().focus().toggleItalic().run()"/>

                <UButton icon="i-heroicons-strikethrough"
                         color="gray"
                         :variant="editor.isActive('strike') ? 'solid' : 'ghost'"
                         :disabled="!editor.can().chain().focus().toggleStrike().run()"
                         @click="editor.chain().focus().toggleStrike().run()"/>
            </div>

            <div class="flex gap-1">
                <UButton icon="i-heroicons-arrow-uturn-left"
                         variant="ghost"
                         color="gray"
                         :disabled="!editor.can().chain().focus().undo().run()"
                         @click="editor.chain().focus().undo().run()"/>

                <UButton icon="i-heroicons-arrow-uturn-right"
                         variant="ghost"
                         color="gray"
                         :disabled="!editor.can().chain().focus().redo().run()"
                         @click="editor.chain().focus().redo().run()"/>
            </div>

<!--            <UButton icon="i-heroicons-code-bracket"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('code') ? 'solid' : 'ghost'"-->
<!--                     :disabled="!editor.can().chain().focus().toggleCode().run()"-->
<!--                     @click="editor.chain().focus().toggleCode().run()"/>-->

<!--            <UButton label="Clear marks"-->
<!--                     color="gray"-->
<!--                     variant="ghost"-->
<!--                     @click="editor.chain().focus().unsetAllMarks().run()"/>-->

<!--            <UButton label="Clear nodes"-->
<!--                     color="gray"-->
<!--                     variant="ghost"-->
<!--                     @click="editor.chain().focus().clearNodes().run()"/>-->

<!--            <UButton icon="i-material-symbols-format-paragraph"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('paragraph') ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().setParagraph().run()"/>-->

<!--            <UButton icon="i-tabler-h-1"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"/>-->

<!--            <UButton icon="i-tabler-h-2"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"/>-->

<!--            <UButton icon="i-tabler-h-3"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"/>-->

<!--            <UButton icon="i-heroicons-list-bullet"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('bulletList') ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleBulletList().run()"/>-->

<!--            <UButton icon="i-heroicons-numbered-list"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('orderedList') ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleOrderedList().run()"/>-->

<!--            <UButton icon="i-heroicons-code-bracket-square"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('codeBlock') ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleCodeBlock().run()"/>-->

<!--            <UButton icon="i-tabler-blockquote"-->
<!--                     color="gray"-->
<!--                     :variant="editor.isActive('blockquote') ? 'solid' : 'ghost'"-->
<!--                     @click="editor.chain().focus().toggleBlockquote().run()"/>-->

<!--            <UButton icon="i-material-symbols-horizontal-rule"-->
<!--                     color="gray"-->
<!--                     variant="ghost"-->
<!--                     @click="editor.chain().focus().setHorizontalRule().run()"/>-->

<!--            <UButton icon="i-material-symbols-insert-page-break"-->
<!--                     color="gray"-->
<!--                     variant="ghost"-->
<!--                     @click="editor.chain().focus().setHardBreak().run()"/>-->
        </div>

        <TiptapEditorContent :editor="editor"
                             class="px-2 py-1 dark:text-gray-300"/>
    </div>
</template>

<style>
.tiptap {
    h1 {
        font-size: 1.5rem;
        line-height: 2rem;
    }

    h2 {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    h3 {
        font-size: 1.125rem;
        line-height: 1.75rem;
    }

    strong {
        font-weight: 600;
    }
}
</style>