import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/ui/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onCheckedChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onCheckedChange: () => {},
  },
};

export const Large: Story = {
  args: {
    checked: false,
    size: 'lg',
    onCheckedChange: () => {},
  },
};