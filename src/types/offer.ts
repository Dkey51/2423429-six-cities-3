type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  city: City;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};
