import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = createSelector(
    selectUser,
    (loggedUser) => Boolean(loggedUser)
)