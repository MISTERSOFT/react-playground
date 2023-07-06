import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { Observable, of } from 'rxjs';
import { catchError, filter, mergeMap } from 'rxjs/operators';
import { AuthService } from "../../services/auth.service";
import { µAuthInit, µAuthInitCancelled, µAuthLoadUserDetailsFailed, µAuthLoadUserDetailsRequest, µAuthLoadUserDetailsSuccessed, µAuthLoginFailed, µAuthLoginRequest, µAuthLoginSuccessed, µAuthLogoutRequest, µAuthLogoutSuccessed } from "../actions/auth.actions";
import { µStoreClearCart, µStoreLoadCartRequest } from "../actions/store.actions";

export const initAuthEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µAuthInit.type),
        mergeMap(() => {
            const token = AuthService.getJwtToken();
            if (!token) {
                return of(µAuthInitCancelled())
            }
            return of(µAuthLoadUserDetailsRequest({ token: token }))
        })
    )
}

export const loginRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        filter(µAuthLoginRequest.match), // Make typescript to read payload safely
        mergeMap((action) => {
            const { username, password } = action.payload;
            return AuthService.login(username, password).pipe(
                mergeMap((res) => {
                    const token = { token: res.response.token }
                    return of(
                        µAuthLoginSuccessed(token),
                        µAuthLoadUserDetailsRequest(token)
                    )
                }),
                catchError(() => of(µAuthLoginFailed()))
            )
        })
    )
}

export const logoutRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µAuthLogoutRequest.type),
        mergeMap(() => {
            AuthService.logout()
            return of(
                µAuthLogoutSuccessed(),
                µStoreClearCart()
            )
        })
    )
}

export const loadUserDetailsRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        filter(µAuthLoadUserDetailsRequest.match), // Allow typescript to read payload
        mergeMap((action) => {
            const { token } = action.payload;
            localStorage.setItem('token', token)
            const decoded = AuthService.readJwtToken(token);
            if (decoded) {
                const { sub: userId } = decoded;
                return AuthService.getUser(userId).pipe(
                    mergeMap(({ user }) => of(
                        µAuthLoadUserDetailsSuccessed(user),
                        µStoreLoadCartRequest()
                    )),
                    catchError(() => of(µAuthLoadUserDetailsFailed()))
                );
            }
            return of(µAuthLoadUserDetailsFailed());
        })
    )
}

export const AUTH_EPICS = [
    initAuthEpic,
    loginRequestEpic,
    logoutRequestEpic,
    loadUserDetailsRequestEpic,
]