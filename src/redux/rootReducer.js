import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth.reducer";
import dashboardReducer from "./dashboard/dashboard.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dashboard"], // Reducers that must be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default persistReducer(persistConfig, rootReducer); // With persisted reducers
