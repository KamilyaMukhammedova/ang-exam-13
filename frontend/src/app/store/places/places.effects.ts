import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../../services/places.service';
import { fetchPlacesFailure, fetchPlacesRequest, fetchPlacesSuccess } from './places.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PlacesEffects {
  constructor(
    private actions: Actions,
    private placesService: PlacesService,
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

}
