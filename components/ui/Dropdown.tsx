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

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content className={styles.content}>
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

Dropdown.Button = RadixDropdownMenu.Trigger;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = RadixDropdownMenu.Item;