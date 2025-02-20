export interface AuthAction {
    type: string;
    payload: {
        email: string;
        password: string;
    };
}

export interface AuthResponse {
    
    token: string;
}

export interface User {
    
    id: string;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    loading: boolean;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface Workspace {
    id: string;
    name: string;
}

export interface FormData {
    id: string;
    workspaceId: string;
    name: string;
    formJson: any
}
