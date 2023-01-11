export const useSession = () => {

    const saveSession = (token: string) => {
        localStorage.setItem('session', token);
        return true;
    }

    const loadSession = () => {
        return localStorage.getItem("session");
    }

    return {
        saveSession,
        loadSession
    }
}