import { Observable, of } from 'rxjs';
import { mergeMap, filter, delay, combineLatestWith, map, first } from 'rxjs/operators';
import { Action } from "@reduxjs/toolkit";
import { µToastManagerClear, µToastManagerClearDone, µToastManagerClearing } from "../../actions/features/toast-manager.actions";
import { StateObservable } from 'redux-observable';
import { RootState } from '../../store';
import { selectAnimationTransitionOut } from '../../selectors/features/toast-manager.selectors';

export const clearingToastEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        filter(µToastManagerClearing.match), // Make typescript to read payload safely
        mergeMap(({ payload }) => of(µToastManagerClear(payload)))
    )
}

export const clearToastEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => {
    return action$.pipe(
        filter(µToastManagerClear.match), // Make typescript to read payload safely
        combineLatestWith(state$.pipe(map(selectAnimationTransitionOut), first())),
        mergeMap(([{ payload }, animationTransitionOut]) => of(µToastManagerClearDone(payload)).pipe(delay(animationTransitionOut)))
    )
}

export const TOAST_MANAGER_EPICS = [
    clearingToastEpic,
    clearToastEpic
]