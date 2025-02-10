import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import workspaceReducer from './workspaceReducer'
import formReducer from './formReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  form: formReducer,
});

export default rootReducer;