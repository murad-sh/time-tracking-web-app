import React from 'react';
import { User } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import styles from './UserNav.module.scss';

const UserNav = ({
  username,
  email,
  action,
}: {
  username: string;
  email: string;
  action: () => void;
}) => {
  return (
    <Dropdown>
      <Dropdown.Button className={styles.btn} aria-label="Profile">
        <User />
      </Dropdown.Button>
      <Dropdown.Menu
        className={styles.menu}
        align="end"
        forceMount
        sideOffset={3}
      >
        <Dropdown.Label className={styles.label}>
          <div className={styles.content}>
            <p className={styles.username}>{username}</p>
            <p className={styles.email}>{email}</p>
          </div>
        </Dropdown.Label>
        <Dropdown.Separator className={styles.separator} />
        <Dropdown.MenuItem className={styles.item} onClick={action}>
          Log out
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserNav;
