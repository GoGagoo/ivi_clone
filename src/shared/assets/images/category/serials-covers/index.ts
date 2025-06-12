import serialsCover1 from '@features/category-content/assets/serials-covers/serialsCover1.webp'
import serialsCover2 from '@features/category-content/assets/serials-covers/serialsCover2.webp'
import serialsCover3 from '@features/category-content/assets/serials-covers/serialsCover3.webp'
import serialsCover4 from '@features/category-content/assets/serials-covers/serialsCover4.webp'
import serialsCover5 from '@features/category-content/assets/serials-covers/serialsCover5.webp'

export const serialsCategoryCovers = {
  serialsCover1: serialsCover1,
  serialsCover2: serialsCover2,
  serialsCover3: serialsCover3,
  serialsCover4: serialsCover4,
  serialsCover5: serialsCover5,
} as const

export type serialsCategoryPosterKey = keyof typeof serialsCategoryCovers 