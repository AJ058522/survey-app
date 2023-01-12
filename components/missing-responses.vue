<script lang="ts" setup>

import { onMounted } from 'vue';

const { getMissingResponses } = useSurvey();

const data = reactive({
    error: '',
    loading: false,
    data: []
});

onMounted(() => {
    getUsers();
});

async function getUsers() {
    data.loading = true;
    try {
        data.error = ''
        const response: any = await getMissingResponses(1);
        data.data = response;
    }
    catch (error: any) {
        data.error = "All users have voted!.";
    }
    finally {
        data.loading = false
    }
}

</script>

<template>

    <div v-if="data.loading" class="mt-4">
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div class="alert alert-success" role="alert" v-if="!data.data.length && !data.loading">
        You have completed the survey.
    </div>

    <div v-if="!data.loading" class="mt-4">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in data.data" :key="user['id']">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user['name'] }}</td>
                    <td>{{ user['email'] }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>