import { Button, Div, Separator, Spacing, Title } from '@vkontakte/vkui';
import React from 'react';
import { TextColor } from '../../../shared/ui/texts';

export function DeliveryItem({ delivery, onSuccess = () => {}, onReject = () => {} }) {
  return (
    <>
      <Spacing size={5}>
        <Separator />
      </Spacing>
      <Div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Title level='3'>
          {`Доставка ${delivery.id}`}
        </Title>
        {delivery.is_accept
          ? <TextColor>{`Отдал ${delivery.date}`}</TextColor>
          : (
            <Div style={{ padding: '0' }}>
              <Button
                mode='tertiary'
                style={{ color: 'green' }}
                size='l'
                onClick={() => onSuccess()}
              >
                Принять
              </Button>
              <Button
                mode='tertiary'
                style={{ color: 'red' }}
                size='l'
                onClick={() => onReject()}
              >
                Отклонить
              </Button>
            </Div>
          )}
      </Div>
    </>
  );
}
