import React from 'react';
import * as Alert from '@radix-ui/react-alert-dialog';
import styles from './AlertDialog.module.scss';

interface AlertDialogProps {
  children: React.ReactNode;
}

const AlertDialog = ({ children }: AlertDialogProps) => {
  return <Alert.Root>{children}</Alert.Root>;
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
    <Alert.Portal>
      <Alert.Overlay className={styles.overlay}>
        <Alert.Content className={styles.content}>
          <div className={styles.container}>
            <div>
              <Alert.Title className={styles.title}>{title}</Alert.Title>
              {description && (
                <Alert.Description className={styles.description}>
                  {description}
                </Alert.Description>
              )}
            </div>
            <div className={styles.actions}>
              <Alert.Cancel className={styles.cancel}>Cancel</Alert.Cancel>
              <Alert.Action className={styles.action} onClick={onAction}>
                {action}
              </Alert.Action>
            </div>
          </div>
        </Alert.Content>
      </Alert.Overlay>
    </Alert.Portal>
  );
}

AlertDialog.Button = Alert.Trigger;
AlertDialog.Content = AlertDialogContent;
