<script setup lang="ts">

</script>

<template>
    <div>
        <UNotifications/>

        <UContainer class="h-dvh py-5 sm:py-0 overflow-auto">
            <div class="flex sm:items-center justify-center sm:h-full">
                <slot/>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>