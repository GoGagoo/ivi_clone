import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		onClick: { action: 'clicked' },
	},
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: {
		children: 'Primary',
		variant: 'primary',
		size: 'md',
	},
}

export const Secondary: Story = {
	args: {
		children: 'Secondary',
		variant: 'secondary',
		size: 'md',
	},
}

