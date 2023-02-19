import { Alert, Panel, SplitLayout, View } from '@vkontakte/vkui';
import React, { useState } from 'react';
import { DeliveryItem } from '../../../entities/delivery';

export function DeliveryItems({ deliveries = [], onSuccess = () => {}, onReject = () => {} }) {
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
          is_success ? 'Вы уверены, что хотите доставить заказ?' : 'Вы уверены, что НЕ хотите доставить заказ?'
        }`}
      />,
    );
  };

  return (
    <SplitLayout popout={popout}>
      <View activePanel='alert'>
        <Panel id='alert'>
          {deliveries.map((d, i) => (
            <DeliveryItem
              key={i}
              delivery={d}
              onSuccess={() => openDeletion(true, d.id)}
              onReject={() => openDeletion(false, d.id)}
            />
          ))}
        </Panel>
      </View>
    </SplitLayout>
  );
}
