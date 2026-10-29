import { Footer } from "@/components/storefront/Footer";
import { Header } from "@/components/storefront/Header";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <section className="ban" style={{ backgroundImage: "url(/images/t2.webp)" }}>
        <div className="w">
          <h1>Built by dog people. Verified by labs.</h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Working dogs, athletes and senior companions deserve research-grade quality.
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="w split">
          <img src="/images/lab.webp" alt="" />
          <div>
            <h2>Our standard</h2>
            <p>Independent HPLC & mass-spec testing on every lot, cold-chain fulfilment, and published COAs.</p>
          </div>
        </div>
      </section>
      <section className="sec alt">
        <div className="w split">
          <div>
            <h2>Vet network</h2>
            <p>Licensed veterinarians review each intake. Rehab specialists help shape our recovery protocols.</p>
          </div>
          <img src="/images/rehab.webp" alt="" />
        </div>
      </section>
      <section className="sec">
        <div className="w grid">
          <div className="card">
            <div className="b">
              <h3>Our standard</h3>Every batch is third-party tested and published.
            </div>
          </div>
          <div className="card">
            <div className="b">
              <h3>Vet network</h3>Licensed veterinarians review intake forms.
            </div>
          </div>
          <div className="card">
            <div className="b">
              <h3>Canine-first dosing</h3>Charts scaled to weight, not guesswork.
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
