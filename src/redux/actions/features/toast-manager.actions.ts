import { createAction } from "@reduxjs/toolkit";
import { ToastConfig, ToastParams } from "../../reducers/features/toast-manager.reducer";

export const µToastManagerCreate = createAction<ToastParams>('FEATURES/ToastManager/µToastManagerCreate')
export const µToastManagerClearing = createAction<ToastConfig['timestamp']>('FEATURES/ToastManager/µToastManagerClearing')
export const µToastManagerClear = createAction<ToastConfig['timestamp']>('FEATURES/ToastManager/µToastManagerClear')
export const µToastManagerClearDone = createAction<ToastConfig['timestamp']>('FEATURES/ToastManager/µToastManagerClearDone')
