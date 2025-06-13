import moviesCover1 from './moviesCover1.webp'
import moviesCover2 from './moviesCover2.webp'
import moviesCover3 from './moviesCover3.webp'
import moviesCover4 from './moviesCover4.webp'
import moviesCover5 from './moviesCover5.webp'

const moviesCategoryCovers = {
	moviesCover1: moviesCover1,
	moviesCover2: moviesCover2,
	moviesCover3: moviesCover3,
	moviesCover4: moviesCover4,
	moviesCover5: moviesCover5,
} as const

export type moviesCategoryPosterKey = keyof typeof moviesCategoryCovers
export default moviesCategoryCovers
