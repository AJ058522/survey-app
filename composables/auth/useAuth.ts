export const useAuth = () => {

  const BASE_URL = 'http://localhost/api/';
  const { loadSession } = useSession();

  const login = async (
    email: string,
    password: string
  ) => {
    const data = await $fetch(`${BASE_URL}auth/login`, {
      method: 'POST',
      body: {
        email,
        password
      },
    });
    return data;
  }

  const logout = async () => {
    const data = await $fetch(`${BASE_URL}auth/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${loadSession().token.accessToken}`
      },
    });
    return data;
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const data = await $fetch(`${BASE_URL}auth/signup`, {
      method: 'POST',
      body: {
        name,
        email,
        password,
        password_confirmation
      },
    });

    return data;
  }

  return {
    login,
    logout,
    signup
  }
}
