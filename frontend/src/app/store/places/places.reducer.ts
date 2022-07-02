import { PlacesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess
} from './places.actions';

const initialState: PlacesState = {
  places: [],
  fetchLoading: false,
  fetchError:  null,
  createLoading: false,
  createError: null,
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

);
