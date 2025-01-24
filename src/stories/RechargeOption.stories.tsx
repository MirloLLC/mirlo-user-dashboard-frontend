import type { Meta, StoryObj } from '@storybook/react';
import RechargeOption from '../components/Recharge/RechargeOption';

const meta = {
  title: 'Components/RechargeOption',
  component: RechargeOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RechargeOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: 2,
    days: 7,
    minutes: 100,
    sms: 50,
    price: 79,
    color: '#339999',
    onSelect: () => {},
  },
};

export const BestValue: Story = {
  args: {
    data: 5,
    days: 15,
    minutes: 200,
    sms: 100,
    price: 199,
    color: '#FF5C1C',
    isBestValue: true,
    savings: 15,
    onSelect: () => {},
  },
};

export const Selected: Story = {
  args: {
    data: 3,
    days: 7,
    minutes: 150,
    sms: 75,
    price: 99,
    color: '#4B5563',
    selected: true,
    onSelect: () => {},
  },
};