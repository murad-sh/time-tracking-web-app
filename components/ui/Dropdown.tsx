import React, { useState } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import styles from './Dropdown.module.scss';

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
      {children}
    </RadixDropdownMenu.Root>
  );
};

export default Dropdown;

function DropdownMenu({
  children,
  className,
  ...props
}: RadixDropdownMenu.MenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={`${styles.content} ${className}`}
        {...props}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

Dropdown.Button = RadixDropdownMenu.Trigger;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = RadixDropdownMenu.Item;
Dropdown.Separator = RadixDropdownMenu.Separator;
Dropdown.Label = RadixDropdownMenu.Label;
