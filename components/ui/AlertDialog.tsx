import React from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import styles from './AlertDialog.module.scss';

interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?(value: boolean): void;
}

const AlertDialog = ({ children, open, setOpen }: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={setOpen}>
      {children}
    </RadixAlertDialog.Root>
  );
};

export default AlertDialog;

interface AlertDialogContentProps {
  title: string;
  description?: string;
  action: string;
  onAction: () => void;
}

function AlertDialogContent({
  title,
  description,
  action,
  onAction,
}: AlertDialogContentProps) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className={styles.overlay}>
        <RadixAlertDialog.Content className={styles.content}>
          <div className={styles.container}>
            <div>
              <RadixAlertDialog.Title className={styles.title}>
                {title}
              </RadixAlertDialog.Title>
              {description && (
                <RadixAlertDialog.Description className={styles.description}>
                  {description}
                </RadixAlertDialog.Description>
              )}
            </div>
            <div className={styles.actions}>
              <RadixAlertDialog.Cancel className={styles.cancel}>
                Cancel
              </RadixAlertDialog.Cancel>
              <RadixAlertDialog.Action
                className={styles.action}
                onClick={onAction}
              >
                {action}
              </RadixAlertDialog.Action>
            </div>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Overlay>
    </RadixAlertDialog.Portal>
  );
}

AlertDialog.Button = RadixAlertDialog.Trigger;
AlertDialog.Content = AlertDialogContent;
