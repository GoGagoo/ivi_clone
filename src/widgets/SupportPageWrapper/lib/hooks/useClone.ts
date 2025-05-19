export const useClone = () => {
	return new URLSearchParams(window.location.search).get('clone') === 'true'
}