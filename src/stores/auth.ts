import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  id: BigInteger;
  is_superuser: boolean;
  is_staff: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  email: string;
  password: string;
  idAccount: number;
  name_account: string;
  logo_account: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    // JwtService.saveToken(user.value.api_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    return ApiService.post("api/auth/login", credentials)
      .then(({ data }) => {
        // VERSION ANTERIOR DEFINIA DATA DEL USUARIO
        // setAuth(data);
        // Se obtiene el jwt y se valida para obtener los datos del usuario
        if (data.access) {
          JwtService.saveToken(data.access)
          verifyAuth()
        } else {
          setError(["Usuario y/o contraseña inválidos"])
        }
      })
      .catch(({ response }) => {
        setError(["Usuario y/o contraseña inválidos"]);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    console.log("Verificando el login")
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("api/auth/me")
        .then(({ data }) => {
          if (data.id) {
            if (data.idAccount == 0){
              data.idAccount = localStorage.idAccount
            }
            setAuth(data);
          } else {
            setError(["Token invalido"])
            purgeAuth();
          }
        })
        .catch(({ response }) => {
          setError(["Error al comunicarse con el servicico"]);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
