import {MovieInfo} from 'src/types';
import {action} from 'typesafe-actions';
import {AppReducerState} from '../reducers/appReducer';
import * as types from './actionTypes';

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const setStoreState = (state?: Partial<AppReducerState>) =>
  action(types.APP.SET_STORE_STATE, state);

export const addFavorite = (info: MovieInfo) => action(types.APP.ADD_FAVORITE, info);

export const removeFavorite = (movieID: string) => action(types.APP.REMOVE_FAVORITE, movieID);
