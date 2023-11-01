import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export default Modal;

interface ModalContentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function ModalContent({ title, description, children }: ModalContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content className={styles.content}>
          <div className={styles.container}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.close} aria-label="Close">
                <Cross1Icon />
              </button>
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
