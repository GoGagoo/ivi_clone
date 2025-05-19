import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
	title: 'UI/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			options: ['primary', 'search'],
			control: { type: 'radio' },
		},
		icon: {
			options: ['search', 'user'],
			control: { type: 'radio' },
		},
		placeholder: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
}
export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {
	args: {
		variant: 'primary',
		label: 'Введите номер телефона',
		icon: 'user',
	},
}

export const Search: Story = {
	args: {
		variant: 'search',
		label: 'Поиск фильмов, сериалов...',
		icon: 'search',
	},
}
