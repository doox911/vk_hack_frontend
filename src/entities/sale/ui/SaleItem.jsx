import { Div, Separator, Spacing, Title } from '@vkontakte/vkui';
import React from 'react';

export function SaleItem({ after, title, id }) {
  return (
    <>
      <Spacing size={5}>
        <Separator />
      </Spacing>
      <Div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Title level='3'>
          {title}
        </Title>
        {after}
      </Div>
    </>
  );
}
