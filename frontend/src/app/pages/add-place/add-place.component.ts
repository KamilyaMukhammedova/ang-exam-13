import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NewPlaceData } from '../../models/place.model';
import { createPlaceRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.sass']
})
export class AddPlaceComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  isNotAgree: boolean = true;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.places.createLoading);
    this.error = store.select(state => state.places.createError);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const newPlaceData: NewPlaceData = this.form.value;
    this.store.dispatch(createPlaceRequest({newPlaceData}));
  }

  Toggle(event: any) {
    this.isNotAgree = event.checked !== true;
  }

}
