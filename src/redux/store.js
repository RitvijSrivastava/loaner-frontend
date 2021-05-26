import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import persistReducer from "./rootReducer";
import { persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store); // Persisted Store

export default { store, persistor };
