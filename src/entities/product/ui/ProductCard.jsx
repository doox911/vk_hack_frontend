import React from 'react';

import { Card, ContentCard, Div } from '@vkontakte/vkui';

const WrapperCardStyles = {
  display: 'flex',
  position: 'relative',
  padding: '0',
  marginRight: '0',
};

const ContentCardStyles = {
  paddingBottom: '50px',
  minWidth: '100%',
};

export function ProductCard(props) {
  const {
    card,
    children = null,
    onClickCardContent = () => {},
  } = props;

  return (
    <Card>
      <Div style={WrapperCardStyles}>
        <ContentCard
          onClick={onClickCardContent}
          style={ContentCardStyles}
          src={card.picturePath}
          subtitle={`Идентификатор: ${card.id}`}
          header={card.name}
          text={`Цена: ${card.price} руб.`}
          caption={card.description}
          maxHeight={500}
        />
        {children || ''}
      </Div>
    </Card>
  );
}
