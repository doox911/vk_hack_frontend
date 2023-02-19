import { func } from 'prop-types';
import { $api } from '../../../shared/api';

/**
 *
  {
    "vkId": 0,
    "products": [
      {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "sellerId": "string",
        "picturePath": "string"
      }
    ]
  }
 * @returns
 */
export async function createOrder(order) {
  return await $api.post('createOrder', order);
}

export async function getOrderListByVkId(vkId) {
  return await $api.post('getOrderListByVkId', { vkId });
}
