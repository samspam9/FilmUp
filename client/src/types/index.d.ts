declare module 'redux-persist/lib/*';
import {Theme} from '../constants/themes';

export type AppTheme = 'auto' | Theme;

export interface BaseAction {
  type: string;
  payload: any;
}

export type Timestamp = number; // ms

export type InAppPurchaseType =
  | 'SubscriptionMonth'
  | 'SubscriptionYear'
  | 'ForeverRegular'
  | 'ForeverGood'
  | 'ForeverGreat';

export type InAppPurchaseGroup = 'Subscription' | 'Forever';

export interface InAppPurchaseInfo {
  type: InAppPurchaseType;
  group: InAppPurchaseGroup;
  price: string;
  title: string;
  description: string;
  sku: string;
  freeTrialAvailable?: boolean;
}

export interface PurchasedIAPInfo {
  type: InAppPurchaseType | 'Unknown';
  transactionID: string | 'Unknown';
  at: Timestamp;
  timezone: string;
  restored?: boolean;
}

export interface BasicMovieInfo {
  id: string;
  poster: string;
  title: string;
}

export interface MovieGenre {
  name: string;
}

export interface MovieLanguage {
  name: string;
}

export interface ProductionCountry {
  name: string;
}
export interface ProductionCompany {
  name: string;
}

export interface MovieInfo {
  id: string;
  poster_path: string;
  title: string;
  genres: MovieGenre[];
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  status: string;
  spoken_languages: MovieLanguage[];
  production_countries: ProductionCountry[];
  production_companies: ProductionCompany[];
  budget: number;
  revenue: number;
  popularity: number;
  runtime: number;
  tagline: string;
}
