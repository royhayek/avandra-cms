// Packages
import { combineReducers } from 'redux';

// Reducers
import userReducer from './user/slice';
import faqsReducer from './faqs/slice';
import usersReducer from './users/slice';
import tripsReducer from './trips/slice';
import articlesReducer from './articles/slice';
import messagesReducer from './messages/slice';
import interestsReducer from './interests/slice';
import travelersReducer from './traveloption/slice';
import dashboardReducer from './dashboard/slice';
import walkthroughReducer from './walkthrough/slice';
import destinationsReducer from './destinations/slice';

// Combined Reducers

export const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  trips: tripsReducer,
  faqs: faqsReducer,
  interests: interestsReducer,
  articles: articlesReducer,
  messages: messagesReducer,
  travelers: travelersReducer,
  dashboard: dashboardReducer,
  walkthrough: walkthroughReducer,
  destinations: destinationsReducer
});
