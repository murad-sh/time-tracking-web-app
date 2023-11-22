import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const dummyData = [
  {
    title: 'test dummy data',
    start: '2023-11-05T00:00:00',
    end: '2023-11-05T03:54:00',
  },
  {
    title: 'test dummy data',
    start: '2023-11-06T00:00:00',
    end: '2023-11-06T03:41:00',
  },
  {
    title: 'test dummy data',
    start: '2023-11-07T00:00:00',
    end: '2023-11-07T01:53:00',
  },
  {
    title: 'test dummy data',
    start: '2023-11-08T00:00:00',
    end: '2023-11-08T07:36:00',
  },
  {
    title: 'test dummy data',
    start: '2023-11-09T00:00:00',
    end: '2023-11-09T01:11:00',
  },
  {
    title: 'test dummy data',
    start: '2023-11-10T00:00:00',
    end: '2023-11-10T01:50:00',
  },
  {
    title: 'test dummy data',
    start: '2023-11-11T00:00:00',
    end: '2023-11-11T01:30:00',
  },
];

const SendDummyDataButton = () => {
  const sendDummyData = async () => {
    try {
      for (const data of dummyData) {
        await axios.post('/api/user/time-tracks/', data);
      }
      toast.success('Successfully added all dummy data!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add dummy data!');
    }
  };

  return <button onClick={sendDummyData}>Send Dummy Data</button>;
};

export default SendDummyDataButton;
