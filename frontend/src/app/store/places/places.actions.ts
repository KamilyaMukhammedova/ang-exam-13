import { createAction, props } from '@ngrx/store';
import { NewPlaceData, OnePlace, Place } from '../../models/place.model';
import { Review } from '../../models/review.model';

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

export const fetchOnePlaceRequest = createAction(
  '[One Place] Fetch Request',
  props<{ placeId: string }>()
);
export const fetchOnePlaceSuccess = createAction(
  '[One Place] Fetch Success',
  props<{ place: OnePlace | null }>()
);
export const fetchOnePlaceFailure = createAction(
  '[One Place] Fetch Failure',
  props<{ error: string }>()
);

export const addReviewRequest = createAction(
  '[Review] Add Request',
  props<{ review: Review, placeId: string }>()
);
export const addReviewSuccess = createAction(
  '[Review] Add Success'
);
export const addReviewFailure = createAction(
  '[Review] Add Failure',
  props<{ error: string }>()
);
