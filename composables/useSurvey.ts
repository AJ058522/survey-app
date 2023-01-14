export const useSurvey = () => {

    const runtimeConfig = useRuntimeConfig()
    const BASE_URL = runtimeConfig.public.apiBase;
    const { loadSession } = useSession();

    const getSurveys = async (surveyId: number | null) => {
        const data = await $fetch(`${BASE_URL}surveys/${surveyId}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${loadSession().token.accessToken}`
            },
        });
        return data;
    }

    const completeSurvey = async (
        surveyData: any
    ) => {
        const data = await $fetch(`${BASE_URL}surveys/completeSurvey`, {
            method: 'POST',
            body: surveyData,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${loadSession().token.accessToken}`
            },
        });
        return data;
    }

    const getSurveyResponses = async (surveyId: number | null) => {
        const data = await $fetch(`${BASE_URL}surveys/getSurveyResponses/${surveyId}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${loadSession().token.accessToken}`
            },
        });
        return data;
    }

    const getMissingResponses = async (surveyId: number | null) => {
        const data = await $fetch(`${BASE_URL}surveys/getMissingResponses/${surveyId}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${loadSession().token.accessToken}`
            },
        });
        return data;
    }

    return {
        getSurveys,
        completeSurvey,
        getSurveyResponses,
        getMissingResponses
    }
}
