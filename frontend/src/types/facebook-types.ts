export interface FacebookUserData {
    id: string;
    name: string;
    email: string;
    picture: Picture;
  }
  
  export interface Picture {
    data: PictureData;
  }
  
  export interface PictureData {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  }