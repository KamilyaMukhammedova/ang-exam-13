import { PlacesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  addPhotoFailure,
  addPhotoRequest, addPhotoSuccess,
  addReviewFailure,
  addReviewRequest, addReviewSuccess,
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess, fetchOnePlaceFailure, fetchOnePlaceRequest, fetchOnePlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess
} from './places.actions';

const initialState: PlacesState = {
  places: [],
  place: null,
  fetchLoading: false,
  fetchError:  null,
  createLoading: false,
  createError: null,
  fetchOneLoading: false,
  fetchOneError: null,
  addReviewLoading: false,
  addReviewError: null,
  addPhotoLoading: false,
  addPhotoError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({
    ...state,
    fetchLoading: false,
    places,
  })),
  on(fetchPlacesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createPlaceRequest, state => ({...state, createLoading: true})),
  on(createPlaceSuccess, state => ({...state, createLoading: false})),
  on(createPlaceFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),

  on(fetchOnePlaceRequest, state => ({...state, fetchOneLoading: true})),
  on(fetchOnePlaceSuccess, (state, {place}) => ({
    ...state,
    fetchOneLoading: false,
    place
  })),
  on(fetchOnePlaceFailure, (state, {error}) => ({
    ...state,
    fetchOneLoading: false,
    fetchOneError: error
  })),

  on(addReviewRequest, state => ({...state, addReviewLoading: true})),
  on(addReviewSuccess, state => ({...state, addReviewLoading: false})),
  on(addReviewFailure, (state, {error}) => ({
    ...state,
    addReviewLoading: false,
    addReviewError: error,
  })),

  on(addPhotoRequest, state => ({...state, addPhotoLoading: true})),
  on(addPhotoSuccess, state => ({...state, addPhotoLoading: false})),
  on(addPhotoFailure, (state, {error}) => ({
    ...state,
    addPhotoLoading: false,
    addPhotoError: error,
  })),

);
