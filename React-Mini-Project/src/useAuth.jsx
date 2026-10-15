import { useUserStore } from "./store/userStore";

function useAuth() {
    const user = useUserStore((state) => state.user);
    const login = useUserStore((state) => state.login);
    const logout = useUserStore((state) => state.logout);
    
    const isAuthenticated = Boolean(user);
    
    return { user, isAuthenticated, login, logout };
}

export default useAuth;