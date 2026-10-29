const AUTHOR = "K9 Peptides Direct Editorial";

const COMPLIANCE =
  "Educational information only. Products discussed here are sold for research and veterinary-guided use. They are not intended to diagnose, treat, cure, or prevent any disease. Statements have not been evaluated by the U.S. Food and Drug Administration. Always consult a licensed veterinarian who knows your dog before considering any protocol.";

export const ARTICLES = [
  {
    slug: "what-are-peptides",
    title: "What Are Peptides? A Plain-English Guide for Dog Owners",
    excerpt:
      "A plain-English look at what peptides are, how they differ from proteins, and why most published work is preclinical — not a canine treatment plan.",
    category: "Basics",
    tags: ["peptides", "research", "compliance", "owners"],
    author: AUTHOR,
    publishedAt: "2026-10-25",
    updatedAt: "2026-10-29",
    image: "/images/lab.webp",
    imageAlt: "Quality-control laboratory used to test research peptides",
    relatedProductSlugs: ["bpc-157", "tb-500", "nad", "glutathione", "starter-pack"],
    relatedArticleSlugs: ["bpc-157-tb-500-research", "how-to-read-a-coa", "peptide-storage-handling"],
    sources: [
      {
        title: "NIGMS science glossary: peptide, protein, and amino acid",
        url: "https://nigms.nih.gov/education/glossary",
        publisher: "National Institute of General Medical Sciences (NIH)",
      },
      {
        title: "MeSH descriptor: Peptides (D010455)",
        url: "https://www.ncbi.nlm.nih.gov/mesh/D010455",
        publisher: "NCBI / National Library of Medicine",
      },
      {
        title: "Molecular Biology of the Cell glossary: polypeptide",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK21052/def-item/A5658/",
        publisher: "NCBI Bookshelf",
      },
      {
        title: "Molecular Biology of the Cell glossary: amino acid",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK21052/def-item/A4807/",
        publisher: "NCBI Bookshelf",
      },
      {
        title: "Unapproved animal drugs",
        url: "https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "The ins and outs of extra-label drug use in animals",
        url: "https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "Veterinarian-client-patient relationships and extra-label use",
        url: "https://www.fda.gov/animal-veterinary/product-safety-information/veterinarian-client-patient-relationships-prescribingdispensing-animal-drugs-and-telemedicine",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "Use of prescription drugs in veterinary medicine",
        url: "https://www.avma.org/resources-tools/avma-policies/use-prescription-drugs-veterinary-medicine",
        publisher: "American Veterinary Medical Association",
      },
    ],
    body: `If you have started reading about canine peptides, the vocabulary can feel like a second language. This guide stays with the chemistry and the regulatory frame. It is not a protocol, a dose chart, or a promise that any compound will change how a dog feels, moves, or ages.

> ${COMPLIANCE}

## What a peptide actually is

The [National Institute of General Medical Sciences](https://nigms.nih.gov/education/glossary) describes a **peptide** as a molecule made of a chain of amino acids — a small protein fragment. An **amino acid** is a chemical building block. A **protein** is a larger amino-acid molecule that folds into a defined three-dimensional shape.

The [NCBI MeSH record for peptides](https://www.ncbi.nlm.nih.gov/mesh/D010455) is more technical and useful. It defines peptides as amino acids joined by peptide bonds into linear, branched, or cyclic structures. In that vocabulary, oligopeptides are roughly 2–12 amino acids. Polypeptides are roughly 13 or more. Proteins are treated as larger versions that can fold into enzymes, receptors, and other complex structures.

[Molecular Biology of the Cell](https://www.ncbi.nlm.nih.gov/books/NBK21052/def-item/A5658/), hosted on the NCBI Bookshelf, treats a polypeptide as a linear polymer of amino acids and notes that large polypeptides and proteins are often discussed interchangeably. The same glossary defines an [amino acid](https://www.ncbi.nlm.nih.gov/books/NBK21052/def-item/A4807/) as an organic molecule with both an amino group and a carboxyl group.

Those definitions matter because storefront language often compresses them. A 15-residue research peptide is not interchangeable with a dietary protein, a vitamin, or a licensed veterinary drug. Length, sequence, folding, purity, and intended use all change what the molecule is.

## Why researchers study short chains

Cells already use peptides as signals, fragments of larger proteins, and pieces of antioxidant or metabolic pathways. That biological familiarity is one reason laboratories study synthetic copies or fragments. It is not evidence that a purchased vial will reproduce a paper’s result in a pet.

Most published peptide work is done in cell culture or in rodents. A rat Achilles-tendon explant and a 60-pound working dog are different systems. Route, dose, formulation, and species all change what a study can support. When a paper reports an effect, the honest reading is: *in that model, under those conditions*. It is not a canine outcome guarantee.

If you want a closer look at two names that appear constantly in this category, read [BPC-157 and TB-500: what the research actually says](/blog/bpc-157-tb-500-research). That article stays with rodent, explant, and review literature and states the limits in plain terms.

## Peptides you will see in a canine research catalog

A typical research catalog groups short chains by the questions people ask, not by approved veterinary indications. On this site those groups include recovery-oriented vials such as [BPC-157](/product/bpc-157) and [TB-500](/product/tb-500), cellular-energy research material such as [NAD+](/product/nad), and antioxidant research material such as [glutathione](/product/glutathione). Bundles such as the [Starter Pack](/product/starter-pack) simply combine vials; they do not create a licensed combination product.

None of those listings is an FDA-evaluated animal drug. The [FDA Center for Veterinary Medicine](https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs) explains that an unapproved animal drug is a product intended for animals that meets the statutory definition of a new animal drug but has not been approved, conditionally approved, or indexed. The agency states that unapproved animal drugs may not meet its standards for safety and effectiveness and may not be properly manufactured, labeled, or packaged.

That CVM page is the right frame for a research storefront. A certificate of analysis can describe what is in a vial. It cannot convert an unapproved research material into an evaluated drug. [How to read a certificate of analysis](/blog/how-to-read-a-coa) walks through identity, purity, and the questions a COA does not answer.

## Extra-label use is not a DIY workaround

Dog owners sometimes hear that a veterinarian can use a human drug “off label.” That phrase has a legal meaning. The [FDA’s extra-label use resource](https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians) explains that the Animal Medicinal Drug Use Clarification Act allows veterinarians, under defined conditions, to use **approved** human or animal drugs in a way that is not on the label.

Extra-label use is limited. FDA states that it applies when an animal’s health is threatened or the animal may suffer or die without treatment, and generally when no approved new animal drug is labeled for the needed use. It is not a production or convenience pathway. It also applies to **approved** drugs. It does not turn an unapproved research peptide into a lawful extra-label prescription by default.

A second condition is a valid veterinarian-client-patient relationship. [FDA’s VCPR page](https://www.fda.gov/animal-veterinary/product-safety-information/veterinarian-client-patient-relationships-prescribingdispensing-animal-drugs-and-telemedicine) cites 21 CFR 530.3(i): the veterinarian has assumed responsibility for medical judgments, has sufficient knowledge of the animal for at least a preliminary diagnosis, and is available for follow-up. The federal definition requires that the veterinarian has recently seen and is personally acquainted with the animal’s care through examination or timely visits to the premises. FDA states that a federal VCPR cannot be established solely through telemedicine.

The [AVMA policy on prescription drugs](https://www.avma.org/resources-tools/avma-policies/use-prescription-drugs-veterinary-medicine) is consistent with that frame. Veterinary prescription drugs are to be used or prescribed only within a VCPR. Decisions should rest on clinical judgment, current information, and applicable law. That is the opposite of choosing a vial from a catalog and guessing a schedule.

## How to read a catalog without treating it as medicine

A research listing can still be useful if you treat it as chemistry plus paperwork, not as a diagnosis.

- **Identity.** What sequence or name is claimed, and how was it checked? Mass spectrometry and HPLC are tools, not marketing adjectives.
- **Purity.** A percentage is a laboratory result for a method and a lot. It is not a clinical grade.
- **Intended use.** Research and veterinary-guided use is a limitation, not fine print to skip.
- **Handling.** Freeze-dried material and a reconstituted solution are different stability problems. See [storage, handling, and reconstitution basics](/blog/peptide-storage-handling).
- **Veterinary context.** Weight, other medications, and concurrent disease belong to a licensed veterinarian, not a product page.

The [research guide](/dosing) on this site is an educational reference with placeholder ranges. It is not a prescription. The [FAQ](/faq) covers shipping, testing, and returns in the same research-use voice.

## What this does not mean for your dog

Nothing in the definitions above implies that peptides are appropriate, safe, or useful for a particular dog. NIH glossaries describe chemistry. MeSH describes classification. FDA and AVMA describe the legal and professional setting for animal drugs.

Owners who want a next step have three practical ones that stay inside that setting. First, bring the actual question to the veterinarian who already knows the dog — mobility, recovery after a procedure, senior screening, or something else — and ask what evidence exists in dogs. Second, if you are comparing research materials, read the lot paperwork rather than the nickname. Third, if you browse [the shop](/shop), treat every page as a catalog entry for veterinary-guided research, not as a treatment plan.

Peptides are short amino-acid chains. That sentence is enough chemistry to start. Everything after it — species, route, lot quality, and whether a veterinarian is involved — is where the careful reading begins.`,
  },
  {
    slug: "bpc-157-tb-500-research",
    title: "BPC-157 and TB-500: What the Research Actually Says",
    excerpt:
      "A source-checked reading of BPC-157 and thymosin β4 literature: rodent tendon models, gastric reviews, and why TB-500 is not the same as native Tβ4.",
    category: "Research",
    tags: ["bpc-157", "tb-500", "thymosin", "preclinical"],
    author: AUTHOR,
    publishedAt: "2026-10-26",
    updatedAt: "2026-10-29",
    image: "/images/rehab.webp",
    imageAlt: "Canine rehabilitation work, used as context for mobility research questions",
    relatedProductSlugs: ["bpc-157", "tb-500", "joint-pack", "performance-pack", "gut-healing"],
    relatedArticleSlugs: ["what-are-peptides", "peptide-storage-handling", "how-to-read-a-coa"],
    sources: [
      {
        title: "BPC 157 and tendon outgrowth, survival, and migration (Chang et al., 2011)",
        url: "https://pubmed.ncbi.nlm.nih.gov/21030672/",
        publisher: "PubMed / Journal of Applied Physiology",
      },
      {
        title: "BPC 157 and growth-hormone receptor expression in tendon fibroblasts (Chang et al., 2014)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6271067/",
        publisher: "PMC / Molecules",
      },
      {
        title: "Stable gastric pentadecapeptide BPC 157 in the gastrointestinal tract (Sikiric et al., 2011)",
        url: "https://pubmed.ncbi.nlm.nih.gov/21548867/",
        publisher: "PubMed / Current Pharmaceutical Design",
      },
      {
        title: "BPC 157, cytoprotection, and organoprotection review (Sikiric et al., 2020)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7096228/",
        publisher: "PMC / Gut and Liver",
      },
      {
        title: "Thymosin β4: a multi-functional regenerative peptide (Goldstein et al., 2012)",
        url: "https://pubmed.ncbi.nlm.nih.gov/22074294/",
        publisher: "PubMed / Expert Opinion on Biological Therapy",
      },
      {
        title: "Thymosin β4 as an actin-sequestering protein (Goldstein et al., 2005)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16099219/",
        publisher: "PubMed / Trends in Molecular Medicine",
      },
      {
        title: "Thymosin β4 and dermal healing in animal models and patients (Treadwell et al., 2012)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23050815/",
        publisher: "PubMed / Annals of the New York Academy of Sciences",
      },
      {
        title: "Unapproved animal drugs",
        url: "https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs",
        publisher: "FDA Center for Veterinary Medicine",
      },
    ],
    body: `BPC-157 and TB-500 are the two names most dog owners meet first. The papers behind those names are real. So are the limits. This article summarizes what indexed studies and reviews actually report, and what they do not.

> ${COMPLIANCE} Most of the peptide papers cited here used rodents, cultured cells, or explants. Findings in those systems do not establish veterinary outcomes in dogs.

If you need the chemistry first, start with [what peptides are](/blog/what-are-peptides). Catalog pages for [BPC-157](/product/bpc-157) and [TB-500](/product/tb-500) are listings for research and veterinary-guided use, not evaluated drugs.

## BPC-157 is a 15-amino-acid fragment studied mainly in rats

Chang and colleagues described BPC 157 as a pentadecapeptide — 15 amino acids — and a partial sequence of a body-protection compound isolated from human gastric juice. In a [2011 Journal of Applied Physiology paper](https://pubmed.ncbi.nlm.nih.gov/21030672/), they used tendon fibroblasts from rat Achilles tendon. They reported that BPC 157 accelerated outgrowth from tendon explants, improved cell survival under hydrogen-peroxide stress, and increased in-vitro migration. In that study, MTT assays did not show a direct increase in fibroblast proliferation. The authors associated the migration and spreading findings with FAK and paxillin phosphorylation.

That is a mechanism paper in rat cells and explants. It is not a clinical trial in dogs with tendon injury. It does not identify a canine dose, a route that owners should copy, or a recovery timeline.

A later [2014 Molecules paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC6271067/), also from Chang’s group and available on PMC, again used Achilles-tendon fibroblasts from male Sprague-Dawley rats. Microarray work flagged growth-hormone receptor as an up-regulated gene. The authors reported dose- and time-dependent increases in receptor mRNA and protein. Adding growth hormone after BPC 157 exposure increased viable-cell counts and PCNA expression, and JAK2 was activated. Their conclusion was cautious and mechanistic: increased receptor expression *may* potentiate growth-hormone signaling in those fibroblasts.

Read together, the two papers support a narrow claim: in rat tendon-fibroblast systems, BPC 157 has been associated with migration, stress survival, and growth-hormone-receptor expression. They do not support a claim that BPC-157 diagnoses, treats, cures, or prevents musculoskeletal disease in dogs.

## Gastric and “organoprotection” reviews are still preclinical syntheses

A [2011 review by Sikiric and colleagues](https://pubmed.ncbi.nlm.nih.gov/21548867/) in *Current Pharmaceutical Design* surveys gastrointestinal models. The review describes BPC 157 as stable in human gastric juice and discusses rodent work on esophagus, stomach, intestine, liver, and pancreas lesions, plus fistula and anastomosis models. The authors also mention inflammatory-bowel-disease clinical-trial experience. That mention is the authors’ characterization of the program they review. It is not the same as an FDA finding of safety or effectiveness, and it is not canine data.

A [2020 *Gut and Liver* review](https://pmc.ncbi.nlm.nih.gov/articles/PMC7096228/) (PMC7096228) places BPC 157 in Robert’s cytoprotection and Selye’s stress-coping language. The abstract reviews gastric-cell protection against noxious agents, discussion of alcohol and NSAID models, and broader “organoprotection” language spanning several tissues. The paper is a narrative review from a group that has published extensively on the peptide. Reviews can organize a literature. They cannot replace controlled canine trials that have not been presented as the basis for an approved animal drug.

The honest sentence for a dog owner is therefore short. **Most BPC-157 studies are in rodents or in cultured rodent cells.** Catalog copy that jumps from those papers to a promised recovery in a sport dog is marketing, not a reading of the methods sections.

## TB-500 is not interchangeable with native thymosin β4

“TB-500” is a research-trade name commonly used for a synthetic fragment related to thymosin β4 (Tβ4). Native Tβ4 is a 43-amino-acid, naturally occurring peptide. The published regenerative literature is largely about **Tβ4**, not necessarily about every fragment sold under a catalog nickname. Treat them as related, not identical.

[Goldstein, Hannappel, Sosne, and Kleinman (2012)](https://pubmed.ncbi.nlm.nih.gov/22074294/) reviewed Tβ4 as a low-molecular-weight peptide involved in repair biology. They describe actin binding, cell migration, and interest in skin, eye, heart, and central-nervous-system models. Their expert-opinion section discusses scientific foundations for clinical trials. That is a review of Tβ4 biology, not a canine TB-500 protocol.

An earlier [2005 *Trends in Molecular Medicine* review](https://pubmed.ncbi.nlm.nih.gov/16099219/) by Goldstein, Hannappel, and Kleinman focuses on Tβ4 as the major actin-sequestering molecule in eukaryotic cells and on dermal and corneal wound-healing research. Again, the species and models in that literature are not aging companion dogs.

[Treadwell and colleagues (2012)](https://pubmed.ncbi.nlm.nih.gov/23050815/) summarized dermal-healing work: full-thickness punch wounds in rats and mice, including steroid-treated, diabetic, and aged mice, plus mention of phase 2 work in human stasis and pressure ulcers. Those are human dermatology and rodent skin models. They do not establish that a research vial labeled TB-500 will change mobility, tendon integrity, or coat condition in a dog.

When a storefront pairs [BPC-157](/product/bpc-157) with [TB-500](/product/tb-500) in a [Joint & Recovery Pack](/product/joint-pack) or a [K9 Performance Pack](/product/performance-pack), the pairing is a catalog convenience. It is not evidence that the combination has been evaluated as a drug. The [Gut & Healing Stack](/product/gut-healing) likewise groups BPC-157 with glutathione for research questions, not as an approved gastrointestinal therapy.

## What the papers do not give you

- A validated canine dose, frequency, or cycle length.
- Head-to-head data against standard veterinary care for tendon, joint, or gut disease.
- FDA approval, conditional approval, or indexing as an animal drug. See [FDA’s unapproved-animal-drug page](https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs).
- A reason to skip examination, imaging, or pain assessment that a veterinarian would otherwise perform.

[Extra-label use](https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians) applies to approved drugs under a valid VCPR. It is not a blanket permission structure for unapproved research peptides.

## How to use this literature without over-reading it

If you discuss these names with a veterinarian, bring the citations, not a forum summary. Ask whether any canine data exist for the exact sequence in the vial, not only for a related human peptide. Ask how the clinic would monitor for problems that the rodent papers never measured in dogs.

Quality paperwork still matters even when clinical claims are off the table. [How to read a COA](/blog/how-to-read-a-coa) explains identity and purity tests. [Storage and reconstitution](/blog/peptide-storage-handling) covers handling limits that apply after a vial exists. The [research guide](/dosing) remains an educational chart, not a substitute for the veterinarian who has examined the dog.

The research says BPC-157 has been studied in rat tendon-cell systems and extensively reviewed in rodent gastrointestinal models. It says thymosin β4 is an actin-binding peptide with a broader regenerative literature, mostly not in dogs, and not automatically equal to a TB-500 fragment. That is a fair reading. Anything louder is not what the papers actually say.`,
  },
  {
    slug: "supporting-senior-dogs",
    title: "Supporting Your Senior Dog: Mobility, Cognition and Vet Care",
    excerpt:
      "What AVMA and AAHA actually recommend for older dogs — exams, mobility, and cognitive-change screening — and where research peptides do not replace that care.",
    category: "Senior care",
    tags: ["senior", "mobility", "cognition", "veterinary"],
    author: AUTHOR,
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-29",
    image: "/images/goal-senior.webp",
    imageAlt: "Older companion dog outdoors",
    relatedProductSlugs: ["senior-pack", "nad", "glutathione", "cognitive-pack", "joint-pack"],
    relatedArticleSlugs: ["what-are-peptides", "bpc-157-tb-500-research", "how-to-read-a-coa"],
    sources: [
      {
        title: "Caring for senior cats and dogs",
        url: "https://www.avma.org/resources-tools/pet-owners/petcare/senior-pets",
        publisher: "American Veterinary Medical Association",
      },
      {
        title: "2023 AAHA Senior Care Guidelines for Dogs and Cats (full text PDF)",
        url: "https://www.aaha.org/wp-content/uploads/2022/12/2023-aaha-senior-care-guidelines-for-dogs-and-cats.pdf",
        publisher: "American Animal Hospital Association",
      },
      {
        title: "2023 AAHA Senior Care Guidelines for Dogs and Cats",
        url: "https://pubmed.ncbi.nlm.nih.gov/36584321/",
        publisher: "PubMed / Journal of the American Animal Hospital Association",
      },
      {
        title: "CCDS Working Group guidelines for diagnosis and monitoring",
        url: "https://avmajournals.avma.org/view/journals/javma/264/4/javma.25.10.0668.xml",
        publisher: "Journal of the American Veterinary Medical Association",
      },
      {
        title: "NAD+ metabolism and cellular processes during ageing (Covarrubias et al.)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7963035/",
        publisher: "PMC / Nature Reviews Molecular Cell Biology",
      },
      {
        title: "Glutathione: protective roles, measurement, and biosynthesis (Forman et al.)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2696075/",
        publisher: "PMC / Molecular Aspects of Medicine",
      },
      {
        title: "The ins and outs of extra-label drug use in animals",
        url: "https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians",
        publisher: "FDA Center for Veterinary Medicine",
      },
    ],
    body: `Senior dogs collect labels quickly: stiff, foggy, slowing down. Professional guidance treats those words as starting points for examination, not as a diagnosis and not as a reason to invent a protocol at home.

> ${COMPLIANCE} Aging-related research on NAD+ and glutathione is mostly cellular or rodent work. It does not replace screening, pain assessment, or a veterinarian’s plan for an individual dog.

## What “senior” means in veterinary practice

The [AVMA’s senior-pet page](https://www.avma.org/resources-tools/pet-owners/petcare/senior-pets) is written for owners and is unusually direct. Older pets are more vulnerable to aging-related problems. They need more attention than younger pets, including more frequent veterinary visits and possible changes in diet and home setup.

AVMA’s list is practical: exams at least twice a year; discussion of diet and weight; parasite control and vaccination needs that may differ as immunity changes; keeping appropriate activity so mobility does not collapse from disuse; mental stimulation; and environmental changes such as sleeping areas that avoid stairs. The page also notes reproductive-disease risk in intact seniors. None of that is peptide-specific. It is the baseline.

The [2023 AAHA Senior Care Guidelines](https://www.aaha.org/wp-content/uploads/2022/12/2023-aaha-senior-care-guidelines-for-dogs-and-cats.pdf), also [indexed on PubMed](https://pubmed.ncbi.nlm.nih.gov/36584321/) and published in the *Journal of the American Animal Hospital Association*, state the theme in one line: old age is not a disease. The guidelines describe systematic assessment of healthy and unhealthy seniors, client education, and inclusion of palliative and hospice planning. They are a veterinary-team document. They do not authorize a storefront protocol. They also emphasize a complete medication and nutraceutical history because interactions are real, and they treat twice-yearly (or more frequent) evaluation as the working cadence for seniors.

## Mobility is an exam finding, not a catalog category

Slower stairs can be pain, weakness, neurologic disease, obesity, or several of those at once. AVMA notes that behavior change may reflect discomfort, sensory loss, medical disease, or aging. A veterinarian’s job is to sort those, which may include orthopedic and neurologic examination, pain scoring, and imaging when indicated.

Home support that professional pages already mention — controlled activity, footing, weight, and pain discussion — is the first layer. Research listings such as a [Joint & Recovery Pack](/product/joint-pack) or a [Senior Vitality Pack](/product/senior-pack) sit outside that layer. They are not a substitute for identifying whether the dog has a torn ligament, inflammatory joint disease, or something else entirely.

If you later read [BPC-157 and TB-500 research](/blog/bpc-157-tb-500-research), keep the species line visible. Tendon-fibroblast papers in rats do not answer “why is this dog refusing the couch.”

## Cognitive change is a diagnosis of exclusion

AVMA lists cognitive-dysfunction signs that owners actually notice: disorientation, altered social interaction, sleep-wake changes, house soiling, anxiety, pacing or repetition, less play, weaker response to cues, and poorer learning. The association tells owners to contact the veterinarian with specific changes. It also notes that diets, medications, and environmental interaction *may* be discussed — by the veterinarian, after other causes are considered.

The [Canine Cognitive Dysfunction Syndrome Working Group guidelines](https://avmajournals.avma.org/view/journals/javma/264/4/javma.25.10.0668.xml) in *JAVMA* define CCDS as a chronic, progressive, age-associated neurodegenerative syndrome with changes in the DISHAA domains (disorientation, social interaction, sleep, house soiling, learning and memory, activity, anxiety). The group proposes severity stages and stresses that CCDS remains a **diagnosis of exclusion**. Many diseases can produce the same behavioral domains. Recommended work-up language includes physical, orthopedic, and neurologic examination and a minimum database (CBC, chemistry, urinalysis, blood pressure). Focal neurologic signs or new seizures should prompt consideration of MRI and CSF analysis before a presumptive CCDS label.

Those guidelines also discuss screening cadence: annual behavioral screening from about seven years of age, with more structured scoring every six months from ten years or when changes appear. That is clinic process. It is not a product.

A [Cognitive Focus Pack](/product/cognitive-pack) on this site pairs [NAD+](/product/nad) and [B-Complex](/product/b-complex) as a catalog bundle for research questions. It does not diagnose CCDS and it does not treat it.

## Where NAD+ and glutathione literature actually sits

Owners encounter “longevity” language around NAD+ and glutathione. The primary literature is not a senior-dog manual.

A [2021 review in *Nature Reviews Molecular Cell Biology*](https://pmc.ncbi.nlm.nih.gov/articles/PMC7963035/) (PMC7963035) describes NAD+ as a redox coenzyme and a cofactor for enzymes including sirtuins, CD38, and PARPs. The authors report that NAD+ levels decline with age in multiple models, including rodents and humans, and they discuss targeting NAD+ metabolism as a research approach. They also state that much remains unknown about how NAD+ influences human aging, how to restore it safely, and whether repletion helps aging humans. Canine clinical outcomes are not the basis of that review.

[Forman, Zhang, and Rinna (2009)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2696075/) review glutathione as the most abundant low-molecular-weight thiol synthesized in cells, covering antioxidant and conjugation roles, measurement, and biosynthesis. It is cell-biology. It does not establish that a glutathione vial will change a senior dog’s energy, liver values, or cognition.

Those papers are why a [Senior Vitality Pack](/product/senior-pack) is labeled as research pairing, not as an anti-aging treatment. If a veterinarian wants to talk about oxidative-stress research or cellular-energy cofactors, the conversation still starts with the dog in the exam room.

## A visit list that stays inside professional guidance

- Book the twice-yearly senior exam AVMA describes and AAHA’s senior guidelines reinforce, and bring a written list of mobility and behavior changes.
- Ask what minimum database the clinic recommends for this dog’s age and breed.
- Report every supplement, oil, and research material. The 2023 AAHA senior guidelines emphasize a complete medication and nutraceutical history because interactions are real.
- Do not use [extra-label drug rules](https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians) as a home license. Extra-label use is a veterinarian’s pathway for approved drugs inside a VCPR.
- If you later browse research vials, read [what peptides are](/blog/what-are-peptides) and [how to read a COA](/blog/how-to-read-a-coa) before treating a purity number as a clinical argument.

[Contact](/contact) can start a veterinary-guided intake. The [research guide](/dosing) remains educational. The care that professional bodies actually describe for senior dogs is examination, history, and follow-up — not a promise that any peptide will restore youth.`,
  },
  {
    slug: "how-to-read-a-coa",
    title: "How to Read a Certificate of Analysis (COA)",
    excerpt:
      "What identity, purity, method, and lot number on a COA actually mean — and why a laboratory report is not an FDA evaluation or a medical claim.",
    category: "Quality",
    tags: ["coa", "hplc", "testing", "quality"],
    author: AUTHOR,
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-29",
    image: "/images/lab.webp",
    imageAlt: "HPLC and mass-spec quality control laboratory",
    relatedProductSlugs: ["bpc-157", "tb-500", "nad", "glutathione", "starter-pack"],
    relatedArticleSlugs: ["what-are-peptides", "peptide-storage-handling", "bpc-157-tb-500-research"],
    sources: [
      {
        title: "Analytical Procedures and Methods Validation for Drugs and Biologics",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/analytical-procedures-and-methods-validation-drugs-and-biologics",
        publisher: "U.S. Food and Drug Administration",
      },
      {
        title: "Q2(R1) Validation of Analytical Procedures: Text and Methodology",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r1-validation-analytical-procedures-text-and-methodology-guidance-industry",
        publisher: "U.S. Food and Drug Administration / ICH",
      },
      {
        title: "FDA regulation of animal drugs",
        url: "https://www.fda.gov/animal-veterinary/resources-you/fda-regulation-animal-drugs",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "Unapproved animal drugs",
        url: "https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "MeSH descriptor: Peptides (D010455)",
        url: "https://www.ncbi.nlm.nih.gov/mesh/D010455",
        publisher: "NCBI / National Library of Medicine",
      },
      {
        title: "Use of prescription drugs in veterinary medicine",
        url: "https://www.avma.org/resources-tools/avma-policies/use-prescription-drugs-veterinary-medicine",
        publisher: "American Veterinary Medical Association",
      },
    ],
    body: `A certificate of analysis is a laboratory report for one lot. It is one of the few documents in this category that can be read without turning into a treatment story — if you know which lines matter and which lines are being asked to do too much.

> ${COMPLIANCE} A COA can support a conversation about identity and purity. It cannot show that a product is FDA-evaluated or that it will help a dog.

## What a COA is for

In regulated drug development, analytical procedures exist to document identity, strength, quality, purity, and potency. FDA’s [2015 guidance on analytical procedures and methods validation](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/analytical-procedures-and-methods-validation-drugs-and-biologics) is written for applicants submitting NDAs, ANDAs, BLAs, and related files. It is not a consumer brochure. It is still the clearest official description of what “the method was validated” is supposed to mean: the procedure is suitable for its intended purpose, and the file can show how identity and purity were measured.

ICH [Q2(R1)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q2r1-validation-analytical-procedures-text-and-methodology-guidance-industry), published by FDA as guidance, lists the usual validation characteristics: accuracy, precision, specificity, detection and quantitation limits, linearity, range, and robustness. When a research COA says “HPLC purity 99.2%,” a careful reader asks which method, which detection wavelength, which related-substance peaks were integrated, and whether that method was shown to be specific for the peptide versus look-alike impurities.

Those guidances apply to approved-drug applications. A storefront COA for a research peptide is not an NDA package. Using FDA language here is a literacy exercise: you are borrowing official definitions so a percentage cannot hide behind jargon.

## The lines that usually matter

**Lot or batch number.** The report must match the vial. A COA for a different lot is a different product.

**Identity.** For peptides, identity is more than a trade name. [MeSH](https://www.ncbi.nlm.nih.gov/mesh/D010455) classifies peptides by amino-acid chains and peptide bonds. A laboratory identity test tries to show that the main component is the claimed chain. Common tools are mass spectrometry (molecular mass, sometimes fragmentation) and chromatographic retention time against a reference. A name on the header is not an identity test.

**Purity.** HPLC area-percent is the number most catalogs repeat. It is a statement about the chromatogram, not about clinical grade. A high area-percent can still sit next to unreported residual solvents, moisture, or endotoxin if those tests were never run.

**Method.** “HPLC” and “MS” are families of techniques. The report should name the method well enough that another laboratory could understand the measurement. FDA’s analytical-procedures guidance expects a written procedure: principle, apparatus, operating parameters, reagents, sample preparation, system suitability, calculations, and data reporting.

**Date and laboratory.** When it was tested, and by whom, matters for traceability. “Third-party” is meaningful only if the lab and the lot are identified.

**Appearance and quantity.** Color, form (often a lyophilized cake), and labeled content are checks against the wrong vial in the wrong box.

If a line is missing, the honest reading is “not shown,” not “must be fine.”

Water content, residual solvents, and bacterial endotoxin are examples of tests that peptide laboratories sometimes run and sometimes omit. None of those omissions is automatically a defect in a research catalog — but each omission is a reason not to treat the PDF as a complete quality story. Ask the seller which specification the lot was released against, and whether the laboratory is identified enough that a veterinarian can request the same file later.

## What a COA cannot do

[FDA’s animal-drug overview](https://www.fda.gov/animal-veterinary/resources-you/fda-regulation-animal-drugs) describes what legal marketing status looks like for approved or indexed animal drugs, including required labeling elements. [Unapproved animal drugs](https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs) have not been through that pre-market review. A research COA does not create legal marketing status. It does not mean FDA evaluated safety or effectiveness for any canine use.

A COA also does not:

- Diagnose a dog or justify skipping a veterinarian.
- Prove that two vials with the same name from different makers are the same substance.
- Replace [AVMA’s expectation](https://www.avma.org/resources-tools/avma-policies/use-prescription-drugs-veterinary-medicine) that prescription decisions happen inside a VCPR.
- Tell you how to store or reconstitute the vial. That is a handling question; see [storage, handling, and reconstitution](/blog/peptide-storage-handling).

## How to read a purity number without kidding yourself

Suppose a [BPC-157](/product/bpc-157) lot lists HPLC purity in the high 99s and “mass spec verified.” A fair set of follow-ups is: verified against what theoretical mass? Was MS used only for a molecular-ion check? Were related peptides resolved on the HPLC method? Is the solvent system compatible with the sequence?

The same questions apply to [TB-500](/product/tb-500), [NAD+](/product/nad), and [glutathione](/product/glutathione). Glutathione is a tripeptide; NAD+ is a dinucleotide cofactor, not a classic oligopeptide. A COA should still state identity and the method. Bundle pages such as the [Starter Pack](/product/starter-pack) should point to a report **per lot of each vial**, not one number for the box.

Do not treat two PDFs as comparable because both say “99%.” Different columns, gradients, and integration rules produce different area-percent values. FDA’s methods-validation guidance exists because a number without a method is not a specification. If a veterinarian or a compounding pharmacist asks for the method, being able to hand over the file — not a screenshot of the headline purity — is the useful response.

If you want the chemistry of short chains before the paperwork, read [what peptides are](/blog/what-are-peptides). If you want the research limits behind two popular names, read [BPC-157 and TB-500](/blog/bpc-157-tb-500-research).

## A practical reading order

1. Match lot number on vial, box, and PDF.
2. Read identity before purity. A precise purity of the wrong molecule is not a virtue.
3. Note every test that is absent (endotoxin, residual solvent, water, sterility). Absence is information.
4. Ignore adjectives — “pharma grade,” “research supreme” — that are not methods.
5. Keep the [FAQ](/faq) and [about](/about) pages in view: this storefront publishes lot paperwork as a quality practice, not as a medical claim.

Keep a copy of the PDF with the order confirmation. If a veterinarian later asks what was in the box, the lot number and the method list are the useful parts of the conversation. The [FAQ](/faq) already points owners to product-page certificates when a batch is published; this article is the reading guide for those files.

A COA is a snapshot of a sample under a method. Read it that way and it is useful. Ask it to prove that a dog will do better, and it is the wrong document.`,
  },
  {
    slug: "peptide-storage-handling",
    title: "Peptide Storage, Handling and Reconstitution Basics",
    excerpt:
      "Lyophilized cakes, diluents, refrigeration, and multi-dose handling — explained from FDA, DailyMed, and CDC sources, without dosing promises.",
    category: "Handling",
    tags: ["storage", "reconstitution", "lyophilized", "safety"],
    author: AUTHOR,
    publishedAt: "2026-10-29",
    updatedAt: "2026-10-29",
    image: "/images/t2.webp",
    imageAlt: "Working dog in an outdoor setting, used as a storefront banner for handling guidance",
    relatedProductSlugs: ["bpc-157", "tb-500", "glutathione", "nad", "joint-pack"],
    relatedArticleSlugs: ["how-to-read-a-coa", "what-are-peptides", "bpc-157-tb-500-research"],
    sources: [
      {
        title: "Lyophilization of Parenteral (inspection guide)",
        url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-guides/lyophilization-parenteral-793",
        publisher: "U.S. Food and Drug Administration",
      },
      {
        title: "Bacteriostatic Water for Injection label",
        url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a833502e-a622-4e81-8c58-cef6ccb6c4c9",
        publisher: "DailyMed / National Library of Medicine",
      },
      {
        title: "Preventing unsafe injection practices",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/",
        publisher: "Centers for Disease Control and Prevention",
      },
      {
        title: "Unapproved animal drugs",
        url: "https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "The ins and outs of extra-label drug use in animals",
        url: "https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians",
        publisher: "FDA Center for Veterinary Medicine",
      },
      {
        title: "Veterinarian-client-patient relationships",
        url: "https://www.fda.gov/animal-veterinary/product-safety-information/veterinarian-client-patient-relationships-prescribingdispensing-animal-drugs-and-telemedicine",
        publisher: "FDA Center for Veterinary Medicine",
      },
    ],
    body: `Handling is the unglamorous half of peptide literacy. A lyophilized cake, a diluent, a refrigerator, and a punctured stopper are different problems. This article stays with official descriptions of freeze-drying, bacteriostatic water, and injection-safety practice. It does not tell you how much to give a dog.

> ${COMPLIANCE} Reconstitution instructions from a veterinarian or a product-specific label outrank any general article. This page does not provide doses, concentrations for injection, or outcome claims.

The [research guide](/dosing) includes a short educational reconstitution sequence for the same reason this article exists: people ask. It is still not a prescription. [How to read a COA](/blog/how-to-read-a-coa) is the companion for lot paperwork.

## Why many vials arrive dry

FDA’s [lyophilization inspection guide](https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-guides/lyophilization-parenteral-793) defines lyophilization as freeze-drying: the product is frozen, placed under vacuum, and ice leaves as vapor. The guide lists reasons manufacturers use the process: a dry solid can be more stable than a solution, water can be removed without excessive heating, and a dried cake can dissolve again when a sterile diluent is added.

The same guide lists the cost: more handling, a need for sterile diluent, and equipment complexity. It also discusses stability testing of **reconstituted** solutions. FDA inspectors have flagged firms that set expiration dates without checking potency after reconstitution at the labeled interval. The lesson for a reader is not a number to write on tape. It is that the clock after water is added is a separate stability question from the dry-vial date.

Dry [BPC-157](/product/bpc-157), [TB-500](/product/tb-500), [glutathione](/product/glutathione), or [NAD+](/product/nad) cakes are still unapproved research materials in this catalog. [FDA CVM](https://www.fda.gov/animal-veterinary/compliance-enforcement/unapproved-animal-drugs) does not treat freeze-drying as a path to legal marketing status.

## Diluents are labeled products with limits

[DailyMed’s Bacteriostatic Water for Injection label](https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a833502e-a622-4e81-8c58-cef6ccb6c4c9) (NLM) describes a sterile, nonpyrogenic water for injection with benzyl alcohol as a bacteriostatic preservative, supplied in a multiple-dose container so repeated withdrawals can be made to dilute or dissolve drugs. The preparation is designed solely for parenteral use after addition of drugs that require dilution. The label carries a boxed warning: **not for use in neonates**.

That label is about the diluent, not about a peptide. It does not say that benzyl-alcohol water is appropriate for every dog, every peptide, or every route. FDA’s lyophilization guide notes that although some products are labeled for bacteriostatic water, sterile water for injection is often used in hospitals because benzyl alcohol can complicate sterility testing and has toxicity concerns.

A veterinarian chooses the diluent. Owners should not treat a forum preference as a label. DailyMed pages are product-specific; another maker’s bacteriostatic water may use a different benzyl-alcohol strength or container. Read the label that is actually in the box.

The lyophilization guide’s remark about sterile water versus bacteriostatic water is an inspection observation about sterility testing and hospital practice. It is not an instruction to ignore a veterinarian who specified a particular diluent for a particular animal. When the two conflict, the clinician who has examined the dog is the decision-maker.

## After the stopper is punctured

CDC’s [injection-safety page](https://www.cdc.gov/injection-safety/hcp/clinical-safety/) is written for clinical settings and still contains the rules that keep multi-dose containers from becoming shared contamination. Key points CDC restates from USP <797> practice:

- An unopened multi-dose vial is discarded by the manufacturer’s expiration date.
- Once opened or needle-punctured, the vial is dated and discarded within 28 days **unless the manufacturer states another date**.
- The beyond-use date never extends the original expiration date.
- Discard whenever sterility is compromised or cannot be confirmed.
- Dedicate multi-dose vials to a single patient whenever possible.

CDC also emphasizes basic safe injection practice: new sterile needle and syringe, no reuse, and no assumption that a preservative makes sloppy technique safe. A preservative does not inactivate viruses and does not fully protect against bacterial contamination.

Those points are general medication-safety rules. They are not a claim that a research peptide remains chemically intact for 28 days after reconstitution. Chemical stability can be shorter than a sterility-oriented beyond-use convention. Product-specific guidance from the veterinarian or the labeled insert — when one exists — wins.

## Handling habits that do not require a dose

- Keep dry vials in the conditions the pack-out specifies. Cold-chain shipping exists because temperature history is part of quality, not theater.
- Do not shake a reconstituting cake to “speed it up.” FDA’s lyophilization guide discusses cakes that are meant to dissolve; mechanical abuse is not a method.
- Label the vial with the date and time water was added. CDC’s dating rule is useless if the date is not written down.
- Do not pool leftover volumes from two containers to make a “full” draw. CDC’s vaccine-handling material, which follows the same safety logic, tells clinics not to combine partial contents.
- Store reconstituted material as instructed for that product. A refrigerator is not a universal solvent for every mistake.
- Keep research materials out of neonatal and household-mixup reach. DailyMed’s neonate warning is about benzyl alcohol; household safety is common sense on top.

Light and repeated freeze-thaw cycles are common ways a reconstituted solution is mishandled even when the refrigerator is “on.” Official lyophilization guidance is about manufacturer stability programs, not a household freezer hack. If a veterinarian’s instruction is refrigerate and do not freeze after reconstitution, that instruction is the one that applies. If a pack arrives warm, stop and use the [FAQ](/faq) shipping path rather than guessing whether the cake is still the lot that was tested.

The [research guide](/dosing) lists wipe, add diluent down the wall, swirl, refrigerate as an educational four-step. Confirm every step with the veterinarian who is actually involved.

## This is still not a use instruction

[Extra-label use](https://www.fda.gov/animal-veterinary/resources-you/ins-and-outs-extra-label-drug-use-animals-resource-veterinarians) and a [federal VCPR](https://www.fda.gov/animal-veterinary/product-safety-information/veterinarian-client-patient-relationships-prescribingdispensing-animal-drugs-and-telemedicine) describe how a licensed veterinarian may use **approved** drugs. They do not turn a handling article into permission to administer an unapproved peptide.

If you are still at the “what is this molecule” stage, read [what peptides are](/blog/what-are-peptides). If you are comparing names that dominate forums, read [BPC-157 and TB-500](/blog/bpc-157-tb-500-research). If you are staring at a PDF that came with a [Joint & Recovery Pack](/product/joint-pack), start with the lot numbers, then the handling notes your veterinarian gives you.

If you are comparing two lots of the same name, handling history is part of the comparison. A COA describes the sample that was tested. It does not describe a vial that sat in a hot car after the PDF was issued. That is why cold-pack shipping and a written reconstitution date belong in the same notebook as the lot number.

Storage and reconstitution are quality and safety topics. They are not a back door into dosing, and they are not evidence that a peptide will help a dog.`,
  },
];
