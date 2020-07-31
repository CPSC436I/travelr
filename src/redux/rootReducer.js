import { mediaReducer } from './media/mediaReducer';
import { tripsReducer } from './trips/tripsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    ...mediaReducer,
    ...tripsReducer,
});

export default rootReducer;
