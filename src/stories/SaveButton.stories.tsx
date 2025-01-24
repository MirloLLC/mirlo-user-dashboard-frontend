import type { Meta, StoryObj } from '@storybook/react';
import SaveButton from '../components/ui/SaveButton';

const meta = {
  title: 'Components/SaveButton',
  component: SaveButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SaveButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasChanges: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    hasChanges: true,
  },
};

export const Disabled: Story = {
  args: {
    hasChanges: false,
  },
};