import { ApiService } from './api.service'

interface AuthResponse {
    status: number
    message: string
    data: {
        token: string
        user: any
        refreshToken: string
    }
}

export class AuthService {
    static async login(email: string, password: string) {
        return ApiService.post<AuthResponse>('/auth/login', { email, password })
    }

    static async logout() {
        return ApiService.post('/auth/logout')
    }

    static async getCurrentUser() {
        return ApiService.get<AuthResponse['data']['user']>('/auth/user')
    }
}
