<script setup lang="ts">
import FilesystemRepository from "~/repos/FilesystemRepository";

const links = computed(() => [{
    label: 'Home',
    to   : '/',
    icon : 'i-heroicons-home'
}, {
    label: 'Titles',
    to   : '/titles',
    icon : 'i-heroicons-star'
}, {
    label: 'Characters',
    to   : '/characters',
    icon : 'i-tabler-crown'
}, {
    label: 'Parser',
    icon : 'i-heroicons-cpu-chip',
    to   : '/parser'
}]);

const filesystemRepo = new FilesystemRepository();

const {data: filesystem, refresh, status} = await filesystemRepo.index();

useIntervalFn(() => refresh(), 10 * 1000);
</script>

<template>
    <UDashboardLayout>
        <UNotifications/>

        <UDashboardPanel :width="250"
                         :resizable="{min: 200, max: 300}"
                         collapsible>
            <UDashboardNavbar title="Adult Berry"/>

            <UDashboardSidebar :ui="{footer: {padding: ''}}">
                <UDashboardSidebarLinks :links="links"/>

                <template #footer>
                    <div class="flex flex-col gap-2.5 w-full">
                        <div v-for="item in filesystem?.data.filter(_item => _item.filesystem !== 'tmpfs')">
                            <UDivider class=""/>

                            <div class="px-2.5 py-1.5 text-sm">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">{{ item.source }}</span>

                                    <div class="flex items-center gap-1.5">
                                        <span>
                                            {{ Math.round(item.used / 1024 / 1024) }} GB
                                            /
                                            {{ Math.round(item.size / 1024 / 1024) }} GB
                                        </span>

                                        <UIcon v-show="status === 'pending'"
                                               name="i-heroicons-arrow-path"
                                               class="animate-spin"/>
                                    </div>
                                </div>

                                <UProgress :value="item.used"
                                           :max="item.size"
                                           animation="swing"/>
                            </div>
                        </div>
                    </div>
                </template>
            </UDashboardSidebar>
        </UDashboardPanel>

        <slot/>
    </UDashboardLayout>
</template>

<style scoped>

</style>