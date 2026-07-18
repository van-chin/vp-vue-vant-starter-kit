import { defineHandler } from 'nitro';
import { useDatabase } from 'nitro/database';
import type { ApiResponse } from '#types';

/** 用户记录 */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default defineHandler(async (): Promise<ApiResponse<User[]>> => {
  const db = useDatabase();

  await db.sql`CREATE TABLE IF NOT EXISTS users ("id" TEXT PRIMARY KEY, "firstName" TEXT, "lastName" TEXT, "email" TEXT)`;

  const { rows } = await db.sql`SELECT * FROM users`;

  return {
    code: 0,
    message: 'success!',
    data: rows as unknown as User[],
  };
});
