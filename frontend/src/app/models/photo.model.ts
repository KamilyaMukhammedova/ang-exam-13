export interface Photo {
  [key: string]: any,
  user: string,
  photo: File | null,
}
