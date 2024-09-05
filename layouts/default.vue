<script setup lang="ts">
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
}]);
</script>

<template>
    <UDashboardLayout>
        <UNotifications/>

        <UDashboardPanel :width="250"
                         :resizable="{min: 200, max: 300}"
                         collapsible>
            <UDashboardNavbar title="Adult Berry"/>

            <UDashboardSidebar>
                <UDashboardSidebarLinks :links="links"/>
            </UDashboardSidebar>
        </UDashboardPanel>

        <slot/>
    </UDashboardLayout>
</template>

<style scoped>

</style>