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
    FETCH_PLACES_FAILURE
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
                ...action.payload,
                error: ''
            }
        case FETCH_MEDIA_FAILURE:
            return {
                ...state,
                loading: false,
                results: [],
                error: action.payload
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
                    if (tag.type === "search")
                        filters.add(tag.title);
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
    error: ''
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
                ...action.payload,
                error: ''
            }
        case FETCH_VIDEOS_FAILURE:
            return {
                ...state,
                loading: false,
                ids: [],
                error: action.payload
            }
        default: return state;
    }

};

const initialPlaces = {
    loading: false,
    places: [],
    error: ''
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
                ...action.payload,
                error: ''
            }
        case FETCH_PLACES_FAILURE:
            return {
                ...state,
                loading: false,
                places: [],
                error: action.payload
            }
        default: return state;
    }

};

export const mediaReducer = {
    media: mediaState,
    folders: foldersReducer,
    videos: videosReducer,
    places: placesReducer
};
