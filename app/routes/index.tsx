import { Link, useLoaderData } from 'remix'

import { queryRecords } from '~/data/db'

export async function loader() {
  const customers = await queryRecords(
    'select customer_id, first_name, last_name from customer'
  )

  return { customers }
}

export default function Index() {
  const { customers } = useLoaderData()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customer_id}>
            <Link to={`/customers/${customer.customer_id}`}>
              {customer.first_name} {customer.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
