import React, { createContext, FC, useState } from 'react';

type JoinedProps = {
  isJoined: boolean;
  onJoined: (bool: boolean) => void;
};

export const JoinedContext = createContext<JoinedProps>({
  isJoined: false,
  onJoined: (bool: boolean) => {},
});

export const JoinedProvider: FC = ({ children }) => {
  const [isJoined, setIsJoined] = useState<boolean>(false);

  const onJoined = (bool: boolean) => {
    setIsJoined(bool);
  };

  return (
    <JoinedContext.Provider value={{ isJoined, onJoined }}>
      {children}
    </JoinedContext.Provider>
  );
};
