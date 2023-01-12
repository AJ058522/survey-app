<script lang="ts" setup>

import { onMounted } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { getSurveyResponses } = useSurvey();

const data = reactive({
    error: '',
    loading: false,
    surveyTitle: 'Default Title',
    bar: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
    },
    options: {
        responsive: true
    },
    showBar: false

});

onMounted(() => {
    getResponses();
});

async function getResponses() {
    data.loading = true;
    try {
        data.error = ''
        const response: any = await getSurveyResponses(1);
        data.surveyTitle = response[0].name;
        setChartData(response);
        data.showBar = true;
    }
    catch (error: any) {
        data.error = "There's no completed surveys.";
    }
    finally {
        data.loading = false
    }
}

function setChartData(responses: any): void {
    const chartLabels: string[] = [];
    const chartData: number[] = [];

    responses.forEach((element: any) => {
        chartLabels.push(element.question);
        chartData.push(element.totalVotes);
    });

    data.bar.labels = chartLabels;
    data.bar.datasets = [{ data: chartData }];
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

    <div v-if="!data.loading" class="mt-4">
        <h4>{{ data.surveyTitle }}</h4>
        <Bar :data="data.bar" :options="data.options" v-if="data.showBar" />
    </div>

</template>