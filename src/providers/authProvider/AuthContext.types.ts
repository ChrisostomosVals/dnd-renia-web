export type AuthContextType = {
    isAuthenticated: boolean;
    toggleAuthentication: (authenticated: boolean) => void;
}
