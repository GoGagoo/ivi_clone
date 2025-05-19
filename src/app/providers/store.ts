import { chatApi } from '@entities/api/websocket/chatApi'
import { rtkQuery } from '@entities/api/rtkQuery'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [rtkQuery.reducerPath]: rtkQuery.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkQuery.middleware)
      .concat(chatApi.middleware), 
})

export type RootState = ReturnType<typeof store.getState>
export default store
