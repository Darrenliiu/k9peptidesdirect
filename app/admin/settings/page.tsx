import { saveSettingsAction } from "@/app/actions/admin";
import { getSettings } from "@/lib/shipping";

export default async function SettingsPage() {
  const s = await getSettings();
  return (
    <>
      <h1>Settings</h1>
      <p className="lead">Store identity, tax, and order-notification email.</p>
      <form className="panel stack" action={saveSettingsAction}>
        <label>
          Store name
          <input name="storeName" defaultValue={s.storeName} />
        </label>
        <label>
          Support email
          <input name="supportEmail" type="email" defaultValue={s.supportEmail} />
        </label>
        <label>
          Order notification email
          <input name="notificationEmail" type="email" defaultValue={s.notificationEmail ?? ""} />
        </label>
        <label>
          Phone
          <input name="phone" defaultValue={s.phone ?? ""} />
        </label>
        <label>
          Address
          <input name="address" defaultValue={s.address ?? ""} />
        </label>
        <label>
          Tax rate (%)
          <input name="taxRate" type="number" step="0.01" defaultValue={(s.taxRateBps / 100).toFixed(2)} />
        </label>
        <label>
          Free shipping threshold
          <input
            name="freeShipping"
            type="number"
            step="0.01"
            defaultValue={((s.freeShippingThresholdCents ?? 15000) / 100).toFixed(2)}
          />
        </label>
        <button className="btn" type="submit">
          Save settings
        </button>
      </form>
    </>
  );
}
