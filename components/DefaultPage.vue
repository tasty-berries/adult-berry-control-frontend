<script setup lang="ts">
defineProps<{
    title: string
}>();
</script>

<template>
    <UDashboardPage>
        <UDashboardPanel grow>
            <UDashboardNavbar :title="title">
                <template #right>
                    <UColorModeButton/>
                </template>
            </UDashboardNavbar>

            <slot/>
        </UDashboardPanel>
    </UDashboardPage>
</template>

<style scoped>

</style>