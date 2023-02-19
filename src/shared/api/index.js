import axios from 'axios';
import { BASE_URL } from './lib/constants';

export const $api = axios.create({
  baseURL: BASE_URL,
});

export function acceptOrderState({ vkId, type, orderId, state }) {
  return $api.post('acceptOrderState', {
    vkId,
    orderId,
    type, // "delivery" | "seller" | "buyer"
    state,
  });
}

export function createRouteByToken({ orderId, deliveryIds }) {
  return $api.post('createRouteByToken', {
    orderId,
    deliveryIds,
  });
}
