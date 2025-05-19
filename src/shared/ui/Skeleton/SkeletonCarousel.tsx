export const SkeletonCarousel = () => (
	<div className='relative w-full max-w-full mx-auto overflow-x-visible mt-5'>
  <div className='relative flex items-center justify-center h-[500px]'>
    <div className='relative w-full h-full flex items-center justify-center'>
      <div className='absolute -left-24 z-20 w-[25%] h-[90%] -translate-x-1/4 overflow-hidden rounded-[32px] shadow-lg bg-gray-700 animate-pulse'>
        <div className='w-full h-full bg-gray-600' />
      </div>

      <div className='absolute left-[11.5%] z-40 p-2 transform -translate-y-1/2 rounded-full top-1/2 bg-gray-600 animate-pulse'>
        <div className='w-8 h-8' />
      </div>

      <div className='absolute left-1/2 z-30 w-[70%] h-[90%] -translate-x-1/2 overflow-hidden rounded-[32px] block select-none bg-gray-700 animate-pulse'>
        <div className='w-full h-full bg-gray-600' />
        <div className='absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent'>
          <div className='max-w-[300px] mb-4 h-20 bg-gray-500 rounded-xl' />
          <div className='h-4 mt-2 bg-gray-500 rounded w-3/4' />
          <div className='h-4 mt-2 bg-gray-500 rounded w-1/2' />
          <div className='flex gap-4 mt-4'>
            <div className='w-24 h-10 bg-gray-500 rounded-xl' />
          </div>
        </div>
      </div>

      <div className='absolute right-[11.25%] z-40 p-2 transform -translate-y-1/2 rounded-full top-1/2 bg-gray-600 animate-pulse'>
        <div className='w-8 h-8' />
      </div>

      <div className='absolute -right-[265px] z-20 w-[25%] h-[90%] -translate-x-1/4 overflow-hidden rounded-[32px] shadow-lg bg-gray-700 animate-pulse'>
        <div className='w-full h-full bg-gray-600' />
      </div>
    </div>
  </div>
</div>
)

