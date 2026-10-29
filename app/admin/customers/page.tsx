import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { user } from "@/lib/schema";
import { query } from "@/lib/db";

export default async function CustomersPage() {
  const db = getDb();
  const users = await db.select().from(user).orderBy(desc(user.createdAt));
  const guests = await query<{ email: string; count: number }>(
    `select email, count(*)::int as count from orders where user_id is null group by email order by count desc`,
  );
  return (
    <>
      <h1>Customers</h1>
      <p className="lead">Registered accounts and guest checkout emails.</p>
      <div className="panel">
        <h3>Accounts</h3>
        <table className="plain">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <a href={`/admin/customers/${u.id}`}>{u.name || "—"}</a>
                </td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {!users.length ? (
              <tr>
                <td colSpan={4}>No registered customers yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="panel" style={{ marginTop: 16 }}>
        <h3>Guest checkouts</h3>
        <table className="plain">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Orders</th>
            </tr>
            {guests.map((g) => (
              <tr key={g.email}>
                <td>{g.email}</td>
                <td>{g.count}</td>
              </tr>
            ))}
            {!guests.length ? (
              <tr>
                <td colSpan={2}>No guest orders.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
