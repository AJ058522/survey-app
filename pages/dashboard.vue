<script lang="ts" setup>

import { onMounted } from 'vue';

definePageMeta({
    middleware: ['authenticated'],
});
const authenticated = useState('authenticated');
const { getSurveys, completeSurvey } = useSurvey();

const data = reactive({
    error: '',
    loading: false,
    questions: [],
    pending: false
});

onMounted(() => {
    getSurvey();
});

async function getSurvey() {
    data.loading = true;
    try {
        data.error = ''
        const response: any = await getSurveys(1);
        data.questions = setFormData(response.survey_questions);
    }
    catch (error: any) {
        data.error = "There's no surveys available.";
    }
    finally {
        data.loading = false
    }
}

function setFormData(questions: any[]): any {

    const formQuestions: any = [];

    questions.forEach(element => {
        formQuestions.push({
            survey_question_id: element.id,
            question: element.question,
            vote: null
        });
    });
    return formQuestions;
}

async function onSubmit() {

    const notCompleted = data.questions.find((element: { vote: null; }) => element.vote === null);
    if (notCompleted) {
        data.error = "Please select an option for every question.";
        return;
    }

    try {
        data.error = ''
        data.pending = true
        const response = await completeSurvey({ survey_responses: data.questions });
        data.questions = [];
    }
    catch (error: any) {
        data.error = error;
    }
    finally {
        data.pending = false
    }
}

</script>

<template>
    <div class="text-center">
        <main class="form-signin w-50 m-auto my-4">
            <div>
                State: {{ authenticated }}
                <h1>Dashboard page </h1>
            </div>

            <div class="alert alert-danger" role="alert" v-if="data.error">
                {{ data.error }}
            </div>

            <div v-if="data.questions.length" class="mt-4">
                <form @submit.prevent="onSubmit">
                    <div class="mb-3 row" v-for="(question, index) in data.questions"
                        :key="question['survey_question_id']">
                        <label for="staticEmail" class="col-sm-8 col-form-label">{{ question['question'] }}</label>
                        <div class="col-sm-4">
                            <select name="select" class="form-control" required v-model="question['vote']">
                                <option value="null" selected disabled>-</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-2">
                        <button class="w-100 btn btn-lg btn-primary mt-1" type="submit" :disabled="data.pending">
                            Vote
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>