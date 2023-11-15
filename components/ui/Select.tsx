import React, { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import styles from './Select.module.scss';

const Select = ({ children, ...props }: RadixSelect.SelectProps) => {
  return <RadixSelect.Root {...props}>{children}</RadixSelect.Root>;
};

export default Select;

function SelectContent({
  children,
  className,
  ...props
}: RadixSelect.SelectContentProps) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.SelectContent
        className={`${styles.content} ${className}}`}
        {...props}
      >
        <RadixSelect.SelectViewport>
          <RadixSelect.ScrollUpButton />
          {children}
          <RadixSelect.ScrollDownButton />
        </RadixSelect.SelectViewport>
      </RadixSelect.SelectContent>
    </RadixSelect.Portal>
  );
}

Select.Button = RadixSelect.Trigger;
Select.Content = SelectContent;
Select.Item = RadixSelect.Item;
