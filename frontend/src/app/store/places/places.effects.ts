import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../../services/places.service';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  fetchOnePlaceFailure,
  fetchOnePlaceRequest,
  fetchOnePlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess
} from './places.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()
export class PlacesEffects {
  constructor(
    private actions: Actions,
    private placesService: PlacesService,
    private helpers: HelpersService,
    private router: Router,
  ) {}

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
}
