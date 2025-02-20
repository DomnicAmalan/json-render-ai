import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './reducers';
import rootSaga from './sagas';
import { configureStore } from '@reduxjs/toolkit';


const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

export default store