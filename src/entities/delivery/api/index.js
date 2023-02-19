import { $api } from '../../../shared/api';

export async function getDeliveryList() {
  return await $api.post('getDeliveryList');
}
