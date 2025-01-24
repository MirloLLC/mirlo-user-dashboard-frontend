import type { Meta, StoryObj } from '@storybook/react';
import PlanOption from '../components/Plans/PlanOption';

const meta = {
  title: 'Components/PlanOption',
  component: PlanOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlanOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: 5,
    minutes: 200,
    sms: 100,
    price: 199,
    features: [
      'Redes sociales ilimitadas',
      'WhatsApp ilimitado',
      'Llamadas ilimitadas a la misma compañía'
    ],
    onSelect: () => {},
  },
};

export const BestValue: Story = {
  args: {
    data: 7,
    minutes: 500,
    sms: 200,
    price: 299,
    isBestValue: true,
    features: [
      'Redes sociales ilimitadas',
      'WhatsApp ilimitado',
      'Llamadas ilimitadas a la misma compañía',
      'Roaming en USA y Canadá'
    ],
    onSelect: () => {},
  },
};

export const CurrentPlan: Story = {
  args: {
    data: 5,
    minutes: 400,
    sms: 150,
    price: 249,
    isCurrent: true,
    features: [
      'Redes sociales ilimitadas',
      'WhatsApp ilimitado',
      'Llamadas ilimitadas a la misma compañía',
      'Roaming nacional'
    ],
    onSelect: () => {},
  },
};

export const WithAIAgent: Story = {
  args: {
    data: 15,
    minutes: 1000,
    sms: 500,
    price: 499,
    hasAIAgent: true,
    features: [
      'Redes sociales ilimitadas',
      'WhatsApp ilimitado',
      'Llamadas ilimitadas a cualquier compañía',
      'Roaming en América',
      'Netflix incluido',
      'Agente Personal con 10 minutos mensuales'
    ],
    onSelect: () => {},
  },
};