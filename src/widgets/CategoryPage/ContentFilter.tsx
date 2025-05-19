import { Combobox } from '@headlessui/react'
import { Button, Select } from '@shared/uikit'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import selectJson from './constants/select.json' assert { type: 'json' }

const countries = selectJson.countries
const genres = selectJson.genres
const years = selectJson.years

const defaultCountry = { id: '', name: 'Все страны' }
const defaultYear = { id: '', name: 'Все годы' }
const defaultGenre = { id: '', name: 'Все жанры' }

export const ContentFilter = () => {
	const [selectedCountry, setSelectedCountry] = useState(defaultCountry)
	const [selectedYear, setSelectedYear] = useState(defaultYear)
	const [selectedGenre, setSelectedGenre] = useState(defaultGenre)

	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	useEffect(() => {
		const countryParam = searchParams.get('country')
		const yearParam = searchParams.get('year')
		const genreParam = searchParams.get('genre')

		if (countryParam) {
			const found = countries.find((c) => c.id === countryParam)
			if (found) setSelectedCountry(found)
		}

		if (yearParam) {
			const found = years.find((y) => y.id === yearParam)
			if (found) setSelectedYear(found)
		}

		if (genreParam) {
			const found = genres.find((g) => g.id === genreParam)
			if (found) setSelectedGenre(found)
			}
	}, [searchParams])

	const handleFilterContent = () => {
		const query = new URLSearchParams()

		if (selectedCountry.id) query.set('country', selectedCountry.id)
		if (selectedYear.id) query.set('year', selectedYear.id)
		if (selectedGenre.id) query.set('genre', selectedGenre.id)

		navigate(`/collections?${query.toString()}`)
	}

	const handleResetFilters = () => {
		setSelectedCountry({ id: '', name: 'Все страны' })
		setSelectedYear({ id: '', name: 'Все годы' })
		setSelectedGenre({ id: '', name: 'Все жанры' })
	}

	return (
    <div className='flex flex-col sm:flex-row items-center gap-4 mt-5 sm:mt-10  w-auto sm:w-3/4 rounded-2xl sm:rounded-[28px] p-3 sm:p-4'>
      <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
        <Select
          withSearch={false}
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          className="w-full sm:w-auto"
        >
          <Combobox.Button className='flex border items-center justify-between gap-2 px-3 py-2 text-sm font-bold rounded-lg dark:bg-[var(--primary-bg-color)] text-white hover:bg-[var(--primary-color)] bg-[var(--primary-bg-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors cursor-pointer w-full sm:w-[140px]'>
            <span className="truncate">{selectedCountry.name}</span>
          </Combobox.Button>
        </Select>
        
        <Select
          withSearch={false}
          options={years}
          value={selectedYear}
          onChange={setSelectedYear}
          className="w-full sm:w-auto"
        >
          <Combobox.Button className='flex border items-center justify-between gap-2 px-3 py-2 text-sm font-bold rounded-lg dark:bg-[var(--primary-bg-color)] text-white hover:bg-[var(--primary-color)] bg-[var(--primary-bg-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors cursor-pointer w-full sm:w-[140px]'>
            <span className="truncate">{selectedYear.name}</span>
          </Combobox.Button>
        </Select>

        <Select
          options={genres}
          withSearch={false}
          value={selectedGenre}
          onChange={setSelectedGenre}
          className="w-full sm:w-auto"
        >
          <Combobox.Button className='flex border items-center justify-between gap-2 px-3 py-2 text-sm font-bold rounded-lg dark:bg-[var(--primary-bg-color)] text-white hover:bg-[var(--primary-color)] bg-[var(--primary-bg-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors cursor-pointer w-full sm:w-[140px]'>
            <span className="truncate">{selectedGenre.name}</span>
          </Combobox.Button>
        </Select>
      </div>
      
      <div className='flex flex-row sm:flex-row gap-3 w-full sm:w-auto'>
        <Button
          onClick={handleFilterContent}
          className='border hover:bg-[var(--bg-color)] rounded-xl flex-1 sm:flex-none px-4 py-2'
        >
          Найти
        </Button>
        <Button
          onClick={handleResetFilters}
          className='border hover:bg-[var(--bg-color)] rounded-xl flex-1 sm:flex-none px-4 py-2'
        >
          Сбросить
        </Button>
      </div>
    </div>
  )
}
