import type { Meta, StoryObj } from '@storybook/react';
import UsageCircle from '../components/Lines/UsageCircle';

const meta = {
  title: 'Components/UsageCircle',
  component: UsageCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UsageCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Data: Story = {
  args: {
    title: 'Datos',
    used: 2.5,
    total: 5,
    unit: 'GB',
  },
};

export const Minutes: Story = {
  args: {
    title: 'Minutos',
    used: 30,
    total: 100,
    unit: 'min',
  },
};

export const SMS: Story = {
  args: {
    title: 'SMS',
    used: 50,
    total: 100,
    unit: 'SMS',
  },
};