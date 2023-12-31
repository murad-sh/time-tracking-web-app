import React from 'react';
import styles from './Features.module.scss';
import {
  ClockIcon,
  BarChart3Icon,
  FileTextIcon,
  TagIcon,
  MonitorIcon,
  MailIcon,
} from 'lucide-react';

const Features = () => {
  return (
    <section className={styles.container} id="features">
      <div className={styles.layout}>
        <div>
          <h2>Features</h2>
          <p>
            Explore a suite of powerful tools designed to enhance your
            productivity and streamline your workflow.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.card}>
            <ClockIcon />
            <h4>Track Your Activity</h4>
            <p>
              Log and monitor your daily tasks in real-time for enhanced focus
              and efficiency.
            </p>
          </div>
          <div className={styles.card}>
            <BarChart3Icon />
            <h4>Weekly Reports</h4>
            <p>
              Access insightful weekly reports for a comprehensive view of your
              progress and goals.
            </p>
          </div>
          <div className={styles.card}>
            <FileTextIcon />
            <h4>Create Projects</h4>
            <p>
              Manage your workflow efficiently by organizing tasks into
              structured projects.
            </p>
          </div>
          <div className={styles.card}>
            <MonitorIcon />
            <h4>Monitor Projects</h4>
            <p>
              Track time spent on projects for enhanced planning and effective
              management.
            </p>
          </div>
          <div className={styles.card}>
            <TagIcon />
            <h4>Custom Tags</h4>
            <p>
              Utilize customizable tags to categorize and streamline your time
              tracking and organization.
            </p>
          </div>
          <div className={styles.card}>
            <MailIcon />
            <h4>Email Summaries</h4>
            <p>
              Receive email reports with detailed time tracking statistics and
              productivity insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
