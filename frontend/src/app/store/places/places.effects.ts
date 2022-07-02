import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../../services/places.service';
import {
  addPhotoFailure,
  addPhotoRequest,
  addPhotoSuccess,
  addReviewFailure,
  addReviewRequest,
  addReviewSuccess,
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  fetchOnePlaceFailure,
  fetchOnePlaceRequest,
  fetchOnePlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  removePhotoFailure,
  removePhotoRequest,
  removePhotoSuccess,
  removePlaceFailure,
  removePLaceRequest,
  removePlaceSuccess,
  removeReviewFailure,
  removeReviewRequest,
  removeReviewSuccess
} from './places.actions';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { OnePlace } from '../../models/place.model';

@Injectable()
export class PlacesEffects {
  place: Observable<OnePlace | null>;
  placeId: string = '';

  constructor(
    private actions: Actions,
    private placesService: PlacesService,
    private helpers: HelpersService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.place = store.select(state => state.places.place);
    this.place.subscribe(place => {
      this.placeId = place ? place._id : '';
    });
  }

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.getPlaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() => of(fetchPlacesFailure({
        error: 'Something went wrong with places uploading!'
      })))
    ))
  ));

  addPlace = createEffect(() => this.actions.pipe(
    ofType(createPlaceRequest),
    mergeMap(({newPlaceData}) => this.placesService.addNewPlace(newPlaceData).pipe(
      map(() => createPlaceSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Adding of new place is successful!');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(createPlaceFailure({error: 'Wrong data of place!'})))
    ))
  ));

  fetchOnePlace = createEffect(() => this.actions.pipe(
    ofType(fetchOnePlaceRequest),
    mergeMap(({placeId}) => this.placesService.getOnePlace(placeId).pipe(
      map(place => fetchOnePlaceSuccess({place})),
      catchError(() => of(fetchOnePlaceFailure({
        error: 'Something went wrong with one place uploading!'
      })))
    ))
  ));

  addReview = createEffect(() => this.actions.pipe(
    ofType(addReviewRequest),
    mergeMap(({review, placeId}) => this.placesService.addReview(review, placeId).pipe(
      map(() => addReviewSuccess()),
      tap(() => {
        this.store.dispatch(fetchOnePlaceRequest({placeId}));
        this.helpers.openSnackbar('Adding of review is successful!');
      }),
      catchError(() => of(addReviewFailure({error: 'Wrong data of review!'})))
    ))
  ));

  addPhoto = createEffect(() => this.actions.pipe(
    ofType(addPhotoRequest),
    mergeMap(({photo, placeId}) => this.placesService.addPhoto(photo, placeId).pipe(
      map(() => addPhotoSuccess()),
      tap(() => {
        this.store.dispatch(fetchOnePlaceRequest({placeId}));
        this.helpers.openSnackbar('Adding of photo is successful!');
      }),
      catchError(() => of(addPhotoFailure({error: 'Wrong data of photo!'})))
    ))
  ));

  removePlace = createEffect(() => this.actions.pipe(
    ofType(removePLaceRequest),
    mergeMap(({placeId}) => this.placesService.removePlace(placeId).pipe(
      map(() => removePlaceSuccess()),
      tap(() => {
        this.store.dispatch(fetchPlacesRequest());
        this.helpers.openSnackbar('Removed place');
      }),
      catchError(() => of(removePlaceFailure({
        error: 'Something went wrong! Can\'t remove place!'
      })))
    ))
  ));

  removeReview = createEffect(() => this.actions.pipe(
    ofType(removeReviewRequest),
    mergeMap(({reviewId}) => this.placesService.removeReview(reviewId).pipe(
      map(() => removeReviewSuccess()),
      tap(() => {
        this.store.dispatch(fetchOnePlaceRequest({placeId: this.placeId}));
        this.helpers.openSnackbar('Removed review');
      }),
      catchError(() => of(removeReviewFailure({
        error: 'Something went wrong! Can\'t remove review!'
      })))
    ))
  ));

  removePhoto = createEffect(() => this.actions.pipe(
    ofType(removePhotoRequest),
    mergeMap(({photoId}) => this.placesService.removePhoto(photoId).pipe(
      map(() => removePhotoSuccess()),
      tap(() => {
        this.store.dispatch(fetchOnePlaceRequest({placeId: this.placeId}));
        this.helpers.openSnackbar('Removed photo');
      }),
      catchError(() => of(removePhotoFailure({
        error: 'Something went wrong! Can\'t remove photo!'
      })))
    ))
  ));
}
