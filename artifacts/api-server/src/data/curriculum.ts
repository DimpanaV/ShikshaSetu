export const CURRICULUM_DB: Record<string, Record<string, string>> = {
  math: {
    quadratic_equations: `A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0. Solutions can be found using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The discriminant (b²-4ac) determines the nature of roots: positive gives two real roots, zero gives one repeated root, negative gives complex roots. Factoring and completing the square are alternative methods. Applications include projectile motion, area problems, and optimization.`,
    
    trigonometry: `Trigonometry studies relationships between angles and sides of triangles. Primary ratios: sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent. Key identities: sin²θ + cos²θ = 1, tan θ = sin θ/cos θ. Special angles: 0°, 30°, 45°, 60°, 90°. Applications in navigation, architecture, physics (waves, oscillations), and engineering. The unit circle extends trigonometry beyond triangles.`,

    calculus: `Calculus has two main branches: differential (rates of change) and integral (accumulation). Derivatives measure instantaneous rate of change: d/dx(xⁿ) = nxⁿ⁻¹. The chain rule, product rule, and quotient rule help differentiate complex functions. Integrals calculate area under curves. The Fundamental Theorem of Calculus connects derivatives and integrals. Applications: velocity, acceleration, optimization, area, volume.`,

    algebra: `Algebra uses symbols and variables to represent numbers and express mathematical relationships. Linear equations have the form ax + b = 0. Systems of equations can be solved by substitution, elimination, or matrix methods. Polynomials, factoring, and the FOIL method are key skills. Functions, domain, and range describe input-output relationships. Applications are widespread in science, economics, and engineering.`,

    geometry: `Geometry studies shapes, sizes, and properties of figures. Euclidean geometry includes points, lines, planes, triangles, circles, and polygons. Key theorems: Pythagorean theorem (a² + b² = c²), angle sum in triangle = 180°, circle properties. Area and perimeter formulas for common shapes. Congruence and similarity of triangles. Coordinate geometry links algebra and geometry using the Cartesian plane.`,
  },

  science: {
    photosynthesis: `Photosynthesis is the process by which green plants convert sunlight, water, and carbon dioxide into glucose and oxygen. The equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. It occurs in chloroplasts using the pigment chlorophyll. Two stages: light-dependent reactions (in thylakoids) produce ATP and NADPH; light-independent (Calvin cycle, in stroma) uses these to fix CO₂ into glucose. Factors affecting rate: light intensity, CO₂ concentration, temperature, water availability.`,

    newtons_laws: `Newton's Three Laws of Motion: 1) Law of Inertia — an object at rest stays at rest, an object in motion continues in motion unless acted upon by an external force. 2) F = ma — force equals mass times acceleration; heavier objects need more force to accelerate. 3) Action-Reaction — for every action there is an equal and opposite reaction. These laws explain everyday phenomena: why seatbelts are needed, how rockets work, why you feel pushed back when a car accelerates.`,

    cells: `The cell is the fundamental unit of life. Prokaryotic cells (bacteria) lack a nucleus; eukaryotic cells (plants, animals, fungi) have a membrane-bound nucleus. Key organelles: nucleus (DNA storage), mitochondria (energy production via ATP), ribosomes (protein synthesis), endoplasmic reticulum (protein/lipid transport), Golgi apparatus (packaging/secretion), lysosomes (digestion), vacuoles (storage). Plant cells additionally have chloroplasts and cell walls. Cell division: mitosis (growth/repair), meiosis (reproduction).`,

    electricity: `Electricity involves the flow of electric charge. Current (I) is measured in Amperes, Voltage (V) in Volts, Resistance (R) in Ohms. Ohm's Law: V = IR. Power: P = VI = I²R = V²/R. Series circuits: same current everywhere, voltages add. Parallel circuits: same voltage, currents add. Capacitors store charge, inductors store magnetic energy. AC (alternating current) is used in homes; DC (direct current) in batteries. Kirchhoff's laws govern complex circuits.`,
  },

  history: {
    indian_independence: `India's struggle for independence from British rule lasted nearly a century. Key events: 1857 Sepoy Mutiny (first war of independence), formation of Indian National Congress in 1885, Partition of Bengal 1905, Jallianwala Bagh massacre 1919, Non-Cooperation Movement 1920, Civil Disobedience/Salt March 1930, Quit India Movement 1942. Key leaders: Mahatma Gandhi (nonviolent resistance), Jawaharlal Nehru, Subhas Chandra Bose, B.R. Ambedkar, Bal Gangadhar Tilak. India gained independence on August 15, 1947, partitioned into India and Pakistan.`,

    world_wars: `World War I (1914-1918): triggered by assassination of Archduke Franz Ferdinand, involved Allied Powers vs Central Powers, trench warfare, new weapons (poison gas, tanks), ended with Treaty of Versailles. Caused ~20 million deaths. World War II (1939-1945): Hitler's invasion of Poland started it; Allied Powers (UK, USA, USSR, France) vs Axis (Germany, Italy, Japan). Key events: Battle of Britain, Operation Barbarossa, Pearl Harbor, D-Day, Holocaust, atomic bombs on Hiroshima/Nagasaki. Ended with UN formation and Cold War beginning.`,

    mughal_empire: `The Mughal Empire (1526-1857) was one of India's greatest empires. Founded by Babur after the First Battle of Panipat. Key rulers: Akbar (greatest emperor, religious tolerance, Navratnas), Jahangir, Shah Jahan (built Taj Mahal), Aurangzeb (expanded but caused religious tension). Administration: mansabdari system, land revenue reforms (Todar Mal). Cultural contributions: Urdu language, Indo-Islamic architecture (Red Fort, Humayun's Tomb), miniature painting, music. Declined due to Aurangzeb's policies, regional rebellions, and European trading company power.`,
  },

  physics: {
    waves: `Waves transfer energy without transferring matter. Transverse waves: oscillation perpendicular to propagation (light, water waves). Longitudinal waves: oscillation parallel to propagation (sound). Key quantities: amplitude (height), wavelength (λ), frequency (f), period (T=1/f), wave speed (v=fλ). Sound travels at ~343 m/s in air. Electromagnetic waves travel at speed of light (3×10⁸ m/s). Wave phenomena: reflection, refraction, diffraction, interference (constructive and destructive), polarization. Doppler effect: frequency shifts when source/observer moves.`,

    gravitation: `Gravitation is the universal attractive force between all masses. Newton's Law of Universal Gravitation: F = Gm₁m₂/r². G = 6.674×10⁻¹¹ N·m²/kg². Earth's gravitational acceleration: g ≈ 9.8 m/s². Gravitational potential energy: PE = mgh (near surface), PE = -GMm/r (general). Escape velocity: v = √(2GM/R). Kepler's laws of planetary motion: 1) elliptical orbits, 2) equal areas in equal time, 3) T² ∝ r³. Satellites, tides, and black holes are gravitational phenomena.`,

    optics: `Optics studies light behavior. Reflection: angle of incidence = angle of reflection. Refraction: bending of light when passing between media; Snell's Law: n₁sinθ₁ = n₂sinθ₂. Total internal reflection occurs above critical angle. Lenses: convex (converging) form real/virtual images; concave (diverging) form virtual images. Lens formula: 1/f = 1/v - 1/u. Magnification = v/u. Applications: cameras, telescopes, microscopes, fiber optics, human eye. Dispersion: prism splits white light into spectrum.`,
  },

  chemistry: {
    periodic_table: `The periodic table organizes 118 elements by atomic number, electron configuration, and recurring properties. Groups (vertical columns) share chemical properties; periods (rows) show trends. Key groups: alkali metals (Group 1, reactive), alkaline earth metals (Group 2), halogens (Group 17, reactive nonmetals), noble gases (Group 18, inert). Periodic trends: atomic radius decreases across period (increases down group); ionization energy and electronegativity increase across period. Metals, nonmetals, and metalloids have distinct properties. Transition metals form colored compounds and multiple oxidation states.`,

    chemical_bonding: `Chemical bonds hold atoms together. Ionic bonds: transfer of electrons between metals and nonmetals; form crystal lattices (NaCl). Covalent bonds: sharing of electrons between nonmetals; can be single, double, or triple (H₂, O₂, N₂). Polar covalent bonds: unequal sharing due to electronegativity differences (H₂O, HCl). Metallic bonds: sea of delocalized electrons. VSEPR theory predicts molecular geometry based on electron pairs. Bond strength: triple > double > single. Bond length: triple < double < single. Van der Waals forces, hydrogen bonds, and dipole-dipole interactions are intermolecular forces.`,

    acids_bases: `Acids donate protons (H⁺) or accept electron pairs; bases accept protons or donate electron pairs (Bronsted-Lowry and Lewis definitions). Strength measured by pH (0-14): pH < 7 acidic, pH = 7 neutral, pH > 7 basic. Strong acids: HCl, H₂SO₄, HNO₃. Strong bases: NaOH, KOH. Neutralization: acid + base → salt + water. Buffer solutions resist pH changes (important in blood, pH 7.4). Ka (acid dissociation constant) and Kb (base dissociation constant) measure strength. Titration determines concentration. Indicators like litmus and phenolphthalein change color at specific pH.`,
  },

  biology: {
    evolution: `Evolution is the change in heritable characteristics of populations over generations through natural selection and genetic variation. Darwin's theory: individuals with favorable variations survive and reproduce more (survival of the fittest). Evidence: fossil record, comparative anatomy (homologous structures), molecular biology (DNA similarities), biogeography. Mechanisms: natural selection, mutation, genetic drift, gene flow. Speciation: geographic isolation leads to reproductive isolation and new species. Human evolution: ~7 million years from common ancestor with chimps; key ancestors include Australopithecus, Homo habilis, Homo erectus, Homo sapiens.`,

    genetics: `Genetics studies heredity and variation. DNA (deoxyribonucleic acid) carries genetic information in base pairs (A-T, G-C). Genes are specific DNA sequences that code for proteins. Chromosomes: humans have 46 (23 pairs). Mendel's laws: law of segregation, law of independent assortment. Dominant vs recessive alleles: dominant trait expressed when even one copy present. Punnett squares predict offspring ratios. Codominance (AB blood type), incomplete dominance, sex-linked traits are exceptions. DNA replication, transcription (DNA→RNA), translation (RNA→protein) are central processes.`,

    human_body: `The human body has 11 organ systems: skeletal (206 bones, support/protection), muscular (movement), circulatory (heart, blood vessels, blood), respiratory (lungs, gas exchange), digestive (breaks down food, absorbs nutrients), nervous (brain, spinal cord, nerves, control), endocrine (hormones, glands), urinary (kidneys, waste removal), reproductive, immune (defense against pathogens), integumentary (skin, hair, nails). Homeostasis maintains stable internal conditions (temperature, pH, blood glucose). The heart pumps blood in two circuits: pulmonary (lungs) and systemic (body).`,
  },

  english: {
    grammar: `English grammar covers parts of speech: nouns (people/places/things), pronouns (he/she/it/they), verbs (action/state), adjectives (describe nouns), adverbs (describe verbs/adjectives), prepositions (spatial/temporal relationships), conjunctions (connect clauses), interjections (exclamations). Sentence structure: subject + verb + object. Tenses: simple, continuous, perfect, perfect continuous in past/present/future. Active vs passive voice. Clauses: independent (complete thought), dependent (incomplete). Common errors: subject-verb agreement, dangling modifiers, comma splices, run-on sentences.`,

    literature: `Literature includes poetry, prose (fiction/non-fiction), and drama. Poetry elements: imagery, metaphor, simile, alliteration, rhyme, rhythm, meter, stanza. Prose elements: plot (exposition, rising action, climax, falling action, resolution), character (protagonist, antagonist), setting, theme, point of view, conflict. Major literary movements: Romanticism, Realism, Modernism, Postmodernism. Indian English literature: R.K. Narayan (Malgudi Days), Rabindranath Tagore (Gitanjali, Nobel laureate), Arundhati Roy (The God of Small Things). Shakespeare's major works: Hamlet, Macbeth, Romeo and Juliet, A Midsummer Night's Dream.`,
  },
};

export function findCurriculumContent(subject: string, topic: string): string | null {
  const subjectKey = subject.toLowerCase().replace(/\s+/g, "_");
  const topicKey = topic.toLowerCase().replace(/\s+/g, "_");
  
  const subjectData = CURRICULUM_DB[subjectKey];
  if (!subjectData) return null;
  
  for (const [key, content] of Object.entries(subjectData)) {
    if (key.includes(topicKey) || topicKey.includes(key) || 
        topic.toLowerCase().split(" ").some(word => key.includes(word) && word.length > 3)) {
      return content;
    }
  }
  
  const values = Object.values(subjectData);
  if (values.length > 0) return values[0];
  
  return null;
}
