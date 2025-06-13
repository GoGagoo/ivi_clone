import { Select } from '@shared/uikit'
import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { AiOutlineSun } from 'react-icons/ai'
import { BsMoonStars } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'

const themes = [
	{ id: 'light', name: 'Светлый', icon: <AiOutlineSun className='w-4 h-4' /> },
	{ id: 'dark', name: 'Тёмный', icon: <BsMoonStars className='w-4 h-4' /> },
	{ id: 'system', name: 'Системный', icon: <FiMonitor className='w-4 h-4' /> },
]

export const ThemeToggler = () => {
	const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme
      ? themes.find(t => t.id === savedTheme) || themes[1]
      : themes[2]
  })

	useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    
    root.classList.remove('light', 'dark')

    if (selectedTheme.id === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light'
      root.classList.add(systemTheme)
      localStorage.setItem('theme', 'system')
    } else {
      root.classList.add(selectedTheme.id)
      localStorage.setItem('theme', selectedTheme.id)
    }
  }, [selectedTheme])

	return (
		<Select
			options={themes}
			value={selectedTheme}
			onChange={(value) => setSelectedTheme(value ?? themes[2])}
			withSearch={false}
		>
			<Combobox.Button className='flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg dark:bg-[var(--primary-bg-color)] text-white hover:bg-[var(--primary-color)] bg-[var(--primary-bg-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors cursor-pointer min-w-[40px] xl:min-w-[140px]'>
				{selectedTheme.id === 'light' ? (
					<AiOutlineSun className='w-4 h-4 max-w-14 md:max-w-none' />
				) : selectedTheme.id === 'dark' ? (
					<BsMoonStars className='w-4 h-4 max-w-14 md:max-w-none' />
				) : (
					<FiMonitor className='w-4 h-4 max-w-14 md:max-w-none' />
				)}
				<span className="hidden xl:inline">{selectedTheme.name}</span>
			</Combobox.Button>
		</Select>
	)
}
