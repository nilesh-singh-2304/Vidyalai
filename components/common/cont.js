import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

export default function cont({ children }) {
  const { isSmallerDevice } = useWindowWidth();
  return (
    <div
      style={{
        width: '400px',
  margin: '10px',
  border: '2px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
      }}
    >
      
    </div>
  );
}
