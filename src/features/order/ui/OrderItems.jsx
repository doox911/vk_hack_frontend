import { Alert, Panel, SplitLayout, View } from '@vkontakte/vkui';
import React, { useState } from 'react';
import { OrderItem } from '../../../entities/order';

export function OrderItems({ orders = [], onSuccess = () => {}, onReject = () => {} }) {
  const [popout, setPopout] = useState(null);

  const closePopout = () => {
    setPopout(null);
  };

  const openDeletion = (is_success, id) => {
    setPopout(
      <Alert
        actions={[
          {
            title: 'Отмена',
            autoClose: true,
            mode: 'cancel',
            action: () => {},
          },
          {
            title: 'Подтвердить',
            autoClose: true,
            mode: 'destructive',
            action: () => is_success ? onSuccess(id) : onReject(id),
          },
        ]}
        actionsLayout='horizontal'
        onClose={closePopout}
        header='Подтвердите действие'
        text={`${
          is_success
            ? 'Вы уверены, что услуга оказана в полном объеме?'
            : 'Вы уверены, что услуга не может быть оказана в полном объёме?'
        }`}
      />,
    );
  };

  return (
    <SplitLayout popout={popout}>
      <View activePanel='alert'>
        <Panel id='alert'>
          {orders.map((o, i) => (
            <OrderItem
              key={i}
              order={o}
              onSuccess={() => openDeletion(true, o.id)}
              onReject={() => openDeletion(false, o.id)}
            />
          ))}
        </Panel>
      </View>
    </SplitLayout>
  );
}
