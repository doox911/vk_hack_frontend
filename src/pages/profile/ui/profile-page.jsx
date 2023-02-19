import { Icon20CubeBoxOutline, Icon20DollarOutline, Icon28UserOutline } from '@vkontakte/icons';
import { Cell, Counter, List, Title } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { getDeliveryList } from '../../../entities/delivery';
import { getOrderListByVkId } from '../../../entities/order';
import { DeliveryItems } from '../../../features/delivery';
import { OrderItems } from '../../../features/order';
import { SaleItems } from '../../../features/sale';
import { acceptOrderState, createRouteByToken } from '../../../shared/api';
import { getFormat } from '../../../shared/utils/format';

const ORDER_TYPE = 'buyer';

export const ProfilePage = ({ user, onLoading, onLoaded }) => {
  const [need_to_update, setNeedToUpdate] = useState(false);

  const [deliveries, setDeliveries] = useState([]);

  const [openDeliveries, setOpenDeliveries] = useState(true);

  const [openOrders, setOpenOrders] = useState(true);

  const [openSales, setOpenSales] = useState(true);

  const [orders, setOrders] = useState([]);

  const [sales, setSales] = useState([]);

  const [select_deliveries, setSelectDeliveries] = useState([]);

  const onClickOpenOrders = () => {
    setOpenOrders(openOrders => !openOrders);
  };

  const onClickOpenDeliveries = () => {
    setOpenDeliveries(openDeliveries => !openDeliveries);
  };

  const onClickOpenSales = () => {
    setOpenSales(openSales => !openSales);
  };

  async function orderSuccessHandler(id, type) {
    const order = orders.find(o => o.id === id);

    const response = await acceptOrderState({
      type,
      vkId: user.id,
      orderId: order?.orderId,
      state: true,
    });
  }

  async function orderRejectHandler(id, type) {
    const order = orders.find(o => o.id === id);

    const response = await acceptOrderState({
      type,
      vkId: user.id,
      orderId: order?.orderId,
      state: false,
    });
  }

  async function deliverySuccessHandler(id, type) {
    const delivery = deliveries.find(d => d.id === id);

    const response = await acceptOrderState({
      type,
      vkId: user.id,
      orderId: delivery?.orderId,
      state: true,
    });
  }

  async function deliveryRejectHandler(id, type) {
    const delivery = deliveries.find(d => d.id === id);

    const response = await acceptOrderState({
      type,
      vkId: user.id,
      orderId: delivery?.orderId,
      state: false,
    });
  }

  async function salesSuccessHandler(id, d_id) {
    const s = sales.find(i => i.id === id);

    await createRouteByToken({
      orderId: s.orderId,
      deliveryIds: [d_id],
    });

    setNeedToUpdate(true);
  }

  useEffect(async () => {
    if (user) {
      try {
        onLoading();

        const { buyer, delivery, seller } = (await getOrderListByVkId(user.id)).data;

        const data = (await getDeliveryList()).data;

        setDeliveries(
          delivery.map(o => ({
            ...o.order,
            state: o.state,
            is_accept: o.state === 'accept',
            date: getFormat(o.date),
          })) || [],
        );

        setOrders(
          buyer.map(o => ({
            ...o.order,
            state: o.state,
            is_accept: o.state !== 'accept',
            is_delivery: o.state !== 'delivery',
            date: getFormat(o.date),
          })) || [],
        );

        const sales = seller.map(o => ({
          ...o.order,
          state: o.state,
          is_created: o.type === 'create',
          date: getFormat(o.date),
        })) || [];

        setSales(sales);

        setSelectDeliveries(data.deliveries || []);
      } catch (e) {
      } finally {
        onLoaded();
      }
    }
  }, [user, need_to_update]);

  return (
    <>
      <List>
        <Cell
          onClick={onClickOpenOrders}
          viewBox='0 0 28 28'
          before={<Icon28UserOutline style={{ paddingRight: '12px', marginLeft: '-4px' }} />}
          indicator={<Counter>{orders.length}</Counter>}
        >
          <Title level='1'>
            Мои заказы
          </Title>
        </Cell>
        {openOrders && (
          <OrderItems
            vkId={user.id}
            orders={orders}
            onSuccess={(id) => orderSuccessHandler(id, ORDER_TYPE)}
            onReject={(id) => orderRejectHandler(id, ORDER_TYPE)}
          />
        )}
        <Cell
          onClick={onClickOpenDeliveries}
          viewBox='0 0 28 28'
          before={<Icon20CubeBoxOutline style={{ paddingRight: '12px' }} />}
          indicator={<Counter>{deliveries.length}</Counter>}
        >
          <Title level='1'>
            Мои доставки
          </Title>
        </Cell>
        {openDeliveries && (
          <DeliveryItems
            deliveries={deliveries}
            onSuccess={(id) => deliverySuccessHandler(id, ORDER_TYPE)}
            onReject={(id) => deliveryRejectHandler(id, ORDER_TYPE)}
          />
        )}
        <Cell
          onClick={onClickOpenSales}
          viewBox='0 0 38 38'
          before={<Icon20DollarOutline style={{ paddingRight: '12px' }} />}
          indicator={<Counter>{sales.length}</Counter>}
        >
          <Title level='1'>
            Мои продажи
          </Title>
        </Cell>
        {openSales && <SaleItems sales={sales} deliveries={select_deliveries} onSuccess={salesSuccessHandler} />}
      </List>
    </>
  );
};
