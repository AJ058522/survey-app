<script lang="ts" setup>
const { signup } = useAuth();
const router = useRouter();

const form = reactive({
    data: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    },
    error: '',
    pending: false,
    success: false
});

async function onSubmit() {
    try {
        form.error = ''
        form.pending = true
        await signup(form.data.name, form.data.email, form.data.password, form.data.password_confirmation);
        form.success = true;
    }
    catch (error: any) {
        if (error.data.message)
            form.error = error.data.message
    }
    finally {
        form.pending = false;
    }
}
</script>

<template>
    <div class="text-center">
        <main class="form-signin w-100 container-sm m-auto mt-4 mw-300">
            <p class="text-danger" v-if="form.error">
                {{ form.error }}
            </p>

            <div class="alert alert-success" role="alert" v-if="form.success">
                Register completed.
            </div>

            <form @submit.prevent="onSubmit" v-if="!form.success">
                <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

                <div class="form-floating mt-1">
                    <input type="text" class="form-control" id="name" placeholder="Your full name" required
                        v-model="form.data.name">
                    <label for="name">Full Name</label>
                </div>
                <div class="form-floating mt-1">
                    <input type="email" class="form-control" id="email" placeholder="name@example.com" required
                        v-model="form.data.email">
                    <label for="email">Email address</label>
                </div>
                <div class="form-floating mt-1">
                    <input type="password" class="form-control" id="password" placeholder="Password" required
                        v-model="form.data.password">
                    <label for="password">Password</label>
                </div>
                <div class="form-floating mt-1">
                    <input type="password" class="form-control" id="password_confirmation"
                        placeholder="Password Confirmation" required v-model="form.data.password_confirmation">
                    <label for="password_confirmation">Password Confirmation</label>
                </div>

                <div class="mt-2">
                    <button class="w-100 btn btn-lg btn-primary mt-1" type="submit" :disabled="form.pending">
                        Sign up
                    </button>
                </div>
            </form>

            <div class="mt-2">
                <NuxtLink to="/login">
                    Go to login
                </NuxtLink>
            </div>
        </main>
    </div>
</template>

<style scoped>
.mw-300 {
    max-width: 300px;
}
</style>