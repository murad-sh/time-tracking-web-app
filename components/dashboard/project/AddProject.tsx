import React, { FormEvent, useRef } from 'react';

const AddProject = () => {
  const projectTitleRef = useRef<HTMLInputElement>(null);

  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    const title = projectTitleRef.current?.value;
    const res = await fetch('/api/user/create-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
      }),
    });
  }

  return (
    <div>
      <h1>AddProject</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="project"></label>
        <input
          id="project"
          type="text"
          placeholder="Project Name"
          ref={projectTitleRef}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProject;
