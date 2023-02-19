import { $api } from '../../../shared/api';

export async function getTokenPathByOrderId(vkId, orderId) {
  return await $api.post('getTokenPathByOrderId', { vkId, orderId });
}
