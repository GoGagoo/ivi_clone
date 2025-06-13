export const SkeletonWatch = () => (
	<div className='pt-14 font-bold flex flex-row'>
		<div className='basis-1/3'>
			<div className='flex animate-pulse'>
				<div className='h-6 w-20 bg-gray-600 rounded mr-1'></div>
				<span className='mx-1 text-gray-400'>/</span>
				<div className='h-6 w-24 bg-gray-600 rounded mr-1'></div>
				<span className='mx-1'>/</span>
				<div className='h-6 w-32 bg-gray-500 rounded'></div>
			</div>

			<div className='mt-24 space-y-4'>
				<div className='w-40 h-16 bg-gray-600 rounded animate-pulse'></div>
				<div className='flex gap-4'>
					<div className='h-5 w-8 bg-gray-600 rounded'></div>
					<div className='h-5 w-12 bg-gray-600 rounded'></div>
					<div className='h-5 w-8 bg-gray-600 rounded'></div>
				</div>
				<div className='flex gap-2'>
					{[...Array(3)].map((_, i) => (
						<div key={i} className='h-6 w-16 bg-gray-600 rounded-full'></div>
					))}
				</div>
				<div className='space-y-2'>
					<div className='h-4 w-full bg-gray-600 rounded'></div>
					<div className='h-4 w-4/5 bg-gray-600 rounded'></div>
					<div className='h-4 w-3/4 bg-gray-600 rounded'></div>
					<div className='h-4 w-2/3 bg-gray-600 rounded'></div>
				</div>
				<div className='h-12 w-48 bg-gray-600 rounded-2xl animate-pulse'></div>
				<div className='h-3 w-36 bg-gray-600 rounded'></div>
			</div>
		</div>

		<div className='basis-4/4 ml-10 relative overflow-hidden rounded-3xl bg-gray-700'>
			<div className='w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-gradient-shift'></div>
		</div>
	</div>
)

