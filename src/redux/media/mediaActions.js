import {
    FETCH_MEDIA_REQUEST,
    FETCH_MEDIA_SUCCESS,
    FETCH_MEDIA_FAILURE,
    FETCH_FAVOURITES_REQUEST,
    FETCH_FAVOURITES_SUCCESS,
    FETCH_FAVOURITES_FAILURE,
    SAVE_MEDIA_REQUEST,
    SAVE_MEDIA_SUCCESS,
    SAVE_MEDIA_FAILURE,
    UNSAVE_MEDIA_SUCCESS,
    UNSAVE_MEDIA_FAILURE,
    FETCH_VIDEOS_REQUEST,
    FETCH_VIDEOS_SUCCESS,
    FETCH_VIDEOS_FAILURE,
    FETCH_PLACES_REQUEST,
    FETCH_PLACES_SUCCESS,
    FETCH_PLACES_FAILURE,
    SET_DISPLAY_FILTER_MEDIA,
    SET_DISPLAY_FILTER_VIDEO,
    SET_DISPLAY_FILTER_PLACE,
    CLEAR_MEDIA,
    CLEAR_PLACES,
    CLEAR_VIDEOS
} from './mediaTypes.js';

import axios from 'axios';

import Unsplash, { toJson } from 'unsplash-js';

axios.defaults.withCredentials = true;

const unsplash = new Unsplash(
    {
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY
    }
);
const TRAVELR_API = process.env.REACT_APP_API_URI;
const FAVOURITES_URL = `${TRAVELR_API}/favourites`;
const VIDEOS_URL = `${TRAVELR_API}/findVideos`;
const PLACES_URL = `${TRAVELR_API}/findPlaces`;


const fetchMediaRequest = () => {
    return {
        type: FETCH_MEDIA_REQUEST
    }
}

const fetchMediaSuccess = content => {
    return {
        type: FETCH_MEDIA_SUCCESS,
        payload: content
    }
}

const fetchMediaFailure = error => {
    return {
        type: FETCH_MEDIA_FAILURE,
        payload: error
    }
}

export const fetchMedia = destination => {
    return (dispatch) => {
        dispatch(fetchMediaRequest);
        unsplash.search.photos(destination, 1, 12, { orientation: 'landscape' })
            .then(toJson)
            .then(json => {
                dispatch(fetchMediaSuccess({ ...json, query: destination }));
            })
            .catch(error => {
                dispatch(fetchMediaFailure(error.message));
            });
    }
}

export const fetchMoreMedia = (destination, page) => {
    return (dispatch) => {
        dispatch(fetchMediaRequest);
        unsplash.search.photos(destination, page, 12, { orientation: 'landscape' })
            .then(toJson)
            .then(json => {
                dispatch(fetchMediaSuccess({ ...json, query: destination }));
            })
            .catch(error => {
                dispatch(fetchMediaFailure(error.message));
            });
    }
}

export const clearMedia = () => {
    return {
        type: CLEAR_MEDIA
    }
}

const saveMediaRequest = () => {
    return {
        type: SAVE_MEDIA_REQUEST
    }
}
const saveMediaSuccess = (folder, content) => {
    return {
        type: SAVE_MEDIA_SUCCESS,
        folder: folder,
        payload: content
    }
}

const saveMediaFailure = error => {
    return {
        type: SAVE_MEDIA_FAILURE,
        payload: error
    }
}

const unsaveMediaSuccess = (folder, content) => {
    return {
        type: UNSAVE_MEDIA_SUCCESS,
        folder: folder,
        payload: content
    }
}

const unsaveMediaFailure = error => {
    return {
        type: UNSAVE_MEDIA_FAILURE,
        payload: error
    }
}

export const toggleSaveMedia = (folder, media, shouldSave) => {
    return (dispatch) => {
        dispatch(saveMediaRequest);
        if (shouldSave) {
            /* save id to mongoDB */
            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            axios.post(FAVOURITES_URL, {...media}, config)
                .then(res => {
                    dispatch(saveMediaSuccess(folder, media));
                })
                .catch(error => {
                    dispatch(saveMediaFailure(error));
                });
        } else {
            /* unsave id to mongoDB */
            axios({
                method: 'DELETE',
                url: FAVOURITES_URL + '/' + media.id,
                withCredentials: true
            })
                .then(res => {
                    dispatch(unsaveMediaSuccess(folder, media));
                })
                .catch(error => {
                    dispatch(unsaveMediaFailure(error));
                });
            dispatch(unsaveMediaSuccess(folder, media));
        }
    }
}

const fetchFavouritesRequest = () => {
    return {
        type: FETCH_FAVOURITES_REQUEST
    }
}

const fetchFavouritesSuccess = (favourites) => {
    return {
        type: FETCH_FAVOURITES_SUCCESS,
        payload: favourites
    }
}

const fetchFavouritesFailure = (error) => {
    return {
        type: FETCH_FAVOURITES_FAILURE,
        payload: error
    }
}

export const fetchFavourites = () => {
    return (dispatch) => {
        dispatch(fetchFavouritesRequest);
        axios({
            url: FAVOURITES_URL,
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            withCredentials: true
        })
            .then(json => {
                dispatch(fetchFavouritesSuccess(json.data));
            })
            .catch(error => {
                dispatch(fetchFavouritesFailure(error.message));
            });
    }
}

const fetchVideosRequest = () => {
    return {
        type: FETCH_VIDEOS_REQUEST
    }
}

const fetchVideosSuccess = content => {
    return {
        type: FETCH_VIDEOS_SUCCESS,
        payload: content
    }
}

const fetchVideosFailure = error => {
    return {
        type: FETCH_VIDEOS_FAILURE,
        payload: error
    }
}

export const fetchVideos = (query) => {
    return (dispatch) => {
        dispatch(fetchVideosRequest());
        fetch(VIDEOS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destination: query
            })
        })
            .then(toJson)
            .then(json => {
                dispatch(fetchVideosSuccess(json));
            })
            .catch(error => {
                dispatch(fetchVideosFailure(error.message));
            })
    }
}

export const fetchMoreVideos = (query, nextPageToken) => {
    return (dispatch) => {
        dispatch(fetchVideosRequest());
        fetch(VIDEOS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destination: query,
                nextPageToken: nextPageToken
            })
        })
            .then(toJson)
            .then(json => {
                dispatch(fetchVideosSuccess(json));
            })
            .catch(error => {
                dispatch(fetchVideosFailure(error.message));
            })
    }
}

export const clearVideos = () => {
    return {
        type: CLEAR_VIDEOS
    }
}

const fetchPlacesRequest = () => {
    return {
        type: FETCH_PLACES_REQUEST
    }
}

const fetchPlacesSuccess = content => {
    return {
        type: FETCH_PLACES_SUCCESS,
        payload: content
    }
}

const fetchPlacesFailure = error => {
    return {
        type: FETCH_PLACES_FAILURE,
        payload: error
    }
}

export const fetchPlaces = (query) => {
    return (dispatch) => {
        dispatch(fetchPlacesRequest());
        fetch(PLACES_URL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              destination: query
            })
          })
          .then(toJson)
          .then(json => {
              dispatch(fetchPlacesSuccess(json));
          })
          .catch(error => {
              dispatch(fetchPlacesFailure(error.message));
          })
    }
}

export const fetchMorePlaces = (query, nextPageToken) => {
    return (dispatch) => {
        dispatch(fetchPlacesRequest());
        fetch(PLACES_URL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              destination: query,
              nextPageToken: nextPageToken
            })
          })
          .then(toJson)
          .then(json => {
              dispatch(fetchPlacesSuccess(json));
          })
          .catch(error => {
              dispatch(fetchPlacesFailure(error.message));
          })
    }
}

export const clearPlaces = () => {
    return {
        type: CLEAR_PLACES
    }
}

export const setDisplayFilter = (mediaType) => {
    if (mediaType === 'place') {
        return {
            type: SET_DISPLAY_FILTER_PLACE
        }
    }
    if (mediaType === 'media') {
        return {
            type: SET_DISPLAY_FILTER_MEDIA
        }
    }
    if (mediaType === 'video') {
        return {
            type: SET_DISPLAY_FILTER_VIDEO
        }
    }
}