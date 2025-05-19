import React, { useState } from 'react'

interface Props {
	children: React.ReactNode
	previewContent: React.ReactNode
	expandText?: string
	collapseText?: string
}

export const ExpandableText: React.FC<Props> = ({
	children,
	previewContent,
	expandText = 'Развернуть',
  collapseText = 'Свернуть'
}) => {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<div className='mt-1'>
      <div className='text-sm md:text-xl font-normal'>
        {isExpanded ? children : previewContent}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='bg-none border-none hover:text-pink-500 dark:hover:text-[var(--primary-color)] cursor-pointer mt-3'
      >
        {isExpanded ? collapseText : expandText}
      </button>
    </div>
	)
}
