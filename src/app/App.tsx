import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {
	CategoryPage,
	Home,
	Login,
	NotFound,
	ProfilePage,
	Register,
	SupportPage,
} from '../pages'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/support' element={<SupportPage />} />
					<Route path='/support' element={<CategoryPage />} />
					<Route path='/profile/:slug' element={<ProfilePage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
