import { combineEpics } from "redux-observable";
import { PING_PONG_EPICS } from "./ping-pong.epic";
import { STORE_EPICS } from "./store.epic";
import { AUTH_EPICS } from "./auth.epic";
import { TOAST_MANAGER_EPICS } from "./features/toast-manager.epic";

export const rootEpic = combineEpics(
  ...PING_PONG_EPICS,
  ...STORE_EPICS,
  ...AUTH_EPICS,
  ...TOAST_MANAGER_EPICS,
);