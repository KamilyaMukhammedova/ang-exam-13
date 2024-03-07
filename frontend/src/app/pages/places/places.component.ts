// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Place } from '../../models/place.model';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../store/types';
// import { fetchPlacesRequest, removePLaceRequest } from '../../store/places/places.actions';
// import { MatDialog } from "@angular/material/dialog";
// import { DeleteDialogComponent } from "../../components/delete-dialog/delete-dialog.component";
//
// @Component({
//   selector: 'app-places',
//   templateUrl: './places.component.html',
//   styleUrls: ['./places.component.sass']
// })
// export class PlacesComponent implements OnInit {
//   places: Observable<Place[]>;
//   loading: Observable<boolean>;
//   error: Observable<null | string>;
//   placeNameToDelete = '';
//
//   constructor(
//     private store: Store<AppState>,
//     public dialog: MatDialog
//   ) {
//     this.places = store.select(state => state.places.places);
//     this.loading = store.select(state => state.places.fetchLoading);
//     this.error = store.select(state => state.places.fetchError);
//   }
//
//   ngOnInit(): void {
//     this.store.dispatch(fetchPlacesRequest());
//   }
//
//   onRemove(id: string, name: string) {
//     const dialogRef = this.dialog.open(DeleteDialogComponent, {
//       width: '50%',
//       data: { placeName: name },
//     });
//
//     dialogRef.afterClosed().subscribe((result: boolean) => {
//       if (result) {
//         this.store.dispatch(removePLaceRequest({placeId: id}));
//       }
//
//       this.placeNameToDelete = '';
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchPlacesRequest, removePLaceRequest } from '../../store/places/places.actions';
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "../../ui/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {
  places: Observable<Place[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  placeNameToDelete = '';

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.places = store.select(state => state.places.places);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  onRemove(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: { itemTitle: name, dialogTitle: 'place' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(removePLaceRequest({placeId: id}));
      }

      this.placeNameToDelete = '';
    });
  }
}
