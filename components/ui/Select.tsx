import React, { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import styles from './Select.module.scss';

const Select = ({
  children,
  value,
  setValue,
}: {
  children: React.ReactNode;
  value: string;
  setValue: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <RadixSelect.Root
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={setValue}
    >
      {children}
    </RadixSelect.Root>
  );
};

export default Select;

function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.SelectContent>{children}</RadixSelect.SelectContent>
    </RadixSelect.Portal>
  );
}

Select.Button = RadixSelect.Trigger;
Select.Content = SelectContent;
Select.Item = RadixSelect.Item;
