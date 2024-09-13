export type CreateListingInterface = {
  address: string;
  image: File;
  region: string;
  city: string;
  ZIP: string;
  price: number | string;
  area: number;
  NumberOfBedrooms: number;
  description: string;
  saleOrLoan: string;
  agent: number | string;
};

export interface ListingInterface {
  address: string;
  image: File;
  city: string;
  ZIP: string;
  price: number | string;
  area: number;
  NumberOfBedrooms: number;
  saleOrLoan: string;
}

export interface FilterInterface {
  region: string;
  price: string;
  area: string;
  bedrooms: string;
}
interface City {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface Property {
  id: number;
  address: string;
  area: number;
  bedrooms: number;
  city: City;
  city_id: number;
  region: Region;
  region_id: number;
  image: string;
  is_rental: number;
  price: number;
  zip_code: string;
}

export interface AgentInterface {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  email: string;
  phone: string;
}
