import type { Meta, StoryObj } from '@storybook/react';
import { 
  Button,
  Card,
  Input,
  Select,
  Switch,
  Badge,
  Avatar,
  Tooltip,
  Alert,
  Modal,
  Tabs,
  Accordion,
  Breadcrumb,
  Pagination,
  ProgressBar,
  Spinner,
  Tag,
  Toggle,
  Drawer,
  Dropdown,
  Menu,
  Notification,
  Popover,
  Skeleton,
  Stepper,
  Table,
  Timeline,
  Toast,
  Tree
} from 'mirlo-ui-components';

// Button Stories
export default {
  title: 'Mirlo UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Card Stories
export default {
  title: 'Mirlo UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Card>;

export const Default: StoryObj<typeof Card> = {
  args: {
    title: 'Card Title',
    children: 'Card content goes here',
  },
};

// Input Stories
export default {
  title: 'Mirlo UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Input>;

export const Text: StoryObj<typeof Input> = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

// Select Stories
export default {
  title: 'Mirlo UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Select>;

export const Basic: StoryObj<typeof Select> = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
};

// Switch Stories
export default {
  title: 'Mirlo UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Switch>;

export const DefaultSwitch: StoryObj<typeof Switch> = {
  args: {
    checked: false,
  },
};

// Badge Stories
export default {
  title: 'Mirlo UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Badge>;

export const DefaultBadge: StoryObj<typeof Badge> = {
  args: {
    content: '99+',
    variant: 'primary',
  },
};

// Avatar Stories
export default {
  title: 'Mirlo UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Avatar>;

export const DefaultAvatar: StoryObj<typeof Avatar> = {
  args: {
    src: 'https://example.com/avatar.jpg',
    alt: 'User Avatar',
  },
};

// Tooltip Stories
export default {
  title: 'Mirlo UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Tooltip>;

export const DefaultTooltip: StoryObj<typeof Tooltip> = {
  args: {
    content: 'Tooltip content',
    children: <button>Hover me</button>,
  },
};

// Alert Stories
export default {
  title: 'Mirlo UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Alert>;

export const Success: StoryObj<typeof Alert> = {
  args: {
    type: 'success',
    message: 'Operation completed successfully',
  },
};

// Modal Stories
export default {
  title: 'Mirlo UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Modal>;

export const DefaultModal: StoryObj<typeof Modal> = {
  args: {
    isOpen: true,
    title: 'Modal Title',
    children: 'Modal content goes here',
  },
};

// Continue with other components following the same pattern...