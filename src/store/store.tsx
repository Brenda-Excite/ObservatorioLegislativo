import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { assingnCommissionReducer } from "../reducers/assignCommissionsReducer";
import { commissionsReducer } from "../reducers/commissionReducer";
import { dataSelectsReducer } from "../reducers/dataSelectsReducer";
import { districtReducer } from "../reducers/districtReducer";
import { GlobalSettingsReducer } from "../reducers/globalSettingsReducer";
import { legislatureReducer } from "../reducers/legislatureReducer";
import { politicalPartieReducer } from "../reducers/politicalPartiesReducer";
import PoliticiansReducer from "../reducers/politiciansReducer";
import { RankingReducer } from "../reducers/rankingReducer";
import { uiReducer } from "../reducers/uiReducer";
import { userReducer } from "../reducers/userReducer";
import permissionsReducer from "../reducers/permissions";
import rolesReducer from "../reducers/roles";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  legislature: legislatureReducer,
  assignCommission: assingnCommissionReducer,
  commission: commissionsReducer,
  political: politicalPartieReducer,
  district: districtReducer,
  dataSelects: dataSelectsReducer,
  politicians: PoliticiansReducer,
  global_settings: GlobalSettingsReducer,
  ranking: RankingReducer,
  user: userReducer,
  permission: permissionsReducer,
  role: rolesReducer,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export type AppState = ReturnType<typeof reducers>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
