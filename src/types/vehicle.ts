
export interface VehicleSpec {
  range: string;
  topSpeed: string;
  acceleration: string;
  seats: number;
  doors: number;
  transmission: string;
  category: string;
}

export interface VehicleReview {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
  userImage: string;
}

export interface VehicleOwner {
  name: string;
  joined: string;
  responseRate: string;
  profileImage: string;
}

export interface VehicleData {
  id: string;
  make: string;
  model: string;
  year: number;
  description: string;
  images: string[];
  pricePerDay: number;
  location: string;
  rating: number;
  reviewCount: number;
  features: string[];
  specs: VehicleSpec;
  owner: VehicleOwner;
  reviews: VehicleReview[];
}
