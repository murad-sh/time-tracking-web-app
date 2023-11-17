import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import styles from './Select.module.scss';

import { CheckIcon } from 'lucide-react';

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
          <RadixSelect.Group>{children}</RadixSelect.Group>
        </RadixSelect.SelectViewport>
      </RadixSelect.SelectContent>
    </RadixSelect.Portal>
  );
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixSelect.Item
    className={`${styles.item} ${className}`}
    ref={forwardedRef}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator className={styles.item__icon}>
      <CheckIcon />
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
));

SelectItem.displayName = RadixSelect.Item.displayName;

Select.Button = RadixSelect.Trigger;
Select.Content = SelectContent;
Select.Value = RadixSelect.Value;
Select.Item = SelectItem;
Select.Label = RadixSelect.Label;
Select.Separator = RadixSelect.Separator;
