import { getClient } from '@/lib/utils/getClient';
import { getSingleTyped } from '../utils/prismicTyped';

/**
 *
 * @returns the home page data
 */
export const getHomePageData = async () => {
  const client = getClient();

  const homepage = await getSingleTyped(client, 'home');

  return homepage;
};
