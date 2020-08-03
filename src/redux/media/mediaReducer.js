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
    FETCH_RESTAURANTS_FAILURE,
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    FETCH_EVENTS_REQUEST,
    FETCH_EVENTS_SUCCESS,
    SET_DISPLAY_FILTER_MEDIA,
    SET_DISPLAY_FILTER_VIDEO,
    SET_DISPLAY_FILTER_PLACE,
    SET_DISPLAY_FILTER_RESTAURANT,
    SET_DISPLAY_FILTER_EVENT,
    CLEAR_MEDIA,
    CLEAR_PLACES,
    CLEAR_VIDEOS,
    CLEAR_RESTAURANTS,
    CLEAR_EVENTS
} from './mediaTypes.js';

const initialState = {
    loading: false,
    results: [],
    error: ''
}

const mediaState = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEDIA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MEDIA_SUCCESS:
            return {
                ...state,
                loading: false,
                results: [...state.results, ...action.payload.results],
                error: ''
            }
        case FETCH_MEDIA_FAILURE:
            return {
                ...state,
                loading: false,
                results: [],
                error: action.payload
            }
        case CLEAR_MEDIA:
            return {
                ...state,
                results: []
            }
        default: return state
    }
}

const initialFolders = {
    loading: false,
    folders: [],
    filters: [],
    error: ''
}

const foldersReducer = (state = initialFolders, action) => {
    switch (action.type) {
        case FETCH_FAVOURITES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_FAVOURITES_SUCCESS:
            let filters = new Set();
            action.payload.forEach(item => {
                item.tags.forEach(tag => {
                        filters.add(tag);
                });
            });
            return {
                ...state,
                loading: false,
                folders: [
                    {
                        name: "default",
                        images: action.payload
                    }
                ],
                filters: Array.from(filters)
            }
        case FETCH_FAVOURITES_FAILURE:
            return {
                ...state,
                loading: false,
                folders: []
            }
        case SAVE_MEDIA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SAVE_MEDIA_SUCCESS:

            if (state.folders
                .find(f => f.name === action.folder) === undefined) {
                state.folders.push({
                    name: action.folder,
                    images: []
                })
            }
            state.folders
                .find(f => f.name === action.folder)
                .images.push(action.payload);

            return {
                ...state,
                loading: false,
                folders: [
                    ...state.folders,
                ],
                error: ''
            }
        case SAVE_MEDIA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UNSAVE_MEDIA_SUCCESS:
            let folder = state.folders
                .find(f => f.name === action.folder);

            if (folder !== undefined) {
                folder.images = folder.images.filter(img => img.id !== action.payload.id);
            }

            return {
                ...state,
                loading: false,
                folders: [
                    ...state.folders,
                ],
                error: ''
            }
        case UNSAVE_MEDIA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

const initialVideos = {
    loading: false,
    ids: [],
    error: '',
    nextPageToken: ''
};

const videosReducer = (state = initialVideos, action) => {
    switch (action.type) {
        case FETCH_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                loading: false,
                ids: [...state.ids, ...action.payload.ids],
                nextPageToken: action.payload.nextPageToken,
                error: ''
            }
        case FETCH_VIDEOS_FAILURE:
            return {
                ...state,
                loading: false,
                ids: [],
                error: action.payload
            }
        case CLEAR_VIDEOS:
            return {
                ...state,
                ids: [],
                nextPageToken: ''
            }
        default: return state;
    }

};

const initialPlaces = {
    loading: false,
    places: [],
    error: '',
    nextPageToken: ''
};

const placesReducer = (state = initialPlaces, action) => {
    switch (action.type) {
        case FETCH_PLACES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PLACES_SUCCESS:
            return {
                ...state,
                loading: false,
                places: [...state.places, ...action.payload.places],
                error: '',
                nextPageToken: action.payload.pageToken
            }
        case FETCH_PLACES_FAILURE:
            return {
                ...state,
                loading: false,
                places: [],
                error: action.payload
            }
        case CLEAR_PLACES:
            return {
                ...state,
                places: [],
                nextPageToken: ''
            }
        default: return state;
    }

};

const initialRestaurants = {
    loading: false,
    restaurants: [],
    error: ''
};

const restaurantsReducer = (state = initialRestaurants, action) => {
    switch (action.type) {
        case FETCH_RESTAURANTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: [...state.restaurants, ...action.payload.restaurants],
                error: ''
            }
        case FETCH_RESTAURANTS_FAILURE:
            return {
                ...state,
                loading: false,
                restaurants: [],
                error: action.payload
            }
        case CLEAR_RESTAURANTS:
            return {
                ...state,
                restaurants: []
            }
        default: return state;
    }

};

const initialEvents = {
    loading: false,
    events: [],
    error: ''
};

const eventsReducer = (state = initialEvents, action) => {
    switch (action.type) {
        case FETCH_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, ...action.payload.events],
                error: ''
            }
        case FETCH_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                events: [],
                error: action.payload
            }
        case CLEAR_EVENTS:
            return {
                ...state,
                events: []
            }
        default: return state;
    }

};


const initialDisplay = {
    showMedia: false,
    showVideos: false,
    showPlaces: false,
    showRestaurants: false,
    showEvents: false
};

const displayReducer = (state = initialDisplay, action) => {
    switch (action.type) {
        case SET_DISPLAY_FILTER_MEDIA:
            return {
                ...state,
                showMedia: true,
                showVideos: false,
                showPlaces: false,
                showRestaurants: false,
                showEvents: false
            }
        case SET_DISPLAY_FILTER_VIDEO:
            return {
                ...state,
                showMedia: false,
                showVideos: true,
                showPlaces: false,
                showRestaurants: false,
                showEvents: false
            }
        case SET_DISPLAY_FILTER_PLACE:
            return {
                ...state,
                showMedia: false,
                showVideos: false,
                showPlaces: true,
                showRestaurants: false,
                showEvents: false
            }
        case SET_DISPLAY_FILTER_RESTAURANT:
            return {
                ...state,
                showMedia: false,
                showVideos: false,
                showPlaces: false,
                showRestaurants: true,
                showEvents: false
            }
        case SET_DISPLAY_FILTER_EVENT:
            return {
                ...state,
                showMedia: false,
                showVideos: false,
                showPlaces: false,
                showRestaurants: false,
                showEvents: true
            }
        default: return state;
    }
};

export const mediaReducer = {
    media: mediaState,
    folders: foldersReducer,
    videos: videosReducer,
    places: placesReducer,
    restaurants: restaurantsReducer,
    events: eventsReducer,
    searchBarFilter: displayReducer
};
