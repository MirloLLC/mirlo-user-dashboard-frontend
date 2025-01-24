import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'This is a subtitle that provides additional context',
  },
};