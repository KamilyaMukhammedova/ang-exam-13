import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchPlacesRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {
  places: Observable<Place[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.places = store.select(state => state.places.places);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  onRemove(id: string) {

  }
}
