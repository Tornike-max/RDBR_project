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
  badrooms: string;
}
