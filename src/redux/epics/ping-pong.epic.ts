import { Action } from "@reduxjs/toolkit";
import { StateObservable, ofType } from "redux-observable";
import { RootState } from "../store";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const PING = 'PING'
const PONG = 'PONG'

export const ping = () => ({ type: PING });
export const pong = () => ({ type: PONG });

export function pingEpic(action$: Observable<Action>): Observable<Action> {
    return action$.pipe(
        ofType(PING),
        map(() => pong())
    )
}
