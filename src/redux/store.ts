import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from '../components/counter/counterSlice';
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { storeReducer } from "./reducers/store.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { FEATURE_REDUCERS } from "./reducers/features";

const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, any, any>();

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        store: storeReducer,
        auth: authReducer,
        features: FEATURE_REDUCERS,
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