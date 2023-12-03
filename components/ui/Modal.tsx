import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import styles from './Modal.module.scss';
import { XIcon } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  );
};

export default Modal;

interface ModalContentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function ModalContent({
  title,
  description,
  children,
  className,
}: ModalContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={styles.overlay}>
        <RadixDialog.Content className={`${styles.content} ${className}`}>
          <div className={styles.container}>
            <RadixDialog.Title className={styles.title}>
              {title}
            </RadixDialog.Title>
            <RadixDialog.Close asChild>
              <button className={styles.close} aria-label="Close">
                <XIcon />
              </button>
            </RadixDialog.Close>
          </div>
          {description && (
            <RadixDialog.Description className={styles.description}>
              {description}
            </RadixDialog.Description>
          )}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Overlay>
    </RadixDialog.Portal>
  );
}

Modal.Button = RadixDialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = RadixDialog.Close;
