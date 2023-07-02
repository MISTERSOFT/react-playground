import { combineEpics } from "redux-observable";
import { pingEpic } from "./ping-pong.epic";

export const rootEpic = combineEpics(
  pingEpic,
);