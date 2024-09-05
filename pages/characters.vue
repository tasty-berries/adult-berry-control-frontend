<script setup lang="ts">
import CharacterRepository from "~/repos/CharacterRepository";

const repo  = new CharacterRepository();
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
    key  : 'description',
    label: 'Description'
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
        } else {
            console.log(err);
        }
    } finally {
        updating.value = false;
    }
}

const searchInput = ref();

defineShortcuts({
    '/': () => searchInput.value.$el.querySelector('input').focus()
});
</script>

<template>
    <DefaultPage title="Characters">
        <Head>
            <title>Characters</title>
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
                <div class="flex items-center gap-2.5">
                    <UAvatar :src="row.preview ? fileUrl(row.preview) : undefined"
                             :alt="row.name"
                             img-class="object-cover"/>
                    <p class="font-semibold">{{ row.name }}</p>
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
                            <h3 class="font-semibold text-xl">Edit character</h3>

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

                        <UFormGroup label="Aliases">
                            <CharacterAliases :id="editRowId"/>
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