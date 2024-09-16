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

export interface RealEstate {
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

export interface CreateRealEstateInterface {
  address: string;
  zip_code: string;
  region_id: number;
  city_id: number;
  price: number;
  area: number;
  bedrooms: number;
  description: string;
  image: File;
  agent_id: number;
}

export interface AgentInterface {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface CreateAgentInterface {
  name: string;
  surname: string;
  avatar: File;
  email: string;
  phone: number;
}
