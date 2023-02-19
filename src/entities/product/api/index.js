import { $api } from '../../../shared/api';

export async function getProductList() {
  return await $api.post('getProductList');
}
