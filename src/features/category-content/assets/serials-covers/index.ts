import serialsCover1 from './serialsCover1.webp'
import serialsCover2 from './serialsCover2.webp'
import serialsCover3 from './serialsCover3.webp'
import serialsCover4 from './serialsCover4.webp'
import serialsCover5 from './serialsCover5.webp'

const serialsCategoryCovers = {
	serialsCover1: serialsCover1,
	serialsCover2: serialsCover2,
	serialsCover3: serialsCover3,
	serialsCover4: serialsCover4,
	serialsCover5: serialsCover5,
} as const

export type serialsCategoryPosterKey = keyof typeof serialsCategoryCovers
export default serialsCategoryCovers
