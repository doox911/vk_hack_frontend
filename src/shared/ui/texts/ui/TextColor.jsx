import { Title } from '@vkontakte/vkui';
import React from 'react';

export function TextColor({ children }) {
  return (
    <Title
      level='3'
      style={{
        userSelect: 'none',
        backgroundImage: 'linear-gradient(60deg, #2196f3, #9c27b0)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </Title>
  );
}
