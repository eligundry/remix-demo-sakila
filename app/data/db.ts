import initSqlJs, { Database } from 'sql.js'

let db: Database | null = null

export const getDB = async () => {
  if (!db) {
    const [SQL, buf] = await Promise.all([
      initSqlJs({}),
      fetch(
        'https://rawcdn.githack.com/ivanceras/sakila/2b3b3a2ae62fc158d0b6e5254d0c1296ccd8d083/sqlite-sakila-db/sakila.db'
      ).then((res) => {
        console.log(res)
        return res.arrayBuffer()
      }),
    ])
    db = new SQL.Database(new Uint8Array(buf))
  }

  return db
}

export async function queryRecords<T = Record<string, unknown>>(
  query: string
): Promise<T[]> {
  const db = await getDB()
  const rawData = db.exec(query)

  return rawData[0].values.map((row) => {
    // @ts-ignore
    const data: T = {}

    for (let i = 0; i < rawData[0].columns.length; i++) {
      // @ts-ignore
      data[rawData[0].columns[i]] = row[i]
    }

    return data
  })
}

export async function queryRecord<T = Record<string, unknown>>(
  query: string
): Promise<T> {
  return (await queryRecords<T>(query))[0]
}
