import jwtDecode from 'jwt-decode';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { User } from '../redux/reducers/auth.reducer';

// https://fakestoreapi.com/docs

export class AuthService {
    static login(username: string, password: string) {
        return ajax.post<{ token: string }>('https://fakestoreapi.com/auth/login', {
            username,
            password
        });
    }

    static logout() {
        localStorage.removeItem('token')
    }

    static getUser(userId: number) {
        return ajax.getJSON<User>(`https://fakestoreapi.com/users/${userId}`).pipe(map(user => ({ user })));
    }

    static getJwtToken() {
        const token = localStorage.getItem('token')
        if (!token) return null;
        return token
    }

    static readJwtToken(token: string) {
        if (!token) return null;
        return jwtDecode<{ sub: number, user: string, iat: number }>(token)
    }
}