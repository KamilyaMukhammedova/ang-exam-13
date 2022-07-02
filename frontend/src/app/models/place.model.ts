export class Place {
  constructor(
    public id: string,
    public user: string,
    public title: string,
    public description: string,
    public mainImage: string,
    public fullRating: number,
    public reviews: {
      user: string,
      text: string,
      foodRating: number,
      serviceRating: number,
      interiorRating: number
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
  reviews: {
    user: string,
    text: string,
    foodRating: number,
    serviceRating: number,
    interiorRating: number
  }[],
  photoGallery: {
    user: string,
    photo: string
  }[],
}
