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
import { Footer, Navbar, SupportPageWrapper } from '@/widgets'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { useEffect } from 'react'
import {
	Navigate,
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'

function App() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') || 'dark'
			document.documentElement.classList.add(savedTheme)
		}
	}, [])

	const ProtectedRoutesWrapper = () => {
		const { user, loading } = useAuthListener()

		if (loading) return null
		if (!user) return <Navigate to='/login' replace />

		return <Outlet />
	}

	return (
		<div className='px-2 lg:px-10 xl:px-24'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile/:slug' element={<ProfilePage />} />
					<Route path='/collections/' element={<CollectionPage />} />
					<Route path='/movies' element={<MoviesPage />} />
					<Route path='/serials' element={<SerialsPage />} />
					<Route path='/watch/:slug' element={<WatchPage />} />
					<Route path='*' element={<NotFound />} />

					<Route element={<ProtectedRoutesWrapper />}>
						<Route path='/support' element={<SupportPageWrapper />} />
					</Route>
				</Routes>
				<Footer />
			</Router>
		</div>
	)
}

export default App
