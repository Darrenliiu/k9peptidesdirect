import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/vet.webp)" }}>
        <div className="w">
          <h1>Talk to our team</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Protocol questions, vet partnerships and order support.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w pd">
          <div>
            <h2>Talk to our team</h2>
            <p>Questions on protocols, orders or COAs? We reply within one business day.</p>
            <p>
              📧 support@k9peptidesdirect.com
              <br />🕘 Mon–Fri 9–5 PT
            </p>
          </div>
          <form className="card" style={{ padding: 24 }} action="mailto:support@k9peptidesdirect.com">
            <input name="name" placeholder="Name" />
            <input name="email" type="email" placeholder="Email" />
            <select name="topic">
              <option>Topic: Order</option>
              <option>Protocol question</option>
              <option>Vet partnership</option>
            </select>
            <input name="dog" placeholder="Dog breed & weight" />
            <textarea name="message" rows={5} placeholder="Message" />
            <button className="btn" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
