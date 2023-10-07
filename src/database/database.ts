import * as mysql from 'mysql2/promise';

let connection: mysql.Connection;

export async function connect(connectionOptions: mysql.ConnectionOptions) {
  connection = await mysql.createConnection(connectionOptions);
  await connection.connect();
}

export async function query(
  queryString: string,
  queryOptions?: object | [] | undefined,
) {
  if (!connection) throw new Error('database not connected');

  const output = await connection.query(queryString, queryOptions || undefined);

  return output[0][0];
}

export async function queryAll(
  queryString: string,
  queryOptions?: object | [] | undefined,
) {
  if (!connection) throw new Error('database not connected');

  const output = await connection.query(queryString, queryOptions || undefined);

  return output[0];
}
