export interface ChecklistItem {
  id: number
  name: string
  must: boolean
  reuse: boolean
  note: string
}

export interface Category {
  id: string
  icon: string
  label: string
  color: string
  items: ChecklistItem[]
}

export const categories: Category[] = [
  {
    id: 'diapering',
    icon: '🧷',
    label: 'Diapering & Hygiene',
    color: '#f9a8d4',
    items: [
      { id: 1, name: "Diapers (start with newborn & size 1)", must: true, reuse: false, note: "Don't overbuy — babies grow fast!" },
      { id: 2, name: "Baby wipes (unscented)", must: true, reuse: false, note: "Stock up — you'll always use these" },
      { id: 3, name: "Diaper cream / Desitin", must: true, reuse: false, note: "Prevent rashes early" },
      { id: 4, name: "Changing pad", must: true, reuse: true, note: "Easy to wipe clean and reuse" },
      { id: 5, name: "Diaper pail", must: false, reuse: true, note: "Check if yours is still working" },
      { id: 6, name: "Diaper bag", must: true, reuse: true, note: "A good bag is gender neutral — reuse!" },
    ],
  },
  {
    id: 'sleep',
    icon: '🌙',
    label: 'Sleep & Safety',
    color: '#c4b5fd',
    items: [
      { id: 7, name: "Bassinet or bedside sleeper", must: true, reuse: true, note: "Check for recalls; verify meets 2023+ safety standards" },
      { id: 8, name: "Crib (with adjustable mattress height)", must: true, reuse: true, note: "Inspect for damage and check recall status" },
      { id: 9, name: "Firm crib mattress", must: true, reuse: false, note: "AAP recommends a new mattress for each baby" },
      { id: 10, name: "Fitted crib sheets (2–3)", must: true, reuse: true, note: "Wash thoroughly — good to reuse" },
      { id: 11, name: "Swaddle blankets / sleep sacks", must: true, reuse: true, note: "Neutral ones reuse great; pick up a few girl-themed ones too" },
      { id: 12, name: "Baby monitor (audio or video)", must: true, reuse: true, note: "Check battery/wifi still works" },
      { id: 13, name: "White noise machine", must: false, reuse: true, note: "Super helpful for sleep — grab from your boy's room" },
    ],
  },
  {
    id: 'feeding',
    icon: '🍼',
    label: 'Feeding',
    color: '#6ee7b7',
    items: [
      { id: 14, name: "Bottles (4–6 of various sizes)", must: true, reuse: true, note: "If no nipple wear/damage and properly sanitized" },
      { id: 15, name: "Breast pump (if breastfeeding)", must: true, reuse: false, note: "FDA recommends a new pump per baby for hygiene" },
      { id: 16, name: "Breast milk storage bags", must: false, reuse: false, note: "Single-use; stock up" },
      { id: 17, name: "Nursing pillow (Boppy etc.)", must: true, reuse: true, note: "Wash cover; pillow insert is usually reusable" },
      { id: 18, name: "Bottle brush & drying rack", must: true, reuse: true, note: "Still usable if clean and not worn" },
      { id: 19, name: "Burp cloths (8–12)", must: true, reuse: true, note: "Gender neutral — wash and reuse!" },
      { id: 20, name: "Bibs (4–6 for newborn stage)", must: true, reuse: true, note: "Check for wear; stock a few girl-themed ones" },
      { id: 21, name: "Bottle sterilizer or dishwasher basket", must: false, reuse: true, note: "Handy to have from round one" },
    ],
  },
  {
    id: 'clothing',
    icon: '👗',
    label: 'Clothing',
    color: '#fca5a5',
    items: [
      { id: 22, name: "Onesies — newborn & 0–3 mo (4–8)", must: true, reuse: false, note: "Need girl sizes/styles; boy clothes fine for home days" },
      { id: 23, name: "Sleepers / footie pajamas (4–6)", must: true, reuse: false, note: "Recommend new girl-specific set" },
      { id: 24, name: "Soft pants & tops (3–4 sets)", must: true, reuse: false, note: "Girl sizes/colors needed" },
      { id: 25, name: "Socks & mittens", must: true, reuse: true, note: "Neutral baby socks reuse well" },
      { id: 26, name: "Hats (2–3 newborn caps)", must: true, reuse: true, note: "Neutral hats work fine; hospitals also give one" },
      { id: 27, name: "Seasonal outerwear (if applicable)", must: false, reuse: false, note: "Depends on birth season and what fits" },
    ],
  },
  {
    id: 'health',
    icon: '🩺',
    label: 'Health & Grooming',
    color: '#fde68a',
    items: [
      { id: 28, name: "Digital rectal thermometer", must: true, reuse: true, note: "Clean & sanitize properly between uses" },
      { id: 29, name: "Nail clippers or file (baby-safe)", must: true, reuse: true, note: "Baby nails grow surprisingly fast!" },
      { id: 30, name: "Bulb syringe / NoseFrida", must: true, reuse: false, note: "Replace for hygiene between children" },
      { id: 31, name: "Baby-safe lotion & shampoo", must: true, reuse: false, note: "Stock fresh; check expiration dates" },
      { id: 32, name: "Gas relief drops (Mylicon)", must: true, reuse: false, note: "Check dates; buy fresh" },
      { id: 33, name: "Cool-mist humidifier", must: false, reuse: true, note: "Very helpful for colds and congestion" },
      { id: 34, name: "Baby bathtub", must: false, reuse: true, note: "Inspect for mold/damage first" },
    ],
  },
  {
    id: 'travel',
    icon: '🚗',
    label: 'Travel & On-The-Go',
    color: '#93c5fd',
    items: [
      { id: 35, name: "Infant car seat", must: true, reuse: false, note: "⚠️ Never reuse if it's been in an accident or expired" },
      { id: 36, name: "Stroller (reclines flat for newborn)", must: true, reuse: true, note: "Check wheels, recline, and harness condition" },
      { id: 37, name: "Baby carrier / wrap", must: false, reuse: true, note: "Inspect fabric and buckles — usually reusable" },
    ],
  },
  {
    id: 'nursery',
    icon: '🌸',
    label: 'Nursery & Comfort',
    color: '#fbcfe8',
    items: [
      { id: 38, name: "Baby swing or bouncer", must: false, reuse: true, note: "Check batteries and straps; many babies love these" },
      { id: 39, name: "Play mat / activity gym", must: false, reuse: true, note: "Clean thoroughly; great to reuse" },
      { id: 40, name: "Pacifiers (2–3 types to try)", must: false, reuse: false, note: "Buy new — shape preferences vary by baby" },
      { id: 41, name: "Nightlight", must: false, reuse: true, note: "Handy for nighttime feedings" },
      { id: 42, name: "Dresser / storage for clothes", must: false, reuse: true, note: "Functional and gender-neutral — keep using it" },
    ],
  },
  {
    id: 'mom',
    icon: '💜',
    label: 'For Mom (Postpartum)',
    color: '#e9d5ff',
    items: [
      { id: 43, name: "Nursing bras (2–3)", must: true, reuse: false, note: "Buy new — fit changes each pregnancy" },
      { id: 44, name: "Nipple cream (Lanolin)", must: false, reuse: false, note: "Stock fresh if breastfeeding" },
      { id: 45, name: "Postpartum pads / mesh underwear", must: true, reuse: false, note: "Hospital often provides some; stock more" },
      { id: 46, name: "Stool softeners", must: true, reuse: false, note: "Doctor will likely recommend these" },
      { id: 47, name: "Water bottle with straw (large)", must: true, reuse: true, note: "Hydration is critical, especially if breastfeeding" },
    ],
  },
]
