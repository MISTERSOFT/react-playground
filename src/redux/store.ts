import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from '../features/counter/counterSlice';
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) => {
        const defaults = getDefaultMiddleware();
        return defaults.concat(epicMiddleware);
    }
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;