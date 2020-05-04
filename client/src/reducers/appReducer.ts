'use strict';
import _ from 'lodash';
import {BACKGROUND, FOREGROUND, INACTIVE} from 'redux-enhancer-react-native-appstate';
import {MovieInfo} from 'src/types';
import {APP} from '../actions/actionTypes';

export interface AppReducerState {
  version: string;
  inactive: boolean;
  foreground: boolean;
  background: boolean;
  favorite: MovieInfo[];
}

const initialState: AppReducerState = {
  version: '1.0.0',
  inactive: false,
  foreground: false,
  background: false,
  favorite: [],
};
export default function appReducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case APP.ADD_FAVORITE:
      const newFavorite = [...state.favorite];
      newFavorite.push(action.payload);
      console.log(newFavorite);
      return {...state, favorite: newFavorite};
    case APP.REMOVE_FAVORITE:
      const newFavorite2 = [...state.favorite];
      _.remove(newFavorite2, (f) => f.id === action.payload);
      return {...state, favorite: newFavorite2};
    case APP.SET_STORE_STATE:
      return Object.assign({}, initialState, state, action.payload);
    case FOREGROUND:
      return {
        ...state,
        inactive: false,
        foreground: true,
        background: false,
      };
    case BACKGROUND:
      return {
        ...state,
        inactive: false,
        foreground: false,
        background: true,
      };
    case INACTIVE:
      return {
        ...state,
        inactive: true,
        foreground: false,
        background: false,
      };
    default:
      return state;
  }
}
