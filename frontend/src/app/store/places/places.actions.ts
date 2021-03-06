import { createAction, props } from '@ngrx/store';
import { NewPlaceData, OnePlace, Place } from '../../models/place.model';
import { Review } from '../../models/review.model';
import { Photo } from '../../models/photo.model';

export const fetchPlacesRequest = createAction(
  '[Places] Fetch Request'
);
export const fetchPlacesSuccess = createAction(
  '[Places] Fetch Success',
  props<{ places: Place[] }>()
);
export const fetchPlacesFailure = createAction(
  '[Places] Fetch Failure',
  props<{ error: string }>()
);

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

export const addPhotoRequest = createAction(
  '[Photo] Add Request',
  props<{ photo: Photo, placeId: string }>()
);
export const addPhotoSuccess = createAction(
  '[Photo] Add Success'
);
export const addPhotoFailure = createAction(
  '[Photo] Add Failure',
  props<{ error: string }>()
);

export const removePLaceRequest = createAction(
  '[Place] Delete Request',
  props<{placeId: string}>()
);
export const removePlaceSuccess = createAction(
  '[Place] Delete Success'
);
export const removePlaceFailure = createAction(
  '[Place] Delete Failure',
  props<{error: string}>()
);

export const removeReviewRequest = createAction(
  '[Review] Delete Request',
  props<{reviewId: string}>()
);
export const removeReviewSuccess = createAction(
  '[Review] Delete Success'
);
export const removeReviewFailure = createAction(
  '[Review] Delete Failure',
  props<{error: string}>()
);

export const removePhotoRequest = createAction(
  '[Photo] Delete Request',
  props<{photoId: string}>()
);
export const removePhotoSuccess = createAction(
  '[Photo] Delete Success'
);
export const removePhotoFailure = createAction(
  '[Photo] Delete Failure',
  props<{error: string}>()
);
