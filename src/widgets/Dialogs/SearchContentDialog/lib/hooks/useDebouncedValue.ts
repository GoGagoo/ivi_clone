import { useEffect, useState } from 'react'

const DELAY_TIME = 750

export const useDebouncedValue = (value: string, delay = DELAY_TIME, ) => {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debounced
}
