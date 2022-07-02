export class Place {
  constructor(
    public id: string,
    public user: string,
    public title: string,
    public description: string,
    public mainImage: string,
    public fullRating: number,
    public averageFoodRating: number,
    public averageServiceRating: number,
    public averageInteriorRating: number,
    public reviews: {
      user: string,
      text: string,
      foodRating: number,
      serviceRating: number,
      interiorRating: number,
      date: string,
    }[],
    public photoGallery: {
      user: string,
      photo: string
    }[],
  ) {}
}

export interface ApiPlaceData {
  _id: string,
  user: string,
  title: string,
  description: string,
  mainImage: string,
  fullRating: number,
  averageFoodRating: number,
  averageServiceRating: number,
  averageInteriorRating: number,
  reviews: {
    user: string,
    text: string,
    foodRating: number,
    serviceRating: number,
    interiorRating: number,
    date: string,
  }[],
  photoGallery: {
    user: string,
    photo: string
  }[],
}

export interface NewPlaceData {
  [key: string]: any,
  title: string,
  description: string,
  mainImage: File | null,
  isAgree: boolean,
}

export class OnePlace {
  constructor(
    public _id: string,
    public user: string,
    public title: string,
    public description: string,
    public mainImage: string,
    public fullRating: number,
    public averageFoodRating: number,
    public averageServiceRating: number,
    public averageInteriorRating: number,
    public reviews: {
      user: {
        _id: string,
        displayName: string,
      },
      text: string,
      foodRating: number,
      serviceRating: number,
      interiorRating: number,
      date: string,
    }[],
    public photoGallery: {
      user: string,
      photo: string
    }[],
  ) {}
}


