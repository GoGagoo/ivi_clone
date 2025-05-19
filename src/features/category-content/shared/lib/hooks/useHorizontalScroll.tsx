import { useCallback, useEffect, useRef, useState } from 'react'

export const useHorizontalScroll = () => {
	const [showLeft, setShowLeft] = useState(false)
	const [showRight, setShowRight] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)

	const checkScroll = useCallback(() => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
			setShowLeft(scrollLeft > 0)
			setShowRight(scrollLeft < scrollWidth - clientWidth)
		}
	}, [])

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const scrollAmount = direction === 'left' ? -950 : 950
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })

			setTimeout(checkScroll, 300)
		}
	}

	useEffect(() => {
		const currentRef = scrollRef.current
		currentRef?.addEventListener('scroll', checkScroll)

		return () => {
			currentRef?.removeEventListener('scroll', checkScroll)
		}
	}, [checkScroll])

	return { scrollRef, showLeft, showRight, scroll, checkScroll }
}
