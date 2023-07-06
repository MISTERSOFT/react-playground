import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectToastManager = (state: RootState) => state.features.toastManager;

export const selectToasts = createSelector(
    selectToastManager,
    (toastManager) => toastManager.items
)

export const selectAnimationTransitionOut = createSelector(
    selectToastManager,
    (toastManager) => toastManager.durations.animationTransitionOut
)