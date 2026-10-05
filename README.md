# AQA A-level Biology, topic by topic

One HTML file that draws the **whole AQA A-level Biology (7402) course** as a single, simulated **four-spot-ink risograph poster**. Every topic and subtopic of the specification, all 12 required practicals and every mathematical skill sit on one printed sheet of connected cut-away dioramas. The page prints itself in, tours the sheet in specification order, and lets you pan and zoom anywhere on it.

> **Independent study aid.** Not produced, reviewed or endorsed by AQA. The specification and handbook are AQA’s; every drawing and every word on the page is original. Check anything you rely on against the current specification.

## At a glance

| | |
|---|---|
| File | `index.html`, **1,156,303 bytes** (1.10 MiB; 1129 KiB) |
| Structure | one `<canvas>`, one small overlay (the topic card), a few lines of CSS, one `<script>` |
| Network | exactly **one request**: the page itself. No libraries, fonts, images, image data URIs or external scripts. Canvas 2D only |
| Scenes | **169** (156 content scenes in eight topic blocks, 13 skills scenes) |
| Specification coverage | **442 of 442** content statements of section 3, each tied to a scene by a machine-checked id |
| Required practicals | all **12**, each with the nine facets (principle, variables, controls, apparatus, measurement, calculation, risk, limitation, interpretation) |
| Skills | MS 0.1 to 4.1, AT a to l, PS 1.1 to 4.1, CPAC 1 to 5, AO1 to AO3 |

Open `index.html` in any current browser (it works from `file://`). The topic card uses MathML, so it needs a browser with MathML support (current Chrome, Edge, Firefox and Safari all have it).

## Controls

| Action | Input |
|---|---|
| Pan | drag (inertia on release); arrow keys |
| Zoom | scroll wheel or trackpad, anchored to the cursor; touch pinch; `+` and `-` |
| Fly to a scene | double-click or double-tap it (double-click empty paper to zoom in there) |
| Previous / next scene | `Shift` + `←` / `→`, or `PageUp` / `PageDown` |
| Fit the whole sheet | `0` |
| Show or hide the topic card | `C` |
| Start or pause the guided tour | `Space` |
| Pause the tour | any input at all; it resumes by itself after a short rest |

On load the sheet slides onto the press, the four inks print in turn (yellow, pink, teal, blue), and a camera tour visits every scene in specification order (about 7 seconds each). On a phone the topic card becomes a bottom sheet. The card fades out while the camera moves and back in when it settles.

## The topic card

One card for whichever scene is in view: the **official section number and title**, a short specification-aligned explanation, key terms, one equation or data skill (typeset as real maths with MathML), and a short retrieval question (tap it to reveal the answer). It is the only text outside the poster itself; the poster carries minimal labelling, as a revision map should.

## The four inks

| Ink | Hex | Screen angle | What it means on the sheet |
|---|---|---|---|
| Yellow | `#FFE800` | 0° | energy and light (ATP, photons), lipids, carbohydrate |
| Fluorescent pink | `#FF48B0` | 75° | proteins (enzymes, channels, carriers, antibodies, haemoglobin), blood, emphasis |
| Teal | `#00838A` | 15° | water and aqueous compartments, membranes, nucleic-acid bases |
| Federal blue | `#3D5588` | 45° | linework, text, DNA backbones, scale bars |

Paper is warm cream `#F2E8D2`. Overprinting is what makes the other colours: teal over yellow is **green** (plants, chloroplasts), pink over yellow is **red-orange** (oxygen, oxygenated blood), pink over blue is **violet** (deoxygenated), teal over blue is a deep blue-green. The title block carries this legend.

## How the print simulation works

1. **Hand-drawn linework.** Every scene is drawn once per *variant* (three variants) into a display list of **tapered, wobbling polygons**. The wobble is coherent value-noise displacement perpendicular to each stroke, seeded from the scene id, so the result is **deterministic**: two loads give byte-identical pixels. The structure is identical across variants; only the hand tremor differs. The page cycles the variants at about 3 Hz, so the linework “boils” like hand-inked animation.
2. **Separations.** Each ink gets its own plate (an alpha canvas). Plates are drawn with their own **misregistration** (a small constant offset and a tiny rotation about the sheet centre, different for each ink), so colours fringe at edges and the registration targets on the sheet edges show the error.
3. **Halftone screens.** Each ink is screened at its own angle (0°, 75°, 15°, 45°). Screens are clustered dots on **integer lattices**, which makes them exactly periodic, so threshold maps are small precomputed tables. A coarser lattice takes over as you zoom out so the dots stay legible. A fixed jitter table shifts dots slightly. For a pixel with plate coverage $c_i$ and threshold $\theta_i(x,y)$, the ink amount is
   $$a_i = \operatorname{clamp}\bigl(7\,(c_i - \theta_i - j) + \tfrac12,\ 0,\ 1\bigr)\,\rho_i(x,y)$$
   where $j$ is the dot jitter and $\rho_i$ is the ink **density map** (roller streaks, starved patches, and random dropout specks, per ink). Solid fills skip the screen.
4. **Multiply overprint on paper.** The pixel colour is the paper colour $\mathbf{p}$ (with fibre and grain texture) multiplied by each ink in turn, with $\mathbf{k}_i$ the ink colour:
   $$\mathbf{C} = \mathbf{p}\ \odot \prod_{i\in\{Y,P,T,B\}} \bigl(\mathbf{1} - a_i\,(\mathbf{1} - \mathbf{k}_i)\bigr)$$
5. **Tile pyramid and caching.** The sheet is $4000 \times 3000$ world units. It is baked into $512$-pixel tiles at half-octave zoom levels, only where you are looking, in time-sliced jobs so the page stays responsive. Tiles are cached per variant (with a memory budget that is smaller on phones). While a tile bakes, a coarser level stands in. Detail is crisp on a 4K canvas (the backing store is capped at about 8.6 megapixels).
6. **Animated layer.** Small moving parts (ions, electrons, blood cells, tokens on cycles) are drawn each frame over the cached tiles, only for scenes large enough on screen to matter.
7. **Press print-in.** The sheet slides onto the bed; four colour passes sweep down the page in print order (yellow, pink, teal, blue) with a roller bar, using overview tiles that are baked in sweep order.

## Sheet layout

Ten blocks in a $5 \times 2$ snake. The top row runs 3.1 to 3.5 left to right; the bottom row returns from 3.6 on the right through 3.7, 3.8 and the Skills block to the title block on the left. Each topic block is a cut-away diorama (3.1 a water droplet with hydrogen-bonded water and an α-helix, 3.2 a cell cut open, 3.3 an airway tree, 3.4 a nucleus unravelling to DNA, 3.5 a sunlit landscape with soil, 3.6 neurones, 3.7 hills and a river with beetles, 3.8 a lab bench, Skills graph paper and a calculator) with its scenes set on it as windows. Faint dotted teal **pathways** link related ideas across topics (for example ATP, membranes, enzymes and DNA). Crop marks, registration targets, an ink swatch strip (solids, tint ramps and overprint pairs) and a slug line sit on the margins.

**Assessment grammar, by composition only.** AO1 (knowledge) windows have a plain frame; AO2 (application) a double frame; AO3 (analysis and evaluation) a frame with hatched corners. Chains of reasoning are drawn as causal arrow chains. There is no exam commentary on the sheet.

**DNA motif.** Every scene carries a small double helix. Where DNA is biologically involved (52 scenes) it is drawn as the real structure. In the other 117 it is a printer’s colophon mark by the scene number, never placed so as to suggest DNA is involved where it is not.

## Scene list (tour order)

### 3.1  Biological molecules

| Scene | Title | Shows |
|---|---|---|
| `3.1.1` | Monomers and polymers |  |
| `3.1.2a` | Carbohydrates | Monosaccharides, disaccharides and the glycosidic bond |
| `3.1.2b` | Carbohydrates | Polysaccharides, structure and function, and food tests |
| `3.1.3` | Lipids |  |
| `3.1.4.1` | General properties of proteins |  |
| `3.1.4.2a` | Many proteins are enzymes | How enzymes work |
| `3.1.4.2b` | Many proteins are enzymes | Factors affecting the rate of enzyme-controlled reactions |
| `RP1` **RP1** | Many proteins are enzymes | Required practical 1: effect of a named variable on the rate of an enzyme-controlled reaction |
| `3.1.5.1` | Structure of DNA and RNA |  |
| `3.1.5.2` | DNA replication |  |
| `3.1.6` | ATP |  |
| `3.1.7` | Water |  |
| `3.1.8` | Inorganic ions |  |

### 3.2  Cells

| Scene | Title | Shows |
|---|---|---|
| `3.2.1.1` | Structure of eukaryotic cells |  |
| `3.2.1.2` | Structure of prokaryotic cells and of viruses |  |
| `3.2.1.3a` | Methods of studying cells | Microscopy: magnification and resolution |
| `3.2.1.3b` | Methods of studying cells | Cell fractionation and ultracentrifugation |
| `3.2.2a` | All cells arise from other cells | The cell cycle and the stages of mitosis |
| `3.2.2b` | All cells arise from other cells | Binary fission, virus replication and uncontrolled division |
| `RP2` **RP2** | All cells arise from other cells | Required practical 2: stained root-tip squash, microscope, mitotic index |
| `3.2.3a` | Transport across cell membranes | Membrane structure: the fluid-mosaic model |
| `3.2.3b` | Transport across cell membranes | Simple and facilitated diffusion, osmosis, active transport |
| `3.2.3c` | Transport across cell membranes | Co-transport in the ileum; what affects the rate of transport |
| `RP3` **RP3** | Transport across cell membranes | Required practical 3: dilution series and calibration curve for the water potential of plant tissue |
| `RP4` **RP4** | Transport across cell membranes | Required practical 4: effect of a named variable on the permeability of cell-surface membranes |
| `3.2.4a` | Cell recognition and the immune system | Cell recognition: antigens and antigen variability |
| `3.2.4b` | Cell recognition and the immune system | Phagocytosis of pathogens and destruction by lysozymes |
| `3.2.4c` | Cell recognition and the immune system | The cellular response: antigen-presenting cells and T lymphocytes |
| `3.2.4d` | Cell recognition and the immune system | The humoral response: B lymphocytes, clonal selection, plasma and memory cells |
| `3.2.4e` | Cell recognition and the immune system | Antibody structure; antigen-antibody complex, agglutination and phagocytosis |
| `3.2.4f` | Cell recognition and the immune system | Primary and secondary immune responses: plasma and memory cells |
| `3.2.4g` | Cell recognition and the immune system | Vaccines, active and passive immunity, herd immunity |
| `3.2.4h` | Cell recognition and the immune system | HIV: structure, replication in helper T cells, AIDS; antibiotics and viruses |
| `3.2.4i` | Cell recognition and the immune system | Monoclonal antibodies in medicine, the ELISA test, ethical issues |

### 3.3  Organisms exchange substances with their environment

| Scene | Title | Shows |
|---|---|---|
| `3.3.1` | Surface area to volume ratio | Surface area to volume ratio |
| `3.3.2a` | Gas exchange | Gas exchange: body surface of a single-celled organism; insect tracheal system |
| `3.3.2b` | Gas exchange | Gas exchange across the gills of a fish: counter-current principle |
| `3.3.2c` | Gas exchange | Gas exchange in the leaves of dicotyledonous plants: mesophyll and stomata |
| `3.3.2d` | Gas exchange | Structural and functional compromises: terrestrial insects and xerophytic plants |
| `3.3.2e` | Gas exchange | The human gas exchange system: trachea, bronchi, bronchioles, alveoli, lungs |
| `3.3.2f` | Gas exchange | The alveolar epithelium: features of the exchange surface |
| `3.3.2g` | Gas exchange | Ventilation: diaphragm and antagonistic intercostal muscles; pulmonary ventilation rate |
| `3.3.2h` | Gas exchange | Lung disease and risk factors: interpreting data, correlation and causation |
| `3.3.3a` | Digestion and absorption | Digestion in mammals: carbohydrates, lipids and proteins |
| `3.3.3b` | Digestion and absorption | Absorption in the ileum: co-transport and micelles |
| `3.3.4.1a` | Mass transport in animals | Haemoglobin and red blood cells: loading, transport and unloading of oxygen |
| `3.3.4.1b` | Mass transport in animals | The oxyhaemoglobin dissociation curve and cooperative binding of oxygen |
| `3.3.4.1c` | Mass transport in animals | The Bohr effect; haemoglobins adapted to different environments |
| `3.3.4.1d` | Mass transport in animals | General pattern of blood circulation in a mammal: heart, lungs, kidneys |
| `3.3.4.1e` | Mass transport in animals | Gross structure of the human heart |
| `3.3.4.1f` | Mass transport in animals | The cardiac cycle: pressure, volume and valve movements |
| `3.3.4.1g` | Mass transport in animals | Structure of arteries, arterioles and veins in relation to function |
| `3.3.4.1h` | Mass transport in animals | Capillaries as exchange surfaces; formation and return of tissue fluid |
| `3.3.4.1i` | Mass transport in animals | Cardiovascular disease: risk-factor data, conflicting evidence, correlation and causation |
| `RP5` **RP5** | Mass transport in animals | Required practical 5: dissection of a gas exchange or mass transport system, or an organ within it |
| `3.3.4.2a` | Mass transport in plants | Xylem and the cohesion-tension theory of water transport |
| `3.3.4.2b` | Mass transport in plants | Phloem and the mass flow hypothesis of translocation |
| `3.3.4.2c` | Mass transport in plants | Tracer and ringing experiments: evidence for and against the mass flow hypothesis |
| `3.3.4.2d` | Mass transport in plants | Skills opportunity: a potometer estimates the rate of transpiration (AT b) |

### 3.4  Genetic information, variation and relationships between organisms

| Scene | Title | Shows |
|---|---|---|
| `3.4.1a` | DNA, genes and chromosomes | DNA in prokaryotic cells, in the nucleus of eukaryotic cells, and in mitochondria and chloroplasts |
| `3.4.1b` | DNA, genes and chromosomes | Genes and loci; the triplet code and its properties |
| `3.4.1c` | DNA, genes and chromosomes | Non-coding DNA: multiple repeats, exons and introns |
| `3.4.2a` | DNA and protein synthesis | Genome and proteome; structure of mRNA and tRNA |
| `3.4.2b` | DNA and protein synthesis | Transcription: RNA polymerase; pre-mRNA splicing in eukaryotes |
| `3.4.2c` | DNA and protein synthesis | Translation: ribosomes, tRNA and ATP |
| `3.4.3a` | Genetic diversity: mutation and meiosis | Gene mutations: base substitution and deletion; mutagenic agents |
| `3.4.3b` | Genetic diversity: mutation and meiosis | Mutations in chromosome number: non-disjunction during meiosis |
| `3.4.3c` | Genetic diversity: mutation and meiosis | Meiosis: two divisions, independent segregation, crossing over |
| `3.4.3d` | Genetic diversity: mutation and meiosis | Mitosis and meiosis compared; combinations of chromosomes: 2ⁿ; random fertilisation |
| `3.4.4a` | Genetic diversity and adaptation | Genetic diversity, natural selection and antibiotic resistance |
| `3.4.4b` | Genetic diversity and adaptation | Directional and stabilising selection; anatomical, physiological and behavioural adaptation |
| `RP6` **RP6** | Genetic diversity and adaptation | Required practical 6: aseptic techniques to investigate the effect of antimicrobial substances on microbial growth |
| `3.4.5a` | Species and taxonomy | Species: fertile offspring; courtship and species recognition |
| `3.4.5b` | Species and taxonomy | Phylogenetic classification: taxa, hierarchy and binomial naming; evidence from immunology and sequencing |
| `3.4.6a` | Biodiversity within a community | Biodiversity in a community: species richness and index of diversity |
| `3.4.6b` | Biodiversity within a community | Farming techniques reduce biodiversity; the balance between conservation and farming |
| `3.4.7a` | Investigating diversity | Investigating diversity: observable characteristics, DNA, mRNA and amino acid sequences |
| `3.4.7b` | Investigating diversity | Quantitative variation within a species: random samples, mean and standard deviation |

### 3.5  Energy transfers in and between organisms

| Scene | Title | Shows |
|---|---|---|
| `3.5` | Energy transfers in and between organisms | Energy transfers in and between organisms: overview |
| `3.5.1a` | Photosynthesis | Photosynthesis: the light-dependent reaction |
| `3.5.1b` | Photosynthesis | Photosynthesis: the light-independent reaction (Calvin cycle) |
| `3.5.1c` | Photosynthesis | Environmental factors limiting the rate of photosynthesis |
| `RP7` **RP7** | Photosynthesis | Required practical 7: chromatography to investigate leaf pigments |
| `RP8` **RP8** | Photosynthesis | Required practical 8: effect of a named factor on dehydrogenase activity in chloroplast extracts |
| `3.5.1d` | Photosynthesis | Agricultural practices that overcome limiting factors: evaluating data |
| `3.5.2a` | Respiration | Respiration produces ATP: glycolysis in the cytoplasm |
| `3.5.2b` | Respiration | Anaerobic respiration: lactate and ethanol; regenerating NAD |
| `3.5.2c` | Respiration | Aerobic respiration in the mitochondrial matrix: link reaction and Krebs cycle |
| `3.5.2d` | Respiration | Oxidative phosphorylation: electron transfer chain and ATP synthase; other respiratory substrates |
| `RP9` **RP9** | Respiration | Required practical 9: effect of a named variable on the rate of respiration of single-celled organisms |
| `3.5.3a` | Energy and ecosystems | Primary production and the chemical energy store in biomass: GPP, NPP and R |
| `3.5.3b` | Energy and ecosystems | Net production of consumers, efficiency of transfer, farming practices |
| `3.5.3c` | Energy and ecosystems | Farming practices that increase the efficiency of energy transfer |
| `3.5.4a` | Nutrient cycles | Nitrogen cycle: saprobiotic nutrition, ammonification, nitrification, nitrogen fixation, denitrification |
| `3.5.4b` | Nutrient cycles | Phosphorus cycle; mycorrhizae; fertilisers, leaching and eutrophication |

### 3.6  Organisms respond to changes in their internal and external environments

| Scene | Title | Shows |
|---|---|---|
| `3.6` | Organisms respond to changes in their internal and external environments | Stimulus, receptor, coordinator and effector; nervous and hormonal coordination |
| `3.6.1.1a` | Survival and response | Plant responses: IAA, cell elongation, phototropism and gravitropism |
| `3.6.1.1b` | Survival and response | Taxes and kineses: simple responses that keep a mobile organism in a favourable environment |
| `3.6.1.1c` | Survival and response | The protective effect of a simple reflex: three-neurone reflex arc |
| `RP10` **RP10** | Survival and response | Required practical 10: effect of an environmental variable on movement of an animal (choice chamber or maze) |
| `3.6.1.2a` | Receptors | The Pacinian corpuscle: stretch-mediated sodium ion channels and the generator potential |
| `3.6.1.2b` | Receptors | The human retina: rods and cones, sensitivity, colour and visual acuity |
| `3.6.1.3` | Control of heart rate | Control of heart rate: SAN, AVN, Purkyne tissue; chemoreceptors and pressure receptors |
| `3.6.2.1a` | Nerve impulses | Structure of a myelinated motor neurone; the resting potential |
| `3.6.2.1b` | Nerve impulses | Depolarisation, repolarisation and hyperpolarisation: the action potential and the all-or-nothing principle |
| `3.6.2.1c` | Nerve impulses | Passage of an action potential; saltatory conduction; refractory period; factors affecting speed |
| `3.6.2.2a` | Synaptic transmission | Transmission across a cholinergic synapse: sequence of events and unidirectionality |
| `3.6.2.2b` | Synaptic transmission | Summation, inhibitory synapses, the neuromuscular junction and the effect of drugs |
| `3.6.3a` | Skeletal muscles | Antagonistic pairs; skeletal muscle from muscle to myofibril |
| `3.6.3b` | Skeletal muscles | Ultrastructure of a myofibril: sarcomere bands in relaxed and contracted muscle |
| `3.6.3c` | Skeletal muscles | Cross-bridge cycle, ATP and phosphocreatine, slow and fast fibres |
| `3.6.4.1` | Principles of homeostasis and negative feedback | Principles of homeostasis and negative feedback |
| `3.6.4.2a` | Control of blood glucose concentration | Blood glucose: factors, pancreas, liver and the two feedback loops |
| `3.6.4.2b` | Control of blood glucose concentration | Insulin; adrenaline and glucagon with the second messenger cAMP |
| `3.6.4.2c` | Control of blood glucose concentration | Type I and type II diabetes; health advisers and the food industry |
| `RP11` **RP11** | Control of blood glucose concentration | Required practical 11: dilution series and calibration curve to find glucose in a “urine” sample |
| `3.6.4.3a` | Control of blood water potential | Osmoregulation: hypothalamus, posterior pituitary and ADH |
| `3.6.4.3b` | Control of blood water potential | The nephron: filtration, reabsorption and the loop of Henle |
| `3.6.4.3c` | Control of blood water potential | Sodium ion gradient, ADH and aquaporins, and loop length |
| `3.6.4.3d` | Control of blood water potential | Proximal convoluted tubule: reabsorption of glucose and water |

### 3.7  Genetics, populations, evolution and ecosystems

| Scene | Title | Shows |
|---|---|---|
| `3.7` | Genetics, populations, evolution and ecosystems | Evolution, common ancestry, populations and communities |
| `3.7.1a` | Inheritance | Genotype and phenotype; monohybrid crosses with dominant, recessive, codominant and multiple alleles |
| `3.7.1b` | Inheritance | Dihybrid crosses: 9 : 3 : 3 : 1 and the test cross |
| `3.7.1c` | Inheritance | Sex-linked inheritance: X-linked recessive conditions |
| `3.7.1d` | Inheritance | Autosomal linkage and crossing over |
| `3.7.1e` | Inheritance | Epistasis: recessive (9 : 3 : 4) and dominant (12 : 3 : 1) |
| `3.7.1f` | Inheritance | Chi-squared test for goodness of fit of phenotypic ratios |
| `3.7.2` | Populations | Gene pool, allele frequency and the Hardy–Weinberg equation |
| `3.7.3a` | Evolution may lead to speciation | Sources of variation and natural selection |
| `3.7.3b` | Evolution may lead to speciation | Stabilising, directional and disruptive selection |
| `3.7.3c` | Evolution may lead to speciation | Genetic drift is important in small populations |
| `3.7.3d` | Evolution may lead to speciation | Reproductive separation: allopatric and sympatric speciation |
| `3.7.4a` | Populations in ecosystems | Community, ecosystem, niche and carrying capacity |
| `3.7.4b` | Populations in ecosystems | Interspecific and intraspecific competition; predator-prey cycles |
| `3.7.4c` | Populations in ecosystems | Estimating population size with random quadrats and belt transects |
| `3.7.4d` | Populations in ecosystems | Mark-release-recapture for motile organisms |
| `3.7.4e` | Populations in ecosystems | Primary succession from pioneer species to climax community |
| `3.7.4f` | Populations in ecosystems | Conservation: managing succession and balancing human needs |
| `RP12` **RP12** | Populations in ecosystems | Required practical 12: effect of a named environmental factor on the distribution of a given species |

### 3.8  The control of gene expression

| Scene | Title | Shows |
|---|---|---|
| `3.8` | The control of gene expression | Cells control their activities by regulating transcription and translation |
| `3.8.1a` | Alteration of the sequence of bases in DNA can alter the structure of proteins | Gene mutations: addition, deletion, substitution, inversion, duplication, translocation |
| `3.8.1b` | Alteration of the sequence of bases in DNA can alter the structure of proteins | Effects on the polypeptide: silent mutations and frame shifts |
| `3.8.2.1a` | Most of a cell’s DNA is not translated | Totipotent, pluripotent, multipotent and unipotent cells |
| `3.8.2.1b` | Most of a cell’s DNA is not translated | Pluripotent and induced pluripotent stem cells in treating human disorders |
| `3.8.2.2a` | Regulation of transcription and translation | Transcription factors and the steroid hormone oestrogen |
| `3.8.2.2b` | Regulation of transcription and translation | Epigenetic control: increased DNA methylation and decreased histone acetylation |
| `3.8.2.2c` | Regulation of transcription and translation | RNA interference, and evaluating genetic and environmental influences on phenotype |
| `3.8.2.3a` | Gene expression and cancer | Benign and malignant tumours; oncogenes, tumour suppressor genes and abnormal methylation |
| `3.8.2.3b` | Gene expression and cancer | Evaluating evidence for genetic and environmental factors in cancer, and using it to prevent and treat |
| `3.8.3` | Using genome projects | Genome projects, the proteome and automated sequencing |
| `3.8.4.1a` | Recombinant DNA technology | Recombinant DNA: making fragments with reverse transcriptase, restriction enzymes and a gene machine |
| `3.8.4.1b` | Recombinant DNA technology | In vitro amplification: the polymerase chain reaction (PCR) |
| `3.8.4.1c` | Recombinant DNA technology | In vivo amplification: vectors, ligase, transformation and marker genes |
| `3.8.4.1d` | Recombinant DNA technology | Applications, gene therapy and the ethical, financial and social issues |
| `3.8.4.2` | Differences in DNA between individuals can be exploited for identification and diagnosis of heritable conditions | Labelled DNA probes, hybridisation and screening |
| `3.8.4.3` | Genetic fingerprinting | VNTRs, PCR and gel electrophoresis: genetic fingerprinting |

### Skills

| Scene | Title | Shows |
|---|---|---|
| `SK.AO` | Assessment objectives | Assessment objectives (spec 4.2) and how this poster shows them |
| `SK.MS0` | Arithmetic and numerical computation | Arithmetic: units, standard form, ratios, estimating, calculators (MS 0.1–0.5) |
| `SK.MS1a` | Handling data | Handling data: sig figs, mean, tables and charts, probability, sampling (MS 1.1–1.5) |
| `SK.MS1b` | Handling data | Median and mode, scatter diagrams, magnification and order of magnitude (MS 1.6–1.8) |
| `SK.MS1c` | Statistical tests | Statistical tests: chi-squared, Student’s t-test and the correlation coefficient (MS 1.9) |
| `SK.MS1d` | Dispersion and uncertainty | Dispersion (range, standard deviation) and uncertainty (MS 1.10–1.11) |
| `SK.MS2` | Algebra | Algebra: symbols, rearranging, substituting, solving, logarithms (MS 2.1–2.5) |
| `SK.MS3` | Graphs | Graphs: translating, plotting, y = mx + c, intercept, rate and the tangent (MS 3.1–3.6) |
| `SK.MS4` | Geometry and trigonometry | Geometry: circumference, area, surface area and volume (MS 4.1) |
| `SK.AT` | Use of apparatus and techniques | Apparatus and techniques (spec 8.1): the twelve skills and where each is used |
| `SK.PS` | Practical skills | Practical skills assessed in written papers (spec 8.3) |
| `SK.CPAC` | Practical endorsement | Common Practical Assessment Criteria for the practical endorsement (spec 8.4) |
| `SK.RP` | Required practical activities | The twelve required practicals (spec 8.2) mapped to topics, techniques and scenes |

## Specification mapping

Section 3 of the specification is split, as I segmented it, into **442 content statements** (the individual teachable sentences and bullets), numbered in order within its section: `3.2.3.s7` is the seventh statement of section 3.2.3. Each scene declares which statements it draws, and the page checks the lot at load. The same table is in the HTML comment at the top of `index.html`.

```text
3.1.1    : s1-s6 -> 3.1.1   [6 statements]
3.1.2    : s1-s5 -> 3.1.2a; s6-s10 -> 3.1.2b   [10 statements]
3.1.3    : s1-s7 -> 3.1.3   [7 statements]
3.1.4.1  : s1-s8 -> 3.1.4.1   [8 statements]
3.1.4.2  : s1-s4, s8-s9 -> 3.1.4.2a; s5-s7, s10-s11 -> 3.1.4.2b   [11 statements]
3.1.5.1  : s1-s9 -> 3.1.5.1   [9 statements]
3.1.5.2  : s1-s7 -> 3.1.5.2   [7 statements]
3.1.6    : s1-s5 -> 3.1.6   [5 statements]
3.1.7    : s1-s6 -> 3.1.7   [6 statements]
3.1.8    : s1-s6 -> 3.1.8   [6 statements]
3.2.1.1  : s1-s11 -> 3.2.1.1   [11 statements]
3.2.1.2  : s1-s7 -> 3.2.1.2   [7 statements]
3.2.1.3  : s1-s4 -> 3.2.1.3a; s5-s6 -> 3.2.1.3b   [6 statements]
3.2.2    : s1-s7 -> 3.2.2a; s8-s10 -> 3.2.2b   [10 statements]
3.2.3    : s1-s3 -> 3.2.3a; s4-s7 -> 3.2.3b; s8-s11 -> 3.2.3c   [11 statements]
3.2.4    : s1-s2 -> 3.2.4a; s3 -> 3.2.4b; s4-s6 -> 3.2.4c; s7, s11 -> 3.2.4d; s8-s10 -> 3.2.4e; s11 -> 3.2.4f; s12-s13, s20-s21 -> 3.2.4g; s14-s15 -> 3.2.4h; s16-s21 -> 3.2.4i   [21 statements]
3.3.1    : s1-s3 -> 3.3.1   [3 statements]
3.3.2    : s1-s2 -> 3.3.2a; s3 -> 3.3.2b; s4 -> 3.3.2c; s5 -> 3.3.2d; s6 -> 3.3.2e; s7 -> 3.3.2f; s8 -> 3.3.2g; s9-s13 -> 3.3.2h   [13 statements]
3.3.3    : s1-s4 -> 3.3.3a; s5-s7 -> 3.3.3b   [7 statements]
3.3.4.1  : s1-s2 -> 3.3.4.1a; s2 -> 3.3.4.1b; s3-s4 -> 3.3.4.1c; s5 -> 3.3.4.1d; s6 -> 3.3.4.1e; s7, s11 -> 3.3.4.1f; s8 -> 3.3.4.1g; s9-s10 -> 3.3.4.1h; s12-s14 -> 3.3.4.1i   [14 statements]
3.3.4.2  : s1-s2 -> 3.3.4.2a; s3-s4 -> 3.3.4.2b; s5-s6 -> 3.3.4.2c; s7 -> 3.3.4.2d   [7 statements]
3.4.1    : s1-s3 -> 3.4.1a; s4-s6 -> 3.4.1b; s7 -> 3.4.1c   [7 statements]
3.4.2    : s1-s2 -> 3.4.2a; s3-s5 -> 3.4.2b; s6-s8 -> 3.4.2c   [8 statements]
3.4.3    : s1-s3 -> 3.4.3a; s4 -> 3.4.3b; s5-s7 -> 3.4.3c; s8-s11 -> 3.4.3d   [11 statements]
3.4.4    : s1-s4 -> 3.4.4a; s5-s7 -> 3.4.4b   [7 statements]
3.4.5    : s1-s2 -> 3.4.5a; s3-s6 -> 3.4.5b   [6 statements]
3.4.6    : s1-s4 -> 3.4.6a; s5 -> 3.4.6b   [5 statements]
3.4.7    : s1-s3 -> 3.4.7a; s4-s6 -> 3.4.7b   [6 statements]
3.5      : s1-s7 -> 3.5   [7 statements]
3.5.1    : s1-s5 -> 3.5.1a; s6-s9 -> 3.5.1b; s10 -> 3.5.1c; s11 -> 3.5.1d   [11 statements]
3.5.2    : s1-s3 -> 3.5.2a; s4 -> 3.5.2b; s5-s8 -> 3.5.2c; s9-s10 -> 3.5.2d   [10 statements]
3.5.3    : s1-s5 -> 3.5.3a; s6-s7 -> 3.5.3b; s8-s9 -> 3.5.3c   [9 statements]
3.5.4    : s1-s3, s5 -> 3.5.4a; s4, s6-s8 -> 3.5.4b   [8 statements]
3.6      : s1-s5 -> 3.6   [5 statements]
3.6.1.1  : s1-s3 -> 3.6.1.1a; s4 -> 3.6.1.1b; s5 -> 3.6.1.1c   [5 statements]
3.6.1.2  : s1-s3 -> 3.6.1.2a; s4 -> 3.6.1.2b   [4 statements]
3.6.1.3  : s1-s3 -> 3.6.1.3   [3 statements]
3.6.2.1  : s1-s2 -> 3.6.2.1a; s3-s4 -> 3.6.2.1b; s5-s7 -> 3.6.2.1c   [7 statements]
3.6.2.2  : s1-s3 -> 3.6.2.2a; s4-s7 -> 3.6.2.2b   [7 statements]
3.6.3    : s1-s2 -> 3.6.3a; s3 -> 3.6.3b; s4-s7 -> 3.6.3c   [7 statements]
3.6.4.1  : s1-s6 -> 3.6.4.1   [6 statements]
3.6.4.2  : s1-s5 -> 3.6.4.2a; s3-s6 -> 3.6.4.2b; s7-s8 -> 3.6.4.2c   [8 statements]
3.6.4.3  : s1-s2 -> 3.6.4.3a; s3-s7 -> 3.6.4.3b; s6-s7 -> 3.6.4.3c; s5 -> 3.6.4.3d   [7 statements]
3.7      : s1-s7 -> 3.7   [7 statements]
3.7.1    : s1-s6 -> 3.7.1a; s7 -> 3.7.1b; s8 -> 3.7.1c; s8 -> 3.7.1d; s8 -> 3.7.1e; s9 -> 3.7.1f   [9 statements]
3.7.2    : s1-s4 -> 3.7.2   [4 statements]
3.7.3    : s1-s4, s6 -> 3.7.3a; s5 -> 3.7.3b; s7-s8 -> 3.7.3c; s9-s11 -> 3.7.3d   [11 statements]
3.7.4    : s1-s4 -> 3.7.4a; s4 -> 3.7.4b; s5-s6 -> 3.7.4c; s7, s11 -> 3.7.4d; s8-s10 -> 3.7.4e; s12-s14 -> 3.7.4f   [14 statements]
3.8      : s1-s4 -> 3.8   [4 statements]
3.8.1    : s1-s2 -> 3.8.1a; s3-s5 -> 3.8.1b   [5 statements]
3.8.2.1  : s1-s5 -> 3.8.2.1a; s6-s8 -> 3.8.2.1b   [8 statements]
3.8.2.2  : s1-s2 -> 3.8.2.2a; s3-s7 -> 3.8.2.2b; s8-s10 -> 3.8.2.2c   [10 statements]
3.8.2.3  : s1-s4 -> 3.8.2.3a; s5-s6 -> 3.8.2.3b   [6 statements]
3.8.3    : s1-s4 -> 3.8.3   [4 statements]
3.8.4.1  : s1-s4 -> 3.8.4.1a; s5 -> 3.8.4.1b; s6-s9 -> 3.8.4.1c; s10-s13 -> 3.8.4.1d   [13 statements]
3.8.4.2  : s1-s4 -> 3.8.4.2   [4 statements]
3.8.4.3  : s1-s4 -> 3.8.4.3   [4 statements]
```

## Required practicals

Each practical scene shows the principle, independent, dependent and controlled variables, control set-up, apparatus, how measurements are taken, the calculation (with units), risks, limitations, and the interpretation of the results. **The methods are labelled as examples**: AQA’s handbook says teachers may vary every practical, so none of them is presented as *the* official method. The AT letters in the table are those given in specification section 8.2.

| RP | Required practical (specification 8.2 wording, condensed) | Scene | Apparatus and techniques | Maths skills | Practical skills |
|---|---|---|---|---|---|
| RP1 | Effect of a named variable on the rate of an enzyme-controlled reaction (spec 3.1.4.2) | `RP1` | AT a, AT b, AT c, AT f, AT l | MS 0.1, MS 1.11, MS 3.2, MS 3.6, MS 3.3 | PS 2.4, PS 3.3 |
| RP2 | Stained squashes of root-tip cells, optical microscope, mitotic index (spec 3.2.2) | `RP2` | AT d, AT e, AT f | MS 0.3, MS 1.8, MS 1.3 | PS 2.4 |
| RP3 | Dilution series of a solute; calibration curve to find the water potential of plant tissue (spec 3.2.3) | `RP3` | AT c, AT h, AT j, AT l | MS 3.2, MS 3.4, MS 0.3, MS 1.3 | PS 2.3, PS 3.1 |
| RP4 | Effect of a named variable on the permeability of cell-surface membranes (spec 3.2.3) | `RP4` | AT a, AT b, AT c, AT j, AT l | MS 3.2, MS 3.1, MS 1.3 | PS 2.2, PS 4.1 |
| RP5 | Dissection of an animal or plant gas exchange or mass transport system, or an organ within one (spec 3.3.4.1) | `RP5` | AT e, AT h, AT j | MS 1.8, MS 0.1 | PS 1.2, PS 2.2 |
| RP6 | Aseptic technique: effect of antimicrobial substances on microbial growth (spec 3.4.4) | `RP6` | AT c, AT i | MS 0.2, MS 1.2, MS 0.3, MS 4.1 | PS 2.3, PS 4.1 |
| RP7 | Chromatography of pigments isolated from the leaves of different plants (spec 3.5.1) | `RP7` | AT b, AT c, AT g | MS 0.3, MS 1.3, MS 1.2 | PS 2.2, PS 3.1 |
| RP8 | Effect of a named factor on the rate of dehydrogenase activity in chloroplast extracts (spec 3.5.1) | `RP8` | AT a, AT b, AT c | MS 3.1, MS 3.2, MS 1.3 | PS 2.3, PS 3.1 |
| RP9 | Effect of a named variable on the rate of respiration of cultures of single-celled organisms (spec 3.5.2) | `RP9` | AT a, AT b, AT c, AT i | MS 3.1, MS 1.3, MS 0.2 | PS 2.3, PS 3.1 |
| RP10 | Effect of an environmental variable on the movement of an animal (choice chamber or maze) (spec 3.6.1.1) | `RP10` | AT h | MS 1.9, MS 0.3, MS 1.3 | PS 2.2, PS 4.1 |
| RP11 | Dilution series of glucose; colorimetric calibration curve to find the glucose concentration of an unknown “urine” sample (spec 3.6.4.2) | `RP11` | AT b, AT c, AT f | MS 0.2, MS 3.1, MS 3.2 | PS 2.2, PS 3.1, PS 3.3 |
| RP12 | Effect of a named environmental factor on the distribution of a given species (spec 3.7.4) | `RP12` | AT a, AT b, AT h, AT k, AT l | MS 1.5, MS 2.4, MS 1.9 | PS 2.1, PS 2.4, PS 3.3 |

## Mathematical skills (specification section 6)

| Skill | What it asks | Where it is drawn |
|---|---|---|
| MS 0.1 | Use appropriate units in calculations | `SK.MS0`; used in `RP1`, `RP5` |
| MS 0.2 | Use decimal and standard form | `SK.MS0`; used in `RP6`, `RP9`, `RP11` |
| MS 0.3 | Use ratios, fractions and percentages | `SK.MS0`; used in `RP2`, `RP3`, `RP6`, `RP7`, `RP10` |
| MS 0.4 | Estimate results | `SK.MS0` |
| MS 0.5 | Use calculators for power, exponential and logarithmic functions | `SK.MS0` |
| MS 1.1 | Use an appropriate number of significant figures | `SK.MS1a` |
| MS 1.2 | Find arithmetic means | `SK.MS1a`; used in `RP6`, `RP7` |
| MS 1.3 | Construct and interpret frequency tables, bar charts and histograms | `SK.MS1a`; used in `RP2`, `RP3`, `RP4`, `RP7`, `RP8`, `RP9`, `RP10` |
| MS 1.4 | Understand simple probability | `SK.MS1a` |
| MS 1.5 | Understand the principles of sampling | `SK.MS1a`; used in `RP12` |
| MS 1.6 | Understand mean, median and mode | `SK.MS1b` |
| MS 1.7 | Use a scatter diagram to identify a correlation | `SK.MS1b` |
| MS 1.8 | Make order-of-magnitude calculations | `SK.MS1b`; used in `RP2`, `RP5` |
| MS 1.9 | Select and use a statistical test (χ², Student’s t, correlation coefficient) | `SK.MS1c`; used in `RP10`, `RP12` |
| MS 1.10 | Understand measures of dispersion, including standard deviation and range | `SK.MS1d` |
| MS 1.11 | Identify uncertainties; percentage error; combine uncertainties | `SK.MS1d`; used in `RP1` |
| MS 2.1 | Understand and use the symbols =, <, <<, >>, >, ∝, ~ | `SK.MS2` |
| MS 2.2 | Change the subject of an equation | `SK.MS2` |
| MS 2.3 | Substitute numerical values into equations, with units | `SK.MS2` |
| MS 2.4 | Solve algebraic equations | `SK.MS2`; used in `RP12` |
| MS 2.5 | Use logarithms for quantities ranging over orders of magnitude | `SK.MS2` |
| MS 3.1 | Translate between graphical, numerical and algebraic forms | `SK.MS3`; used in `RP4`, `RP8`, `RP9`, `RP11` |
| MS 3.2 | Plot two variables from experimental data | `SK.MS3`; used in `RP1`, `RP3`, `RP4`, `RP8`, `RP11` |
| MS 3.3 | Understand that y = mx + c is a linear relationship | `SK.MS3`; used in `RP1` |
| MS 3.4 | Determine the intercept of a graph | `SK.MS3`; used in `RP3` |
| MS 3.5 | Calculate rate of change from a linear graph | `SK.MS3` |
| MS 3.6 | Draw and use the slope of a tangent to a curve | `SK.MS3`; used in `RP1` |
| MS 4.1 | Calculate circumferences, surface areas and volumes of regular shapes | `SK.MS4`; used in `RP6` |

## Practical skills, apparatus and assessment objectives

| Item | Meaning | Scene(s) | Used in |
|---|---|---|---|
| AT a | apparatus for mass, time, volume, temperature, length, pH | `SK.AT` | RP1, RP4, RP8, RP9, RP12 |
| AT b | instruments, e.g. colorimeter, potometer | `SK.AT` | RP1, RP4, RP7, RP8, RP9, RP11, RP12 |
| AT c | laboratory glassware, serial dilutions | `SK.AT` | RP1, RP3, RP4, RP6, RP7, RP8, RP9, RP11 |
| AT d | light microscope, graticule | `SK.AT` | RP2 |
| AT e | scientific drawing with annotations | `SK.AT` | RP2, RP5 |
| AT f | qualitative reagents for biological molecules | `SK.AT` | RP1, RP2, RP11 |
| AT g | chromatography or electrophoresis | `SK.AT` | RP7 |
| AT h | safe, ethical use of organisms to measure responses | `SK.AT` | RP3, RP5, RP10, RP12 |
| AT i | aseptic techniques | `SK.AT` | RP6, RP9 |
| AT j | dissection | `SK.AT` | RP3, RP4, RP5 |
| AT k | fieldwork sampling | `SK.AT` | RP12 |
| AT l | ICT: modelling, data loggers, software | `SK.AT` | RP1, RP3, RP4, RP12 |
| PS 1.1 | Solve problems set in practical contexts | `SK.PS` |  |
| PS 1.2 | Apply scientific knowledge to practical contexts | `SK.PS` | RP5 |
| PS 2.1 | Comment on experimental design; evaluate methods | `SK.PS` | RP12 |
| PS 2.2 | Present data in appropriate ways | `SK.PS` | RP4, RP5, RP7, RP10, RP11 |
| PS 2.3 | Evaluate results with reference to uncertainties and errors | `SK.PS` | RP3, RP6, RP8, RP9 |
| PS 2.4 | Identify variables, including those to be controlled | `SK.PS` | RP1, RP2, RP12 |
| PS 3.1 | Plot and interpret graphs | `SK.PS` | RP3, RP7, RP8, RP9, RP11 |
| PS 3.2 | Process and analyse data using the maths skills | `SK.PS` |  |
| PS 3.3 | Consider margins of error, accuracy and precision | `SK.PS` | RP1, RP11, RP12 |
| PS 4.1 | Use a wide range of instruments, equipment and techniques | `SK.PS` | RP4, RP6, RP10 |
| CPAC 1 to 5 | the five competencies assessed by teachers (endorsement) | `SK.CPAC` | |
| AO1, AO2, AO3 | assessment objectives (specification 4.2) | `SK.AO` | |

## Coverage check

The script holds a registry of every section 3 statement plus the skills lists, and every scene declares what it covers. At load it computes, and exposes as `window.AQA_COVERAGE` (call `AQA_COVERAGE.check()` in the console):

- statements with no scene, and scene claims that match no statement;
- missing skills (MS, AT, PS, CPAC, AO, RP), duplicate scene ids, tour order against specification order;
- scenes lacking card fields or the DNA motif;
- required-practical scenes missing any of the nine facets.

Result for this build: `ok: true`, 442 of 442 statements covered, 0 uncovered, 0 unknown. The same verdict is printed on the title block of the sheet.

## Accuracy and sources

Subject accuracy came first. Where a textbook differs from the specification, the specification wins. I cross-checked the content against the following, and I say plainly what I could and could not access.

**Read and used**

- **AQA A-level Biology specification 7401/7402, version 1.6** (from aqa.org.uk). Read in full by me. I also compared it word for word with version 1.5 (26 November 2021): sections 3 (content), 4 (assessment objectives), 6 (mathematical requirements), 7 and 8 (practicals, apparatus, practical skills, CPAC) are identical; only administrative text changed.
- **AQA Required Practical Handbook, version 2.3**: the example methods, risk notes, teacher notes and sample results for RP1 to RP12. RP11 follows its sample data (qualitative Benedict’s, absorbance rising and curving with glucose concentration).
- **Save My Exams AQA A-level Biology revision notes** (all 288 pages of the topic notes): used as a second opinion and to find common student errors. Helper agents read them and distilled accuracy fact sheets for me, so I did not read every page myself. Where the notes differ from the specification, the specification was followed.
- **CGP *A-Level Biology: The Complete Course for AQA* (Student Book, ISBN 978 1 78294 314 3)**, supplied by the repository owner. Its content pages, glossary and answers were read by helper agents that extracted learning objectives, definitions, diagram labels, sequences, numbers and anything worth double-checking; I did not read every page myself. Nothing is copied from it, and the PDF is not part of this work.

**Not used**

- No past papers, mark schemes or examiner reports were read, so nothing is pitched to a particular exam; the sheet teaches the specification.
- No AQA-endorsed textbook was available to me. The one textbook used is the CGP book above.
- Web fetching was blocked in the build environment, so documents were downloaded with `curl` through the environment’s proxy and read as text.

**Guardrails applied.** Specification wording is used for key terms (for example “reduced NAD”, “electron transfer chain”, “independent segregation”). Beyond-specification detail appears only where it is correct and not misleading, and is never put on the topic card as something to be learnt. Named drugs and organisms are kept to a minimum. Practicals that the specification lists only as skills opportunities are never labelled as required practicals. Risk-factor data panels carry the correlation-is-not-causation note.

**What this does not claim.** The checks above were done by careful reading and cross-comparison, not by an AQA examiner or a subject teacher. There may still be errors; please report any.

## Testing

Tested in headless Chromium (software rendering) at desktop viewports from 1280 × 720 up to 3840 × 2160, and at a 390 × 844 phone viewport at 2× and 3× pixel density, including touch pan, pinch and double-tap. Checks that passed on this build:

- exactly **one network request** and no console errors;
- no missing glyphs in the built-in stroke font (including Greek letters, ψ, ², ⁺ and ⁻);
- no overlapping scene slots;
- determinism: two separate loads give identical pixels for every tile compared, across all three variants;
- the tour pauses on any input and resumes after a rest; `Space`, `0` and `C` behave as described;
- frame cost in the page’s own JavaScript stays around 1 ms per frame; the remaining frame time in a software-rendered browser is compositing, which a GPU-backed browser avoids. I have **not** been able to test on physical phones or GPUs, so treat real-device frame rates as unmeasured.

## Notes on the source

The page was authored as about seventy small source modules (engine, stroke font, recorder, scene library, scenes, coverage registry) that are concatenated into `index.html`. This repository ships the built file. Earlier commits keep a snapshot of the modules under `_wip/`.
