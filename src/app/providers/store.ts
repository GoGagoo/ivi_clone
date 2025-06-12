import { configureStore } from '@reduxjs/toolkit'
import { rtkQuery } from '@shared/api/rtkQuery'
import { chatApi } from '@shared/api/websocket/chatApi'

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
