<script setup lang="ts">
import TitleRepository from "~/repos/TitleRepository";
import CharacterRepository from "~/repos/CharacterRepository";

const repo  = new TitleRepository();
const toast = useToast();

const page   = ref<number>(1);
const search = ref<string>('');

const {data: rows, refresh, status} = await repo.index(() => ({
    page  : page.value,
    search: search.value
}));

const columns = [{
    key  : 'id',
    label: '#'
}, {
    key  : 'name',
    label: 'Name'
}, {
    key: 'actions'
}];

const editRowId = ref<number>();
const editRow   = ref<any>();
const editForm  = ref();
const updating  = ref<boolean>(false);

watch(editRowId, async (value?: number) => {
    if (!value)
        return;

    editRow.value = await repo.show(value);
});

async function save() {
    editForm.value.clear();
    updating.value = true;

    try {
        await repo.update(editRow.value.data);
        await refresh();
        editRowId.value = undefined;
    } catch (err: any) {
        if (err.statusCode === 422) {
            editForm.value.setErrors(Object.keys(err.data.errors).map((key: string) => ({
                message: err.data.errors[key].join('. '),
                path   : key
            })));
        }
    } finally {
        updating.value = false;
    }
}

const searchInput = ref();

defineShortcuts({
    '/': () => searchInput.value.$el.querySelector('input').focus()
});

const characterTitleRoles = [
    {id: 'primary', label: 'Primary'},
    {id: 'secondary', label: 'Secondary'}
];
</script>

<template>
    <DefaultPage title="Titles">
        <Head>
            <title>Titles</title>
        </Head>

        <UDashboardToolbar>
            <template #left>
                <UInput ref="searchInput"
                        placeholder="Search..."
                        leading-icon="i-heroicons-magnifying-glass"
                        v-model="search">
                    <template #trailing>
                        <UKbd>/</UKbd>
                    </template>
                </UInput>
            </template>

            <template #right>
                <UPagination :page-count="rows?.meta.per_page"
                             :total="rows?.meta.total ?? 0"
                             v-model="page"/>
            </template>
        </UDashboardToolbar>

        <UTable :rows="rows?.data"
                :columns="columns"
                :loading="status === 'pending'"
                sort-mode="manual"
                class="w-full"
                :ui="{
                    divide: 'divide-gray-200 dark:divide-gray-800',
                    thead: 'sticky top-0 bg-gradient-to-b from-white dark:from-gray-900 from-95% to-gray-400 dark:to-gray-700 dark:bg-gray-900 z-10'
                }">
            <template #name-data="{row}">
                <div class="flex gap-3">
                    <div class="w-24 h-32 bg-gray-400 dark:bg-slate-800 rounded-md flex items-center justify-center overflow-clip">
                        <div v-if="row.preview"
                             class="bg-center bg-no-repeat bg-cover w-24 h-32"
                             :style="`background-image: url(${fileUrl(row.preview)});`"></div>

                        <UIcon v-else
                               name="i-heroicons-photo"
                               class="text-4xl text-white dark:text-gray-400"/>
                    </div>

                    <div>
                        <h5 class="font-semibold text-lg">{{ row.name }}</h5>
                        <p class="text-wrap w-[600px]">{{ row.description }}</p>
                    </div>
                </div>
            </template>

            <template #actions-data="{row}">
                <div class="flex justify-end gap-2.5">
                    <UButton color="gray"
                             icon="i-heroicons-pencil-square"
                             @click="editRowId = row.id"/>
                </div>
            </template>
        </UTable>

        <UModal :model-value="!!editRowId" @update:model-value="editRowId = $event ?? undefined">
            <UForm ref="editForm" :state="editRow?.data ?? {}" @submit="save">
                <UCard :ui="{ring: ''}">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-xl">Edit title</h3>

                            <UButton icon="i-heroicons-x-mark"
                                     variant="link"
                                     :padded="false"
                                     size="xl"
                                     color="gray"
                                     @click="editRowId = undefined"/>
                        </div>
                    </template>

                    <div v-if="editRow" class="flex flex-col gap-5">
                        <UFormGroup label="ID">
                            <UInput :model-value="editRow.data.id" disabled/>
                        </UFormGroup>

                        <UFormGroup label="Name" name="name">
                            <UInput v-model="editRow.data.name"/>
                        </UFormGroup>

                        <UFormGroup label="Preview" name="preview">
                            <UInput type="file" @input="editRow.data.preview = $event.target.files[0]"/>
                        </UFormGroup>

                        <UFormGroup label="Description" name="description">
                            <TiptapEditor v-model="editRow.data.description"/>
                        </UFormGroup>

                        <UFormGroup label="Characters" name="characters">
                            <div class="flex flex-col gap-2.5">
                                <div v-for="(character, index) in editRow.data.characters"
                                     :key="character.id"
                                     class="flex gap-2.5">
                                    <RepoSearchSelect :repo="new CharacterRepository()"
                                                      class="grow"
                                                      placeholder="Select character"
                                                      :model-value="editRow.data.characters[index]"
                                                      @update:model-value="editRow.data.characters[index] = {...$event, role: 'primary'}"/>

                                    <USelectMenu :options="characterTitleRoles"
                                                 value-attribute="id"
                                                 v-model="character.role"
                                                 placeholder="Select role"
                                                 class="w-28"/>

                                    <UButton icon="i-heroicons-trash"
                                             color="gray"
                                             @click="editRow.data.characters = editRow.data.characters.filter((_character: any) => _character.id !== character.id)"/>
                                </div>

                                <UButton color="gray"
                                         icon="i-heroicons-plus"
                                         label="Add character"
                                         @click="editRow.data.characters.push({})"/>
                            </div>
                        </UFormGroup>
                    </div>

                    <template #footer>
                        <div class="flex justify-end items-center gap-2.5">
                            <UButton label="Save"
                                     type="submit"
                                     :loading="updating"/>

                            <UButton label="Cancel"
                                     color="gray"
                                     @click="editRowId = undefined"/>
                        </div>
                    </template>
                </UCard>
            </UForm>
        </UModal>
    </DefaultPage>
</template>

<style scoped>

</style>