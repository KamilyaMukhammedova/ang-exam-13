import { createAction, props } from '@ngrx/store';
import { NewPlaceData, Place } from '../../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Fetch Success', props<{ places: Place[] }>());
export const fetchPlacesFailure = createAction('[Places] Fetch Failure', props<{ error: string }>());

export const createPlaceRequest = createAction(
  '[Place] Create Request',
  props<{ newPlaceData: NewPlaceData }>()
);
export const createPlaceSuccess = createAction(
  '[Place] Create Success'
);
export const createPlaceFailure = createAction(
  '[Place] Create Failure',
  props<{ error: string }>()
);
