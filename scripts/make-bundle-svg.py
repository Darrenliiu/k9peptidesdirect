"""Generate navy-box + vial SVG mockups for new bundles."""
from pathlib import Path

PAW = (
    '<g fill="#fff">'
    '<circle cx="5" cy="9" r="2.4"/><circle cx="9.5" cy="4.5" r="2.4"/>'
    '<circle cx="14.5" cy="4.5" r="2.4"/><circle cx="19" cy="9" r="2.4"/>'
    '<path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z"/>'
    "</g>"
)
NAVY_PAW = PAW.replace("#fff", "#087cf0")


def vial(x: int, label: str, sub: str) -> str:
    return f"""
  <g transform="translate({x},268)">
    <rect x="18" y="18" width="92" height="248" rx="16" fill="#e8eef5" stroke="#9aa8bc" stroke-width="2"/>
    <rect x="30" y="0" width="68" height="28" rx="8" fill="#f4f7fb" stroke="#c5cedb" stroke-width="2"/>
    <rect x="36" y="6" width="56" height="12" rx="3" fill="#d7dee8"/>
    <rect x="28" y="70" width="72" height="150" rx="6" fill="#fff" stroke="#087cf0" stroke-width="2"/>
    <g transform="translate(52,82) scale(0.9)">{NAVY_PAW}</g>
    <text x="64" y="132" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="8" font-weight="700" fill="#003366">K9 PEPTIDES</text>
    <text x="64" y="144" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="7" fill="#087cf0">DIRECT</text>
    <text x="64" y="172" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="11" font-weight="700" fill="#003366">{label}</text>
    <text x="64" y="188" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="10" fill="#087cf0">{sub}</text>
    <text x="64" y="208" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="6" fill="#7a8498">RESEARCH USE ONLY</text>
  </g>"""


def svg(title: str, tagline: str, vials: list[tuple[str, str]]) -> str:
    vial_start = 430 if len(vials) == 2 else 400
    gap = 118 if len(vials) == 2 else 108
    drawn = "".join(vial(vial_start + i * gap, a, b) for i, (a, b) in enumerate(vials))
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="{title}">
  <rect width="800" height="800" fill="#f6f8fb"/>
  <rect x="70" y="110" width="420" height="560" rx="8" fill="#003366"/>
  <rect x="70" y="110" width="18" height="560" fill="#087cf0"/>
  <g transform="translate(248,150) scale(1.7)">{PAW}</g>
  <text x="280" y="250" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="34" font-weight="700" fill="#fff">K9</text>
  <text x="280" y="288" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="18" font-weight="600" fill="#fff" letter-spacing="4">PEPTIDES</text>
  <line x1="150" y1="308" x2="410" y2="308" stroke="#087cf0" stroke-width="2"/>
  <text x="280" y="334" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="16" fill="#7fbcff" letter-spacing="3">DIRECT</text>
  <text x="280" y="400" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="20" font-weight="700" fill="#fff">{title}</text>
  <text x="280" y="432" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="12" fill="#9cc8ff">{tagline}</text>
  <text x="280" y="620" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="10" fill="#9cc8ff">RESEARCH USE ONLY</text>
  <text x="280" y="638" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="10" fill="#9cc8ff">NOT FOR HUMAN USE</text>
{drawn}
</svg>
"""


out = Path("/workspace/public/images")
bundles = [
    ("joint-pack.svg", "JOINT &amp; RECOVERY PACK", "Joint, tendon and post-op support", [("BPC-157", "5 MG"), ("TB-500", "5 MG")]),
    ("gut-healing.svg", "GUT &amp; HEALING STACK", "Gut lining + oxidative-stress support", [("BPC-157", "5 MG"), ("GLUTATHIONE", "5 MG")]),
    ("starter-pack.svg", "STARTER PACK", "First vet-guided protocol pair", [("BPC-157", "5 MG"), ("B-COMPLEX", "5 MG")]),
    ("senior-pack.svg", "SENIOR VITALITY PACK", "Cellular energy for aging dogs", [("NAD+", "5 MG"), ("GLUTATHIONE", "5 MG")]),
    ("performance-pack.svg", "K9 PERFORMANCE PACK", "Recovery between high-output days", [("BPC-157", "5 MG"), ("TB-500", "5 MG"), ("NAD+", "5 MG")]),
    ("cognitive-pack.svg", "COGNITIVE FOCUS PACK", "Training focus and mental sharpness", [("NAD+", "5 MG"), ("B-COMPLEX", "5 MG")]),
]
for filename, title, tagline, vials in bundles:
    (out / filename).write_text(svg(title, tagline, vials))
    print("wrote", filename)
