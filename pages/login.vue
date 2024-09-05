<script setup lang="ts">
import ApiClient from "~/services/ApiClient";

definePageMeta({
    layout: 'login'
});

const fields = [{
    name       : 'email',
    type       : 'email',
    label      : 'Email',
    placeholder: 'example@example.com',
    color      : 'gray'
}, {
    name       : 'password',
    type       : 'password',
    label      : 'Password',
    placeholder: '••••••••',
    color      : 'gray'
}];

const client = new ApiClient();
const token  = useCookie<string>('token');
const toast  = useToast();

async function submit(form: any) {
    if (!form.email || !form.password)
        return;

    try {
        const response = await client.post<{ token: string }>('/login', form);
        token.value    = response.token;
        await navigateTo('/');
    } catch {
        toast.add({
            title      : 'Whoops!',
            description: 'Maybe, credentials are wrong or problems on the server...',
            color      : 'red'
        });
    }
}
</script>

<template>
    <UCard class="max-w-sm w-full">
        <Head>
            <title>Login</title>
        </Head>

        <UAuthForm
            title="Hello!"
            description="Enter your credentials to take control."
            align="bottom"
            icon="i-heroicons-bolt"
            :ui="{base: 'text-center', footer: 'text-center', default: {submitButton: {label: 'Sign in'}}}"
            :fields="fields"
            :loading="false"
            @submit="submit"
        />
    </UCard>
</template>

<style scoped>

</style>