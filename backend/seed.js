const mongoose = require('mongoose')
const dotenv   = require('dotenv')
const Destination = require('./models/Destination')

dotenv.config()

const destinations = [
  {
    name:        'Taj Mahal',
    location:    'Agra, Uttar Pradesh',
    state:       'Uttar Pradesh',
    category:    'landmark',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan.',
    bestTime:    'October – March',
    duration:    '2–3 hours',
    entry:       '₹1,100 (foreigners)',
    color:       '#2d1a00',
    accent:      '#C9A84C',
    facts: [
      '22,000 artisans worked for 22 years to build it',
      'The minarets are slightly tilted outward to protect the tomb if they fall',
      'Changes color throughout the day — pink at dawn, white at noon, golden at night',
    ],
    scenes: [
      {
        label:    'Main View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Amber Fort',
    location:    'Jaipur, Rajasthan',
    state:       'Rajasthan',
    category:    'landmark',
    description: 'Amber Fort is a fort located in Amer, Rajasthan. The fort is known for its artistic style elements, with its large ramparts and series of gates.',
    bestTime:    'November – February',
    duration:    '2–4 hours',
    entry:       '₹500 (foreigners)',
    color:       '#3d1500',
    accent:      '#D4845A',
    facts: [
      'Built in 1592 by Raja Man Singh I',
      'The Sheesh Mahal has over 1 million mirror pieces',
      'Elephants still carry tourists up the steep hill',
    ],
    scenes: [
      {
        label:    'Fort Entrance',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Amber_Fort_at_night.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Mysore Palace',
    location:    'Mysuru, Karnataka',
    state:       'Karnataka',
    category:    'landmark',
    description: 'The Mysore Palace is a historical palace and royal residence. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.',
    bestTime:    'October – February',
    duration:    '1–2 hours',
    entry:       '₹200 (Indians)',
    color:       '#160024',
    accent:      '#A855D4',
    facts: [
      'Illuminated by 97,000 bulbs every Sunday',
      'Second most visited monument in India after the Taj Mahal',
      'The current palace was built in 1912',
    ],
    scenes: [
      {
        label:    'Palace Front',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mysore_Palace_Morning.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Hawa Mahal',
    location:    'Jaipur, Rajasthan',
    state:       'Rajasthan',
    category:    'landmark',
    description: 'Hawa Mahal is a palace in Jaipur built from red and pink sandstone. The palace sits on the edge of the City Palace.',
    bestTime:    'November – March',
    duration:    '1 hour',
    entry:       '₹200 (foreigners)',
    color:       '#2a0800',
    accent:      '#E07850',
    facts: [
      '953 small windows called jharokhas',
      'Built in 1799 by Maharaja Sawai Pratap Singh',
      'The honeycomb design keeps the interior cool in summer',
    ],
    scenes: [
      {
        label:    'Front View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/3/thirty/Hawa_Mahal_Jaipur.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Radhanagar Beach',
    location:    'Havelock Island, Andaman',
    state:       'Andaman & Nicobar',
    category:    'beach',
    description: 'Radhanagar Beach is located on the western side of Havelock Island. It has been rated as the best beach in Asia by Time magazine.',
    bestTime:    'November – April',
    duration:    'Half day',
    entry:       'Free',
    color:       '#001a2d',
    accent:      '#3B9ECC',
    facts: [
      'Rated best beach in Asia by Time magazine',
      'Water so clear you can see the sea floor from the surface',
      'Nesting ground for Olive Ridley sea turtles',
    ],
    scenes: [
      {
        label:    'Beach View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Radhanagar_Beach_Havelock.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Palolem Beach',
    location:    'South Goa',
    state:       'Goa',
    category:    'beach',
    description: 'Palolem is a beach in South Goa — a crescent shaped bay and one of the most beautiful beaches in Goa with its calm waters.',
    bestTime:    'November – March',
    duration:    'Full day',
    entry:       'Free',
    color:       '#001520',
    accent:      '#2AB8A0',
    facts: [
      'One of the few beaches in Goa with calm swimmable waters',
      'Famous for silent noise parties with headphones',
      'Dolphins frequently spotted just offshore',
    ],
    scenes: [
      {
        label:    'Bay View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Palolem_beach_Goa.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Varkala Beach',
    location:    'Thiruvananthapuram, Kerala',
    state:       'Kerala',
    category:    'beach',
    description: 'Varkala Beach is one of the few places in Kerala where cliffs are found adjacent to the Arabian Sea.',
    bestTime:    'October – March',
    duration:    'Half day',
    entry:       'Free',
    color:       '#1a0800',
    accent:      '#E8954A',
    facts: [
      'The cliffs contain fossils that are 50 million years old',
      'Natural mineral springs seep through the cliff face',
      'Also called Papanasam beach — believed to wash away sins',
    ],
    scenes: [
      {
        label:    'Cliff View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Varkala_beach.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Marina Beach',
    location:    'Chennai, Tamil Nadu',
    state:       'Tamil Nadu',
    category:    'beach',
    description: 'Marina Beach is a natural urban beach in Chennai, along the Bay of Bengal — the second longest urban beach in the world.',
    bestTime:    'November – February',
    duration:    '2–3 hours',
    entry:       'Free',
    color:       '#000d1a',
    accent:      '#4A90CC',
    facts: [
      "World's second longest urban beach at 13km",
      'Home to statues of many Tamil leaders',
      'The sunrise here is one of the most photographed in India',
    ],
    scenes: [
      {
        label:    'Beach View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Marina_beach_chennai.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Munnar Tea Gardens',
    location:    'Idukki, Kerala',
    state:       'Kerala',
    category:    'mountain',
    description: 'Munnar is a hill station in the Western Ghats known for its rolling hills adorned with tea plantations at 1,600m altitude.',
    bestTime:    'September – March',
    duration:    'Full day',
    entry:       'Free',
    color:       '#0a1e00',
    accent:      '#5EA832',
    facts: [
      'Highest tea estates in the world at 1,600m',
      'The rare Neelakurinji flower blooms here once every 12 years',
      'Over 30 types of wild orchids in the surrounding forests',
    ],
    scenes: [
      {
        label:    'Tea Gardens',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Munnar_tea_garden.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Rohtang Pass',
    location:    'Manali, Himachal Pradesh',
    state:       'Himachal Pradesh',
    category:    'mountain',
    description: 'Rohtang Pass is a high mountain pass on the eastern Pir Panjal Range of the Himalayas at 3,978 metres above sea level.',
    bestTime:    'May – October',
    duration:    'Full day',
    entry:       '₹500 per vehicle',
    color:       '#0c1020',
    accent:      '#7EB8E8',
    facts: [
      'Located at an altitude of 3,978 metres above sea level',
      'The name means pile of corpses due to dangerous weather',
      'Connects the green Kullu valley to the barren Lahaul-Spiti plateau',
    ],
    scenes: [
      {
        label:    'Pass View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Rohtang_Pass.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Kerala Backwaters',
    location:    'Alleppey, Kerala',
    state:       'Kerala',
    category:    'mountain',
    description: 'The Kerala backwaters are a network of interconnected canals, rivers, lakes and inlets forming over 900 km of waterways.',
    bestTime:    'October – March',
    duration:    'Overnight stay',
    entry:       '₹8,000+ houseboat',
    color:       '#001208',
    accent:      '#2AAA70',
    facts: [
      'Over 900km of interconnected waterways',
      'Traditional houseboats called Kettuvallam made without a single nail',
      'Over 400 species of birds spotted in the region',
    ],
    scenes: [
      {
        label:    'Backwater View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Kerala_backwaters.jpg',
        hotspots: [],
      },
    ],
  },
  {
    name:        'Dudhsagar Falls',
    location:    'Sonaulim, Goa',
    state:       'Goa',
    category:    'mountain',
    description: 'Dudhsagar Falls is a four-tiered waterfall on the Mandovi River — one of India\'s tallest waterfalls at 310 metres.',
    bestTime:    'June – December',
    duration:    'Half day',
    entry:       '₹400 jeep safari',
    color:       '#000e06',
    accent:      '#4AC4A0',
    facts: [
      'One of India\'s tallest waterfalls at 310 metres high',
      'The name means Sea of Milk due to white foamy appearance',
      'The railway track passes right in front of the waterfall',
    ],
    scenes: [
      {
        label:    'Falls View',
        image360: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Dudhsagar_Falls.jpg',
        hotspots: [],
      },
    ],
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    // clear existing destinations
    await Destination.deleteMany({})
    console.log('Cleared existing destinations')

    // insert all destinations
    await Destination.insertMany(destinations)
    console.log('12 destinations seeded successfully!')

    process.exit(0)

  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seed()