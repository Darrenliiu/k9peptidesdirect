import { saveShippingAction } from "@/app/actions/admin";
import { listShipping } from "@/lib/shipping";

export default async function ShippingPage() {
  const { zones, methods } = await listShipping();
  const zone = zones[0];
  const method = methods.find((m) => m.zoneId === zone?.id) ?? methods[0];
  return (
    <>
      <h1>Shipping</h1>
      <p className="lead">Zones, allowed locations, and rates applied at checkout.</p>
      <form className="panel stack" action={saveShippingAction}>
        <input type="hidden" name="zoneId" defaultValue={zone?.id ?? "us"} />
        <input type="hidden" name="methodId" defaultValue={method?.id ?? "us-cold-pack"} />
        <label>
          Zone name
          <input name="zoneName" defaultValue={zone?.name ?? "United States"} />
        </label>
        <label>
          Countries (comma-separated ISO codes)
          <input name="countries" defaultValue={zone?.countries ?? "US"} />
        </label>
        <label>
          States (empty = all states in those countries)
          <input name="states" defaultValue={zone?.states ?? ""} placeholder="CA, OR, WA" />
        </label>
        <label>
          <input type="checkbox" name="zoneEnabled" defaultChecked={zone?.enabled ?? true} /> Zone
          enabled
        </label>
        <label>
          Method name
          <input name="methodName" defaultValue={method?.name ?? "Cold-pack Ground"} />
        </label>
        <label>
          Type
          <select name="methodType" defaultValue={method?.type ?? "flat"}>
            <option value="flat">Flat rate</option>
            <option value="free_over">Free over threshold</option>
          </select>
        </label>
        <label>
          Rate
          <input
            name="rate"
            type="number"
            step="0.01"
            defaultValue={((method?.rateCents ?? 1295) / 100).toFixed(2)}
          />
        </label>
        <label>
          Free over (store also has a $150 default)
          <input
            name="freeOver"
            type="number"
            step="0.01"
            defaultValue={method?.freeOverCents ? (method.freeOverCents / 100).toFixed(2) : "150"}
          />
        </label>
        <button className="btn" type="submit">
          Save shipping
        </button>
      </form>
    </>
  );
}
