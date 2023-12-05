import React, { createContext, useState } from 'react';

type ContextType = {
  startTime: Date | null;
  setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  projectId: string;
  setProjectId: React.Dispatch<React.SetStateAction<string>>;
};

export const TimeTrackContext = createContext<ContextType | null>(null);

export const TimeTrackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [projectId, setProjectId] = useState('');

  return (
    <TimeTrackContext.Provider
      value={{
        startTime,
        setStartTime,
        title,
        setTitle,
        tag,
        setTag,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </TimeTrackContext.Provider>
  );
};
