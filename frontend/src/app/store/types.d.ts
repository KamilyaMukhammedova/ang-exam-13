import { LoginError, RegisterError, User } from '../models/user.model';
import { OnePlace, Place } from '../models/place.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoading: boolean,
  fbError: null | string,
};

export type PlacesState = {
  places: Place[],
  place: OnePlace | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  fetchOneLoading: boolean,
  fetchOneError: null | string,
  addReviewLoading: boolean,
  addReviewError: null | string,
  addPhotoLoading: boolean,
  addPhotoError: null | string,
  removeLoading: boolean,
  removeError: null | string,
};

export type AppState = {
  users: UsersState,
  places: PlacesState,
};
