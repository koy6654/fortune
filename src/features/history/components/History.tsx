import { useFortuneUserHistory } from 'features/services/mutations';
import React, { useEffect } from 'react';

export const History = () => {
  const { mutate, isError, error, data } = useFortuneUserHistory();

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          console.log('Mutation successful', data);
        },
        onError: (error) => {
          console.log('Mutation failed', error);
        },
      }
    );
  }, [mutate]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      {isError && <p>Error: {error?.message}</p>}

      <h4>Fortune Log</h4>

      {data && (
        <>
          <p>Data loaded!</p>
          <p>{data.startDate}</p>
          {data.fortuneMessages.map((message) => (
            <div key={`fortune-message-id-${message.id}`}>
              <p>{message.id}</p>
              <p>{message.default_message}</p>
              <p>{message.message}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
