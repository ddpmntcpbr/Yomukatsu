import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);

export const getUserNickname = createSelector(
  [usersSelector],
  (state) => state.userNickname
);

export const getUserImage = createSelector(
  [usersSelector],
  (state) => state.image
);
