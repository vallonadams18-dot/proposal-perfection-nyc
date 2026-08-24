/**
 * The venue axis of the coverage grid (docs/seo-playbook.md, Phase 2).
 *
 * For a proposal business the second axis is venues, not boroughs: nobody
 * searches "proposal setup Queens", they search "Central Park proposal setup"
 * or "rooftop proposal NYC". Lower volume than a borough term, far higher
 * intent -- someone naming a venue has already decided where.
 *
 * The playbook's content rule is the one that keeps this from being spam:
 * reusable *structure* is fine, reusable *prose* is not. Every entry below
 * names real places, real access constraints and real restrictions. The
 * `constraint` field in particular is the part a competitor cannot fake,
 * because it only comes from having tried to get a flower arch into the
 * building.
 *
 * Nothing here promises a permit. Where a permit is required that is stated as
 * a fact about the venue, not as a service we perform.
 */

export type Venue = {
  slug: string;
  /** <h1> */
  title: string;
  /** nav / breadcrumb label */
  short: string;
  /** the venue as it reads inside a sentence: "at home", "at a rooftop" */
  inSentence: string;
  metaTitle: string;
  metaDescription: string;
  /** one-paragraph lede */
  intro: string;
  /** the specific spots people actually mean when they name this venue */
  spots: string[];
  /** what we would put there, and why it suits */
  recommends: { name: string; why: string }[];
  /** the honest practical constraint — access, permits, weather, fire code */
  constraint: { heading: string; body: string };
  /** best time of day / year, specific to this place */
  timing: string;
  /** product slugs to feature; falls back to the collection if empty */
  featured: string[];
  /** hero image basename in /img/opt */
  image: string;
};

export const VENUES: Venue[] = [
  {
    slug: "central-park-proposal-setup",
    short: "Central Park",
    inSentence: "Central Park",
    title: "Central Park proposal setups",
    metaTitle: "Central Park Proposal Setup NYC",
    metaDescription:
      "Proposal setups for Central Park — Bethesda Terrace, Bow Bridge, the Conservatory Garden and Gapstow Bridge. Flower arches, candlelight and signage, with honest advice on Parks permits.",
    intro:
      "The most requested setting in the city, and the most regulated. Central Park rewards a smaller, more elegant setup than people expect — the park is doing most of the work, and anything oversized fights the landscape rather than framing it.",
    spots: [
      "Bethesda Terrace and the Fountain — the arcade tiling underneath is the wet-weather backup",
      "Bow Bridge, looking back across the Lake toward the West Side",
      "The Conservatory Garden at 105th — the only formal garden in the park, and the quietest",
      "Gapstow Bridge, with the Plaza skyline behind you",
      "Cop Cot and the Ladies' Pavilion, both small enough to feel private",
    ],
    recommends: [
      { name: "A half arch or an oval", why: "reads as part of the landscape rather than an installation dropped into it" },
      { name: "Candles and a petal path", why: "carries the walk in without needing structure, which matters where structure is restricted" },
      { name: "A compact custom sign", why: "gives the photograph its caption without competing with the park behind it" },
    ],
    constraint: {
      heading: "Permits are real here",
      body:
        "NYC Parks requires a permit for organised events and for anything structural placed in the park, and separately for commercial photography. That is a rule about the venue, not something we can waive. Tell us the date early and we will design to what you are actually allowed to put down — in practice that usually means a freestanding piece that two people carry in, rather than anything anchored.",
    },
    timing:
      "Late April for the cherry blossoms around the Reservoir and Cherry Hill; October for colour. Golden hour runs long over the Lake in autumn. Weekend mornings at Bethesda are busy from about 10am.",
    featured: ["rosie", "cloud-9-2", "candles", "rose-petals"],
    image: "p-rosie",
  },
  {
    slug: "brooklyn-bridge-park-proposal-setup",
    short: "Brooklyn Bridge Park & DUMBO",
    inSentence: "DUMBO and Brooklyn Bridge Park",
    title: "Brooklyn Bridge Park and DUMBO proposals",
    metaTitle: "DUMBO & Brooklyn Bridge Park Proposals",
    metaDescription:
      "Proposal setups in DUMBO and Brooklyn Bridge Park — the Washington Street bridge view, Pebble Beach and Jane's Carousel. Flower arches and marquee letters against the Manhattan skyline.",
    intro:
      "The skyline is the backdrop here, which changes what you put in front of it. Setups that read well in DUMBO are open — arches you can see the bridge through, letters that sit low enough not to cut the view.",
    spots: [
      "Washington Street, where the Manhattan Bridge sits framed between the buildings",
      "Pebble Beach and the Empire Fulton Ferry lawn, right on the water",
      "Jane's Carousel, lit and glassed-in, which works in rain",
      "Pier 1 at sunset, looking straight across at Lower Manhattan",
      "The Old Fulton Street cobblestones for the walk in",
    ],
    recommends: [
      { name: "A circle or heart arch", why: "you can frame the bridge or the skyline through the middle of it" },
      { name: "Marquee letters", why: "they hold up against a big view where smaller décor disappears" },
      { name: "Cold sparks", why: "the water and the dark buildings behind give them something to read against after sunset" },
    ],
    constraint: {
      heading: "Cobblestones and crowds",
      body:
        "Everything comes in over cobblestone from the nearest vehicle access, which rules out anything on castors and adds time to the load-in. Washington Street is a public street with steady foot traffic and a queue of other photographers most evenings, so the realistic window there is early morning. Brooklyn Bridge Park is NYC Parks land, with the same permit position as Central Park.",
    },
    timing:
      "Sunset, looking west at Manhattan — the light comes back off the glass. Early morning on Washington Street if you want the shot without a queue. Wind off the East River is the thing that decides whether a tall piece is sensible.",
    featured: ["infinity-2", "marry-me-marquee-letters", "cold-sparks", "3-hearts-set"],
    image: "p-infinity-2",
  },
  {
    slug: "rooftop-proposal-nyc",
    short: "Rooftops",
    inSentence: "a rooftop",
    title: "Rooftop proposals in New York",
    metaTitle: "Rooftop Proposal Setup NYC",
    metaDescription:
      "Rooftop proposal setups across New York City — marquee letters, heart arches, cold sparks and candlelight, built around your building's access, wind and power.",
    intro:
      "A private roof is the one setting where you can build whatever you like, because nobody has to walk past it. It is also the setting with the most physical constraints, and the ones people find out about too late.",
    spots: [
      "Private residential roof decks — the most common, and the most flexible",
      "Hotel rooftops, where the venue's own rules apply on top of the building's",
      "Penthouse terraces, usually with power and shelter already there",
      "Building common roofs, which almost always need management sign-off in writing",
    ],
    recommends: [
      { name: "Marquee letters", why: "they read from across the roof and photograph against the skyline at night" },
      { name: "A heart arch", why: "the one shape that still works when the background is a city rather than a landscape" },
      { name: "Uplighting", why: "roofs go very dark once the sun is down, and a phone camera will not save it" },
      { name: "Cold sparks", why: "safe indoors and out, and they give a night shot something to happen in" },
    ],
    constraint: {
      heading: "Wind, access and power",
      body:
        "Three things decide what is possible on a roof. Wind: anything tall and solid acts as a sail, so on an exposed roof an open arch is a better idea than a full flower wall. Access: whether there is a freight elevator or only a stair with a turn in it changes what physically fits. Power: many roofs have no outlet, which matters for lighting and for any machine. Send a photo of the roof door and the stairwell and we can tell you what will go up.",
    },
    timing:
      "Blue hour — roughly twenty minutes after sunset — when the sky still has colour and the building lights are on. Full dark is harder and needs lighting. Check the forecast for wind, not just rain.",
    featured: ["marry-me-marquee-letters", "cupid-2", "uplighting", "cold-sparks"],
    image: "gallery-06",
  },
  {
    slug: "at-home-proposal-setup-nyc",
    short: "At home",
    inSentence: "home",
    title: "At-home proposals",
    metaTitle: "At-Home Proposal Setup NYC",
    metaDescription:
      "Proposal setups inside New York apartments — flower walls, candlelight and petal paths sized to a real living room, a real doorway and a real freight elevator.",
    intro:
      "The most personal option and the most underrated. It is also the only setting with no permit, no crowd, no weather and no closing time — and a full flower wall fits a living room more easily than almost anyone expects.",
    spots: [
      "The living room wall opposite the door, so it is the first thing seen",
      "A window with a view worth keeping in frame",
      "The hallway in, dressed with candles and petals so the moment starts before the room does",
      "Small outdoor space — a balcony or a back garden in a brownstone",
    ],
    recommends: [
      { name: "A flower wall", why: "an eight-foot wall reads as a transformed room in a way nothing smaller does" },
      { name: "Candles and rose petals", why: "the approach matters more indoors, because the walk is shorter" },
      { name: "A neon sign", why: "warm light indoors, and it stays on your wall afterwards if you want it to" },
    ],
    constraint: {
      heading: "Measure the doorway, not the room",
      body:
        "What limits an apartment setup is never the room, it is everything before it: the building's freight elevator hours, whether there is a service entrance, the turn at the top of a pre-war stair, and the width of your own front door. Panels come in sections, so most things fit — but tell us the building type on the first call, because a fifth-floor walk-up and a doorman building are different jobs.",
    },
    timing:
      "Entirely yours, which is the point. Evening suits candlelight; daytime suits a window. Worth thinking about how you get them out of the apartment while it is being set up.",
    featured: ["pink-butterfly", "candles", "rose-petals", "will-you-marry-me-neon-sign"],
    image: "p-pink-butterfly",
  },
  {
    slug: "long-island-city-proposal-setup",
    short: "Long Island City",
    inSentence: "Long Island City",
    title: "Long Island City proposals",
    metaTitle: "Long Island City Proposal Setup",
    metaDescription:
      "Proposal setups at Gantry Plaza State Park and along the Long Island City waterfront — the Pepsi sign, the gantries and the full Midtown skyline, with far fewer people than Manhattan.",
    intro:
      "The best skyline view in the city is from the other side of the East River, and Gantry Plaza is a fraction as busy as the Brooklyn waterfront. You get Midtown end to end, industrial framing that photographs beautifully, and room to actually set something up.",
    spots: [
      "The Pepsi-Cola sign, lit after dark and unmistakably New York",
      "The gantries themselves, which frame a shot like a ready-made arch",
      "The piers at Gantry Plaza State Park, looking straight at the UN and Midtown",
      "Hunters Point South Park, newer and quieter still",
    ],
    recommends: [
      { name: "A square or rounded arch", why: "the industrial lines here suit geometry more than they suit a heart" },
      { name: "Uplighting", why: "the waterfront is dark and the skyline across the water will out-expose you otherwise" },
      { name: "A custom sign", why: "there is space for it here in a way there is not on a crowded Manhattan pier" },
    ],
    constraint: {
      heading: "State park, not city park",
      body:
        "Gantry Plaza is a New York State park, so it sits under a different permit regime than Central Park or Brooklyn Bridge Park, with its own hours. Vehicle access is good compared with DUMBO — that is the practical advantage of this side of the river — but the piers are exposed and it is consistently windier than it looks from photographs.",
    },
    timing:
      "Sunset, facing west at Manhattan, then stay for blue hour when the Pepsi sign and the skyline come on together. Weekday evenings are close to empty.",
    featured: ["infinity", "golden-square-gates", "uplighting", "neon-signs"],
    image: "p-infinity",
  },
  {
    slug: "hotel-proposal-setup-nyc",
    short: "Hotel suites",
    inSentence: "a hotel suite",
    title: "Hotel suite proposals",
    metaTitle: "Hotel Proposal Setup NYC",
    metaDescription:
      "Proposal setups in New York hotel suites — flower walls, LED candlelight and petal paths, designed around hotel fire code and a short set-up window.",
    intro:
      "A suite gives you privacy, a view you have paid for, and somewhere to stay afterwards. The trade is time: hotels rarely give you the room early, so the whole setup has to go in fast and come out clean.",
    spots: [
      "The window wall, using the view as the backdrop rather than covering it",
      "The bed wall, which is the widest uninterrupted surface in most suites",
      "The entry hall, so the door opening is the reveal",
      "A terrace suite, if the hotel allows anything on the terrace at all",
    ],
    recommends: [
      { name: "A flower wall", why: "it turns a hotel room into somewhere specific, which is the whole problem with hotel rooms" },
      { name: "LED candles", why: "almost every hotel prohibits open flame, and this is the usual reason a plan has to change late" },
      { name: "Rose petals", why: "no fire risk, no fixings, nothing to remove from a wall afterwards" },
    ],
    constraint: {
      heading: "Fire code and the clock",
      body:
        "Open flame is prohibited in most New York hotel rooms, so real candles are usually out and we switch to LED — worth knowing before you picture the room. Nothing can be fixed to walls. And the hotel has to agree in advance to let a third party into the room, which is a conversation to have with them, not with us. Once you have their yes, the room itself is quick.",
    },
    timing:
      "Whatever window the hotel gives you, which is usually an hour or less before you need the room. Evening, with the city lit behind the glass, is what the suite is for.",
    featured: ["abigail", "rose-petals", "will-you-marry-me-neon-sign", "floral-accents"],
    image: "p-abigail",
  },
  {
    slug: "restaurant-proposal-setup-nyc",
    short: "Restaurants",
    inSentence: "a restaurant",
    title: "Restaurant and private-dining proposals",
    metaTitle: "Restaurant Proposal Setup NYC",
    metaDescription:
      "Proposal setups in New York restaurants and private dining rooms — compact florals, signage and petals sized to a table, and timed around service.",
    intro:
      "A restaurant proposal is a timing problem more than a design one. The setup has to appear between courses or before you arrive, fit a space that is already furnished, and not get in the way of service.",
    spots: [
      "A private dining room, where you effectively have the space to yourself",
      "A reserved corner table, dressed small",
      "A restaurant terrace or garden, seasonally",
      "A full buy-out, where the room becomes yours and the constraint disappears",
    ],
    recommends: [
      { name: "Floral accents and a runner", why: "sized to a table rather than a room, and they leave the space usable" },
      { name: "A small custom sign", why: "reads in a tight interior shot where a full arch would not fit" },
      { name: "Rose petals", why: "nothing to install, nothing to take down mid-service" },
    ],
    constraint: {
      heading: "The restaurant decides, not us",
      body:
        "Every restaurant has its own rule about outside décor, and many will not allow anything at all during service. Get their agreement first, in writing if you can, and ask specifically about candles and about what time we can be in the room. A private dining room almost always says yes; a busy dining floor on a Saturday often does not.",
    },
    timing:
      "Before you arrive is easiest for everyone. If it has to happen during the meal, the gap between main and dessert is the window the staff can usually protect.",
    featured: ["floral-accents", "floral-runners", "rose-petals", "acrylic-signs"],
    image: "p-floral-accents",
  },
  {
    slug: "waterfront-proposal-setup-nyc",
    short: "Waterfront",
    inSentence: "the waterfront",
    title: "Waterfront and harbour proposals",
    metaTitle: "Waterfront Proposal Setup NYC",
    metaDescription:
      "Waterfront proposal setups in New York — Battery Park, Hudson River Park and the Brooklyn piers. Open arches and lighting built for wind and an open horizon.",
    intro:
      "Open water gives you a horizon instead of a backdrop, which is the most flattering light in the city and the hardest wind. What works on the water is open, low and heavy enough to stay where it is put.",
    spots: [
      "Battery Park, with the harbour and the Statue of Liberty behind you",
      "Hudson River Park piers, facing the sunset over New Jersey",
      "Pier 45 and the Christopher Street lawns in the West Village",
      "The Brooklyn piers south of the bridge, quieter than Pier 1",
    ],
    recommends: [
      { name: "An open arch", why: "you keep the horizon, and it takes far less wind than a solid wall" },
      { name: "Uplighting", why: "there is nothing out there to bounce light back at you once the sun goes" },
      { name: "Marquee letters", why: "heavy, low and readable against a wide empty background" },
    ],
    constraint: {
      heading: "Wind is the whole conversation",
      body:
        "Anything with a solid face behaves like a sail on an open pier, so a flower wall is usually the wrong answer on the water and an open arch is the right one. These are public parkland sites with the same permit position as the rest of NYC Parks. There is also almost never power, so lighting has to be self-contained.",
    },
    timing:
      "Sunset over the Hudson from the Manhattan side; sunset over Manhattan from the Brooklyn side. Both are short in winter and worth arriving early for.",
    featured: ["heavenly", "marry-me-marquee-letters", "uplighting", "candles"],
    image: "p-heavenly",
  },
  {
    slug: "observation-deck-proposal-nyc",
    short: "Observation decks",
    inSentence: "an observation deck",
    title: "Observation deck proposals",
    metaTitle: "Observation Deck Proposal NYC",
    metaDescription:
      "Proposing at Top of the Rock, the Edge, the Empire State Building or Summit — what these venues allow, and how to build the setup somewhere they do.",
    intro:
      "Worth being straight about this one: the observation decks are the most-searched proposal spot in New York and the least workable for décor. They are ticketed, staffed, and they do not let you bring an arch in.",
    spots: [
      "Top of the Rock, with the Empire State Building in frame",
      "The Edge at Hudson Yards",
      "Summit One Vanderbilt",
      "The Empire State Building's own 86th floor deck",
    ],
    recommends: [
      { name: "Ask on the deck, celebrate elsewhere", why: "the setup goes in a suite, a private room or an apartment nearby, and the deck gives you the photograph" },
      { name: "Marquee letters", why: "for the second location, where the celebration actually happens" },
      { name: "A flower wall", why: "somewhere you control, so the evening does not end when the deck closes" },
    ],
    constraint: {
      heading: "They will not let you set up",
      body:
        "Every major observation deck prohibits outside décor, structures and open flame, and several run their own paid proposal packages instead. Some also restrict tripods and professional camera rigs. So this page exists to say the useful thing rather than sell you something: if the deck is where you want to ask, book their package or just ask, and let us build the part of the evening that happens before or after it.",
    },
    timing:
      "Sunset slots sell out weeks ahead at every deck. If you are pairing it with a setup elsewhere, remember the queue down is as long as the queue up.",
    featured: ["marry-me-marquee-letters", "monarch", "cold-sparks", "custom-packages"],
    image: "p-monarch",
  },
];

export const venueBySlug = (slug: string) => VENUES.find((v) => v.slug === slug);
