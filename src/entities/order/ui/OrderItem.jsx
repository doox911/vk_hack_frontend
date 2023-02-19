import { Button, Div, Separator, Spacing, Title } from '@vkontakte/vkui';
import React from 'react';
import { ModalNftInfo } from '../../../entities/ModalNftInfo';
import { TextColor } from '../../../shared/ui/texts';

export function OrderItem({ vkId, order, onSuccess = () => {}, onReject = () => {} }) {
  return (
    <>
      <Spacing size={5}>
        <Separator />
      </Spacing>
      <Div style={{ display: 'flex', alignItems: 'center' }}>
        <Title level='3'>
          {`Заказ ${order.id}`}
        </Title>
        <Div style={{ 'marginLeft': 'auto' }}>
          {order.is_accept
            ? (
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
            )
            : <TextColor text=''>{`Доставлено ${order.date}`}</TextColor>}
        </Div>
        <Div style={{ width: '44px', padding: 0 }}>
          <ModalNftInfo orderId={order.orderId} vkId={vkId}></ModalNftInfo>
        </Div>
      </Div>
    </>
  );
}
