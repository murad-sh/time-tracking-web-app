import React from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = (props: ErrorProps) => {
  return (
    <div>
      <h1>{props.error.message}</h1>
      <button onClick={props.reset}>Try again</button>
    </div>
  );
};

export default Error;
