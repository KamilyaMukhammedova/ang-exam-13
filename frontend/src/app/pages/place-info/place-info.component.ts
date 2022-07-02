import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnePlace } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute, Params } from '@angular/router';
import { fetchOnePlaceRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.sass']
})
export class PlaceInfoComponent implements OnInit {
  place: Observable<OnePlace | null>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.place = store.select(state => state.places.place);
    this.loading = store.select(state => state.places.fetchOneLoading);
    this.error = store.select(state => state.places.fetchOneError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const placeId = params['id'];
      this.store.dispatch(fetchOnePlaceRequest({placeId}));
    });
  }

}
