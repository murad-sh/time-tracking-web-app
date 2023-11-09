// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   timeTrackSchema,
//   TimeTrackSchemaType,
// } from '@/lib/validations/time-track';
// import { toast } from 'sonner';

// const TimeTrackForm = () => {
//   const [btnStop, setBtnStop] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>();
//   // const titleRef = useRef<HTMLInputElement>(null);
//   const [timer, setTimer] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<TimeTrackSchemaType>({
//     resolver: zodResolver(timeTrackSchema),
//     mode: 'all',
//   });

//   function startTimer() {
//     setStartTime(new Date());
//     setBtnStop(true);
//     // setTimer(true);
//   }

//   // TODO: move this function to lib folder
//   async function sendTrack(event: FormEvent) {
//     event.preventDefault();
//     const endDate = new Date();
//     setTimer(false);
//     const res = await fetch('/api/time-tracks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title: titleRef.current!.value,
//         start: startTime,
//         end: endDate,
//       }),
//     });
//     setBtnStop(false);

//     if (res.ok) {
//       toast.success('Successfully added!');
//     } else {
//       toast.error('Failed to add!');
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={sendTrack}>
//         <input
//           name="title"
//           type="text"
//           placeholder="title"
//           ref={titleRef}
//         ></input>

//         {!btnStop && (
//           <button onClick={startTimer} type="button">
//             {'Start'}
//           </button>
//         )}
//         {btnStop && <button type="submit">Stop</button>}
//       </form>
//     </div>
//   );
// };

// export default TimeTrackForm;
