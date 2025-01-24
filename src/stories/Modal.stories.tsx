import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/ui/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div>
        <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
        <p className="text-gray-600">This is a sample modal content.</p>
      </div>
    ),
  },
};

export const WithCustomWidth: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    className: 'max-w-2xl',
    children: (
      <div>
        <h2 className="text-lg font-semibold mb-4">Wide Modal</h2>
        <p className="text-gray-600">This modal has a custom width using the className prop.</p>
      </div>
    ),
  },
};