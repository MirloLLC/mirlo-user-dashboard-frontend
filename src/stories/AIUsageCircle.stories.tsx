import type { Meta, StoryObj } from '@storybook/react';
import AIUsageCircle from '../components/Lines/AIUsageCircle';

const meta = {
  title: 'Components/AIUsageCircle',
  component: AIUsageCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AIUsageCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    used: 3,
    total: 10,
  },
};

export const HighUsage: Story = {
  args: {
    used: 8,
    total: 10,
  },
};

export const LowUsage: Story = {
  args: {
    used: 1,
    total: 10,
  },
};