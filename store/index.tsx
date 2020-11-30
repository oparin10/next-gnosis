import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { firestoreReducer } from "./reducers/firestoreReducer";
import { firebaseAuthReducer } from "./reducers/firebaseAuthReducer";

const rootReducer = combineReducers({
  auth: firestoreReducer,
  db: firebaseAuthReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;
