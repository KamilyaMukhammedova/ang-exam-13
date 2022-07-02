import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPlaceData, Place } from '../models/place.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private http: HttpClient) { }

  getPlaces() {
    return this.http.get<ApiPlaceData[]>(environment.apiUrl + '/places').pipe(
      map(response => {
        return response.map(placeData => {
          return new Place(
            placeData._id,
            placeData.user,
            placeData.title,
            placeData.description,
            placeData.mainImage,
            placeData.fullRating,
            placeData.reviews,
            placeData.photoGallery
          );
        });
      })
    );
  }


}
