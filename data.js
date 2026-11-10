// Trip data — the itinerary the user provided, plus curated content.
// Items marked verify:true still need checking against official sources.
window.TRIP = {
  // The hotel is entered inside the app and stays on the device; it is not stored in the code.
  days: [
    { date: '2026-12-13', num: '13', short: 'ראשון', color: '#E8553D', title: 'הרובע הגותי ואל בורן', stops: [
      { kind: 'hotel', name: 'המלון', note: 'צ׳ק־אין והתמקמות', hotelRef: true },
      { kind: 'food', name: 'Teresa Carles', note: 'צהריים טבעוני · ללא גלוטן', lat: 41.3846, lng: 2.1683 },
      { kind: 'walk', name: 'הרובע הגותי ו־El Call', story: 'gotic', note: 'הקתדרלה והרובע היהודי', lat: 41.3830, lng: 2.1750, wiki: 'Barri_Gòtic' },
      { kind: 'shop', name: 'אל בורן', story: 'born', note: 'בוטיקים ואווירת חג', lat: 41.3846, lng: 2.1826, wiki: 'El_Born', rule: 'shops' }
    ]},
    { date: '2026-12-14', num: '14', short: 'שני', color: '#1E9E8F', title: 'ארמון, פארק ונמל', stops: [
      { kind: 'gaudi', name: 'Palau Güell', story: 'palauguell', note: 'הארמון של גאודי', lat: 41.3789, lng: 2.1741, wiki: 'Palau_Güell', rule: 'closedMonday' },
      { kind: 'arch', name: 'שער הניצחון', story: 'arc', note: 'השדרה אל הפארק', lat: 41.3910, lng: 2.1806, wiki: 'Arc_de_Triomf' },
      { kind: 'park', name: 'פארק המצודה', story: 'ciutadella', note: 'המזרקה והאגם', lat: 41.3881, lng: 2.1874, wiki: 'Parc_de_la_Ciutadella' },
      { kind: 'port', name: 'Port Vell', story: 'portvell', note: 'אווירת נמל', lat: 41.3755, lng: 2.1820, wiki: 'Port_Vell' },
      { kind: 'bar', name: 'Monk Barcelona', note: 'בר סודי מאחורי מכולת' }
    ]},
    { date: '2026-12-15', num: '15', short: 'שלישי', color: '#2453C9', title: 'שיא גאודי ומופע לילה', stops: [
      { kind: 'gaudi', name: 'Sagrada Família', story: 'sagrada', note: 'סיור פנימי ועלייה למגדלים', lat: 41.4036, lng: 2.1744, wiki: 'Sagrada_Família' },
      { kind: 'park', name: 'Park Güell', story: 'parkguell', note: 'מרפסת הפסיפס', lat: 41.4145, lng: 2.1527, wiki: 'Park_Güell' },
      { kind: 'food', name: 'Roots & Rolls', note: 'סושי טבעוני · ללא גלוטן' },
      { kind: 'show', name: 'Casa Milà', story: 'pedrera', note: 'מופע לילה על הגג', lat: 41.3953, lng: 2.1619, wiki: 'Casa_Milà' }
    ]},
    { date: '2026-12-16', num: '16', short: 'רביעי', color: '#D99400', title: 'בוקריה, שקיעה ופלמנקו', stops: [
      { kind: 'market', name: 'La Boqueria', story: 'boqueria', note: 'מיצים ופירות', lat: 41.3817, lng: 2.1717, wiki: 'Mercat_de_Sant_Josep_de_la_Boqueria', rule: 'closedSunday' },
      { kind: 'view', name: 'מונז׳ואיק ו־MNAC', story: 'montjuic', note: 'השקיעה הכי יפה בעיר', lat: 41.3685, lng: 2.1534, wiki: 'Museu_Nacional_d%27Art_de_Catalunya', rule: 'closedMonday' },
      { kind: 'show', name: 'Tablao Flamenco Cordobes', story: 'flamenco', note: 'מופע פלמנקו', lat: 41.3792, lng: 2.1746 }
    ]},
    { date: '2026-12-17', num: '17', short: 'חמישי', color: '#C2417F', title: 'שופינג וטיסה הביתה', stops: [
      { kind: 'shop', name: 'Passeig de Gràcia', story: 'gracia', note: 'קניות אחרונות', lat: 41.3936, lng: 2.1634, wiki: 'Passeig_de_Gràcia', rule: 'shops' },
      { kind: 'food', name: 'Honest Greens', note: 'צהריים טבעוני · ללא גלוטן' },
      { kind: 'plane', name: 'מהמלון לשדה', note: 'איסוף מזוודות ויציאה', hotelRef: true, keepName: true }
    ]}
  ],
  // Opening-hours rules. Each needs verifying against the official site before the trip.
  rules: {
    closedSunday: { closed: [0], text: 'סגור בימי ראשון' },
    closedMonday: { closed: [1], text: 'ייתכן שסגור בימי שני' },
    shops: { closed: [0], text: 'רוב החנויות סגורות בימי ראשון' }
  },
  discover: {
    food: [
      { name: 'Teresa Carles', note: 'טבעוני · תפריט ללא גלוטן', area: 'Eixample', kind: 'food', verify: true },
      { name: 'Roots & Rolls', note: 'סושי טבעוני · GF', area: 'Eixample', kind: 'food', verify: true },
      { name: 'Honest Greens', note: 'בריא · אפשרויות טבעוניות ו־GF', area: 'כמה סניפים', kind: 'food', verify: true },
      { name: 'Flax & Kale', note: 'צמחוני־טבעוני · אפשרויות GF', area: 'El Raval', kind: 'food', verify: true }
    ],
    bars: [
      { name: 'Monk Barcelona', note: 'קוקטיילים · בר נסתר', area: '', kind: 'bar', verify: true },
      { name: 'Paradiso', note: 'קוקטיילים · כניסה דרך מקרר', area: 'El Born', kind: 'bar', verify: true }
    ],
    tops: [
      { name: 'Bunkers del Carmel', note: 'התצפית הכי יפה על העיר', area: 'El Carmel', kind: 'view', lat: 41.4189, lng: 2.1617 },
      { name: 'Fira de Santa Llúcia', note: 'שוק חג המולד ליד הקתדרלה', area: 'Gòtic', kind: 'market', lat: 41.3840, lng: 2.1762 },
      { name: 'Sant Pau Recinte Modernista', note: 'בית חולים מודרניסטי מרהיב', area: 'Guinardó', kind: 'gaudi', lat: 41.4118, lng: 2.1744 },
      { name: 'Mercat de Sant Antoni', note: 'שוק שכונתי פחות תיירותי', area: 'Sant Antoni', kind: 'market', lat: 41.3787, lng: 2.1621 }
    ]
  },
  packing: [
    ['מסמכים', ['דרכון בתוקף', 'ביטוח נסיעות', 'כרטיס אשראי ומעט אירו', 'כרטיסי טיסה']],
    ['בגדים', ['מעיל קל', 'נעלי הליכה נוחות', 'מטרייה מתקפלת', 'סוודר לערב']],
    ['אלקטרוניקה', ['מטען וסוללה ניידת', 'מתאם חשמל (שקע אירופאי)', 'אוזניות']],
    ['טואלטיקה', ['מברשת שיניים', 'תרופות קבועות']]
  ],
  phrases: [
    ['מסעדה', [
      ['Soy vegano', 'סוֹי בֶגָאנוֹ', 'אני טבעוני'],
      ['¿Tiene opciones sin gluten?', 'טְיֶינֶה אוֹפְּסְיוֹנֶס סִין גְלוּטֶן?', 'יש אפשרויות ללא גלוטן?'],
      ['Soy celíaco', 'סוֹי סֶלִיאָקוֹ', 'אני צליאק'],
      ['Una mesa para dos, por favor', 'אוּנָה מֶסָה פָּארָה דוֹס, פּוֹר פָבוֹר', 'שולחן לשניים, בבקשה'],
      ['La cuenta, por favor', 'לָה קְוֶונְטָה, פּוֹר פָבוֹר', 'החשבון בבקשה']
    ]],
    ['חנות', [
      ['¿Cuánto cuesta?', 'קְוָואנְטוֹ קְוֶוסְטָה?', 'כמה זה עולה?'],
      ['¿Tiene otra talla?', 'טְיֶינֶה אוֹטְרָה טָאיָה?', 'יש מידה אחרת?'],
      ['Tax free, por favor', 'טַקְס פְרִי, פּוֹר פָבוֹר', 'טופס החזר מע״מ, בבקשה']
    ]],
    ['תחבורה', [
      ['¿Dónde está el metro?', 'דּוֹנְדֶה אֶסְטָה אֶל מֶטְרוֹ?', 'איפה המטרו?'],
      ['Al aeropuerto, por favor', 'אַל אַאֶרוֹפּוּאֶרְטוֹ, פּוֹר פָבוֹר', 'לשדה התעופה, בבקשה']
    ]],
    ['כללי', [
      ['Hola / Buenos días', 'אוֹלָה / בְּוֶנוֹס דִיאָס', 'שלום / בוקר טוב'],
      ['Gracias', 'גְרָאסְיָאס', 'תודה'],
      ['Moltes gràcies', 'מוֹלְטֶס גְרָאסְיֶס', 'תודה רבה (קטלאנית)'],
      ['¡Ayuda!', 'אָיוּדָה!', 'עזרה!']
    ]]
  ]
};
