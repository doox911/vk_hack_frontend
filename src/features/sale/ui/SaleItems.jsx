import { Button, Div, NativeSelect } from '@vkontakte/vkui';
import React, { useState } from 'react';
import { SaleItem } from '../../../entities/sale';
import { TextColor } from '../../../shared/ui/texts';

export function SaleItems({ deliveries, sales = [], onSuccess = () => {}, onReject = () => {} }) {
  const [select, setSelect] = useState(deliveries[0]?.vkId || 7294430);

  return (
    <>
      {sales.map((s, i) => (
        <SaleItem
          key={i}
          title={`Продажа ${s.id}`}
          id={s.vkId}
          deliveries={deliveries}
          onSuccess={id => openDeletion(true, id)}
          onReject={id => openDeletion(false, id)}
          after={s.is_created
            ? (
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <NativeSelect
                  key={`n${i}`}
                  style={{ marginRight: '0.5em' }}
                  value={select}
                  defaultValue={select}
                  onChange={e => setSelect(+e.target.value)}
                >
                  {deliveries.map((deliver, j) => <option key={j} value={deliver.vkId}>{deliver.name}</option>)}
                </NativeSelect>
                <Button
                  mode='tertiary'
                  style={{ color: 'green' }}
                  onClick={() => onSuccess(s.id, select)}
                  size='l'
                >
                  Применить
                </Button>
              </Div>
            )
            : (
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <TextColor>{`Доставлено ${s.date}`}</TextColor>
              </Div>
            )}
        />
      ))}
    </>
  );
}
