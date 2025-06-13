import { useEffect, useState } from 'react'

export const useCarousel = (
	images: string[] = [],
	autoSlide = true,
	autoSlideInterval = 15000
) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
	}

	const goToPrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		)
	}

	useEffect(() => {
		if (autoSlide && images.length > 1) {
			const slideInterval = setInterval(() => {
				goToNext()
			}, autoSlideInterval)
			return () => clearInterval(slideInterval)
		}
	}, [autoSlide, autoSlideInterval, images.length, currentIndex])

	const prevIndex = (currentIndex - 1 + images.length) % images.length
	const nextIndex = (currentIndex + 1) % images.length

	return {
		currentIndex,
		prevIndex,
		nextIndex,
		goToNext,
		goToPrev,
	}
}
