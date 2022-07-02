import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { OnePlace } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute, Params } from '@angular/router';
import { addPhotoRequest, addReviewRequest, fetchOnePlaceRequest } from '../../store/places/places.actions';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.sass']
})
export class PlaceInfoComponent implements OnInit {
  @ViewChild('reviewForm') reviewForm!: NgForm;
  @ViewChild('photoForm') photoForm!: NgForm;
  place: Observable<OnePlace | null>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  user: Observable<null | User>;
  addReviewLoading: Observable<boolean>;
  addReviewError: Observable<null | string>;
  addPhotoLoading: Observable<boolean>;
  addPhotoError: Observable<null | string>;
  userId: null | string = null;
  ratingArray: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  placeId: string = '';


  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.place = store.select(state => state.places.place);
    this.loading = store.select(state => state.places.fetchOneLoading);
    this.error = store.select(state => state.places.fetchOneError);
    this.user = store.select(state => state.users.user);
    this.addReviewLoading = store.select(state => state.places.addReviewLoading);
    this.addReviewError = store.select(state => state.places.addReviewError);
    this.addPhotoLoading = store.select(state => state.places.addPhotoLoading);
    this.addPhotoError = store.select(state => state.places.addPhotoError);
    this.user.subscribe(user => {
      this.userId = user ? user._id : null;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.placeId = params['id'];
      this.store.dispatch(fetchOnePlaceRequest({placeId: this.placeId}));
    });
  }

  addReview() {
    const data = this.reviewForm.value;
    data.user = this.userId;
    data.date = new Date().toISOString();
    const review = data;
    this.store.dispatch(addReviewRequest({review, placeId: this.placeId}));
  }

  addPhoto() {
    const data = this.photoForm.value;
    data.user = this.userId;
    this.store.dispatch(addPhotoRequest({photo: data, placeId: this.placeId}));
  }
}
