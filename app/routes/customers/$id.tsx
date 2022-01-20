import { LoaderFunction, useLoaderData } from 'remix'
import sql from 'sql-tagged-template-literal'

import { queryRecord } from '~/data/db'

export const loader: LoaderFunction = async ({ params }) => {
  const customer = await queryRecord(
    sql`select * from customer where customer_id = ${params.id}`
  )
  return { customer }
}

const CustomerPage = () => {
  const { customer } = useLoaderData()
  return <pre>{JSON.stringify(customer, undefined, 2)}</pre>
}

export default CustomerPage
