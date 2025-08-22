import { getClient } from '@/lib/utils/getClient'
import { getSingleTyped } from '../utils/prismicTyped'

/**
 *
 * @returns the about page data
 */
export const getAboutPageData = async () => {
  const client = getClient()

  const aboutPage = await getSingleTyped(client, 'about')

  return aboutPage
}
