export const SkeletonCategories = () => {
	return (
		<div className='relative'>
  {/* Скелетон первого блока (категории) */}
  <div className='mb-10'>
    <div className='h-8 w-56 bg-gray-600 rounded-full animate-pulse mb-4'></div>
    <div className='relative flex items-center'>
      <div className='absolute -left-10 z-10 h-8 w-8 bg-gray-600 rounded-full animate-pulse'></div>
      <div className='flex gap-2.5 overflow-x-auto px-4 py-2 scrollbar-hide w-full'>
        {[...Array(8)].map((_, i) => (
          <div key={`cat-${i}`} className='flex-shrink-0 w-32 h-48 bg-gray-700 rounded-lg animate-pulse'></div>
        ))}
      </div>
      <div className='absolute -right-10 z-10 h-8 w-8 bg-gray-600 rounded-full animate-pulse'></div>
    </div>
  </div>

  {/* Скелетон второго блока (другой тип) */}
  <div>
    <div className='h-8 w-56 bg-gray-600 rounded-full animate-pulse mb-4'></div>
    <div className='relative flex items-center'>
      <div className='absolute -left-10 z-10 h-8 w-8 bg-gray-600 rounded-full animate-pulse'></div>
      <div className='flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide w-full'>
        {[...Array(6)].map((_, i) => (
          <div key={`item-${i}`} className='flex-shrink-0 w-56 h-80 bg-gray-700 rounded-lg animate-pulse relative'>
            <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent'>
              <div className='h-4 w-3/4 bg-gray-600 rounded mb-2'></div>
              <div className='h-3 w-1/2 bg-gray-600 rounded'></div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute -right-10 z-10 h-8 w-8 bg-gray-600 rounded-full animate-pulse'></div>
    </div>
  </div>
</div>
	)
}
