import { Button, CardGrid, Panel, Title, View } from '@vkontakte/vkui';
import { useCallback, useEffect, useState } from 'react';
import { createOrder } from '../../../entities/order';
import { ProductCard } from '../../../entities/product';
import { getProductList } from '../../../entities/product';

const TitleStyles = {
  fontSize: '32px',
  marginTop: 5,
  marginBottom: 30,
};
const ButtonStyles = {
  position: 'absolute',
  bottom: '10px',
  left: '16px',
};

export const ShopPage = ({ user, onLoad = () => {}, onLoaded = () => {} }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(200);

  useEffect(async () => {
    try {
      setIsLoading(true);
      const productList = await getProductList();

      setCards(productList.data.products);
    } catch (error) {
      setStatus(500);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const productClickHandler = useCallback(async (index) => {
    if (user) {
      onLoad();
      await createOrder({
        vkId: user.id,
        productIds: [cards[index].id],
      });

      onLoaded();
    }
  });

  return (
    <View activePanel='card'>
      <Panel id='card'>
        <Title level='1' weight='1' style={TitleStyles}>
          Товары
        </Title>

        <CardGrid size='m' style={{ padding: '0' }}>
          {status === 200
            ? isLoading
              ? <Title level='2'>Идет загрузка...</Title>
              : cards && cards.map((card, index) => (
                <ProductCard key={card + index} card={card}>
                  <Button style={ButtonStyles} onClick={() => productClickHandler(index)}>
                    Купить товар
                  </Button>
                </ProductCard>
              ))
            : <Title level='2'>Произошла ошибка 😕</Title>}
        </CardGrid>
      </Panel>
    </View>
  );
};
