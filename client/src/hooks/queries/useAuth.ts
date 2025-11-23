import { login, register } from "@/services/auth"
import { useAuthProvider } from "@/state/store";
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
    const setUser = useAuthProvider((state) => state.setUser);
    const setToken = useAuthProvider((state) => state.setToken);
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setUser(data.user);
            setToken(data.token);
        }
    })
}

export const useRegister = () => {
     const setUser = useAuthProvider((state) => state.setUser);
    const setToken = useAuthProvider((state) => state.setToken);
    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setUser(data.user);
            setToken(data.token);
        }
    })
}