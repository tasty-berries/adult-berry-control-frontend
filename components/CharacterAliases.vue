<script setup lang="ts">
import CharacterAliasRepository from "~/repos/CharacterAliasRepository";

const props = defineProps<{
    id: number
}>();

const repo = new CharacterAliasRepository(props.id);

const {data: aliases, refresh} = await repo.index();
</script>

<template>
    <div v-if="aliases?.data" class="flex flex-col gap-2.5">
        <div v-for="(alias, index) in aliases.data ?? []"
             :key="index"
             class="flex gap-2.5">
            <RepoSearchSelect v-if="alias.id === 0"
                              :repo="repo"
                              class="grow"
                              placeholder="Select character"
                              v-model="alias.character"/>

            <UInput v-else
                    class="grow"
                    disabled
                    :model-value="alias.name"/>

            <UButton v-if="alias.id === 0"
                     icon="i-heroicons-check"
                     color="gray"
                     @click="repo.store(alias).then(() => refresh())"/>

            <UButton icon="i-heroicons-trash"
                     color="gray"
                     @click="repo.destroy(alias.id).then(() => refresh())"/>
        </div>

        <UButton color="gray"
                 icon="i-heroicons-plus"
                 label="Add alias"
                 @click="aliases.data.push({id: 0, character: null})"/>
    </div>
</template>

<style scoped>

</style>