import { eq } from "drizzle-orm";
import { deleteAddressAction, saveAddressAction } from "@/app/actions/account";
import { getDb } from "@/lib/db";
import { addresses } from "@/lib/schema";
import { getSession } from "@/lib/session";

export const metadata = { title: "Addresses" };

export default async function AddressesPage() {
  const session = await getSession();
  const db = getDb();
  const rows = session
    ? await db.select().from(addresses).where(eq(addresses.userId, session.user.id))
    : [];
  return (
    <>
      <h1>Saved addresses</h1>
      {rows.map((a) => (
        <div className="card" key={a.id} style={{ padding: 18, marginBottom: 12 }}>
          <p>
            <b>
              {a.firstName} {a.lastName}
            </b>{" "}
            · {a.type}
            <br />
            {a.line1}, {a.city} {a.state} {a.postalCode} {a.country}
          </p>
          <form action={deleteAddressAction}>
            <input type="hidden" name="id" value={a.id} />
            <button className="btn n" type="submit">
              Remove
            </button>
          </form>
        </div>
      ))}
      <h3>Add address</h3>
      <form action={saveAddressAction} className="card" style={{ padding: 18 }}>
        <select name="type" defaultValue="shipping">
          <option value="shipping">Shipping</option>
          <option value="billing">Billing</option>
        </select>
        <input name="firstName" placeholder="First name" required />
        <input name="lastName" placeholder="Last name" required />
        <input name="line1" placeholder="Address" required />
        <input name="line2" placeholder="Apartment" />
        <input name="city" placeholder="City" required />
        <input name="state" placeholder="State" required />
        <input name="postalCode" placeholder="ZIP" required />
        <input name="country" placeholder="Country" defaultValue="US" />
        <input name="phone" placeholder="Phone" />
        <label>
          <input type="checkbox" name="isDefault" /> Default
        </label>
        <button className="btn" type="submit">
          Save address
        </button>
      </form>
    </>
  );
}
