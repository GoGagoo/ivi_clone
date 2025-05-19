import {
	CollectionPage,
	Home,
	Login,
	MoviesPage,
	NotFound,
	ProfilePage,
	Register,
	SerialsPage,
	WatchPage,
} from '@/pages'
import { Footer, Navbar } from '@/widgets'
import { ProtectedRoute } from '@shared/utils/ProtectedRoute.tsx'
import { SupportPageWrapper } from '@widgets/SupportPageWrapper/SupportPageWrapper.tsx'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') || 'dark'
			document.documentElement.classList.add(savedTheme)
		}
	}, [])

	return (
		<div className='px-2 lg:px-10 xl:px-24'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/support'
						element={
							<ProtectedRoute>
								<SupportPageWrapper />
							</ProtectedRoute>
						}
					/>
					<Route path='/movies' element={<MoviesPage />} />
					<Route path='/serials' element={<SerialsPage />} />
					<Route path='/watch/:slug' element={<WatchPage />} />
					<Route path='/profile/:slug' element={<ProfilePage />} />
					<Route path='/collections/' element={<CollectionPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	)
}

export default App
