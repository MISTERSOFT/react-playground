import { createAction } from "@reduxjs/toolkit";
import { LoginRequestPayload, User } from "../reducers/auth.reducer";

export const µAuthInit = createAction('AUTH/µAuthInit')
export const µAuthInitCancelled = createAction('AUTH/µAuthInitCancelled')
export const µAuthLoginRequest = createAction<LoginRequestPayload>('AUTH/µAuthLoginRequest');
export const µAuthLoginSuccessed = createAction<{ token: string }>('AUTH/µAuthLoginSuccessed');
export const µAuthLoginFailed = createAction('AUTH/µAuthLoginFailed');
export const µAuthLogoutRequest = createAction('AUTH/µAuthLogoutRequest');
export const µAuthLogoutSuccessed = createAction('AUTH/µAuthLogoutSuccessed');
export const µAuthLoadUserDetailsRequest = createAction<{ token: string }>('AUTH/µAuthLoadUserDetailsRequest');
export const µAuthLoadUserDetailsSuccessed = createAction<User>('AUTH/µAuthLoadUserDetailsSuccessed');
export const µAuthLoadUserDetailsFailed = createAction('AUTH/µAuthLoadUserDetailsFailed');
