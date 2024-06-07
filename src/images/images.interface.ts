export interface ImageInfoInterface {
  _id: string;
  alt: string;
  src: string;
  media_type: string;
  position: number;
  preview_image: {
    src: string;
  };
}

export interface ImagesAlbum {
  name: string;
  imageInfo: ImageInfoInterface[];
  album: string;
}
