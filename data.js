// Trip data — the itinerary the user provided, plus curated content.
// Items marked verify:true still need checking against official sources.
window.TRIP = {
  // The hotel is entered inside the app and stays on the device; it is not stored in the code.
  days: [
    { date: '2026-12-13', num: '13', short: 'ראשון', color: '#E8553D', title: 'הרובע הגותי ואל בורן', stops: [
      { kind: 'hotel', name: 'המלון', note: 'צ׳ק־אין והתמקמות', hotelRef: true },
      { kind: 'food', name: 'Teresa Carles', note: 'צהריים · Jovellanos 2', lat: 41.38508, lng: 2.16801 },
      { kind: 'walk', name: 'הרובע הגותי ו־El Call', story: 'gotic', note: 'הקתדרלה והרובע היהודי', lat: 41.3830, lng: 2.1750, wiki: 'Barri_Gòtic' },
      { kind: 'shop', name: 'אל בורן', story: 'born', note: 'בוטיקים ואווירת חג', lat: 41.3846, lng: 2.1826, wiki: 'El_Born', rule: 'shops' }
    ]},
    { date: '2026-12-14', num: '14', short: 'שני', color: '#1E9E8F', title: 'ארמון, פארק ונמל', stops: [
      { kind: 'gaudi', name: 'Palau Güell', story: 'palauguell', note: 'הארמון של גאודי', lat: 41.3789, lng: 2.1741, wiki: 'Palau_Güell', rule: 'palauguell' },
      { kind: 'arch', name: 'שער הניצחון', story: 'arc', note: 'השדרה אל הפארק', lat: 41.3910, lng: 2.1806, wiki: 'Arc_de_Triomf' },
      { kind: 'park', name: 'פארק המצודה', story: 'ciutadella', note: 'המזרקה והאגם', lat: 41.3881, lng: 2.1874, wiki: 'Parc_de_la_Ciutadella' },
      { kind: 'port', name: 'Port Vell', story: 'portvell', note: 'אווירת נמל', lat: 41.3755, lng: 2.1820, wiki: 'Port_Vell' },
      { kind: 'bar', name: 'Monk Barcelona', note: 'בר סודי מאחורי מכולת · Abaixadors 10', lat: 41.38330, lng: 2.18147 }
    ]},
    { date: '2026-12-15', num: '15', short: 'שלישי', color: '#2453C9', title: 'שיא גאודי ומופע לילה', stops: [
      { kind: 'gaudi', name: 'Sagrada Família', story: 'sagrada', note: 'סיור פנימי ועלייה למגדלים', lat: 41.4036, lng: 2.1744, wiki: 'Sagrada_Família' },
      { kind: 'park', name: 'Park Güell', story: 'parkguell', note: 'מרפסת הפסיפס', lat: 41.4145, lng: 2.1527, wiki: 'Park_Güell' },
      { kind: 'food', name: 'Roots & Rolls', note: 'סושי טבעוני · Consell de Cent 401', lat: 41.39536, lng: 2.17110 },
      { kind: 'show', name: 'Casa Milà', story: 'pedrera', note: 'מופע לילה על הגג', lat: 41.3953, lng: 2.1619, wiki: 'Casa_Milà' }
    ]},
    { date: '2026-12-16', num: '16', short: 'רביעי', color: '#D99400', title: 'בוקריה, שקיעה ופלמנקו', stops: [
      { kind: 'market', name: 'La Boqueria', story: 'boqueria', note: 'מיצים ופירות', lat: 41.3817, lng: 2.1717, wiki: 'Mercat_de_Sant_Josep_de_la_Boqueria', rule: 'closedSunday' },
      { kind: 'view', name: 'מונז׳ואיק ו־MNAC', story: 'montjuic', note: 'השקיעה הכי יפה בעיר', lat: 41.3685, lng: 2.1534, wiki: 'Museu_Nacional_d%27Art_de_Catalunya', rule: 'mnac', info: 'fountain' },
      { kind: 'show', name: 'Tablao Flamenco Cordobes', story: 'flamenco', note: 'מופע פלמנקו', lat: 41.3792, lng: 2.1746 }
    ]},
    { date: '2026-12-17', num: '17', short: 'חמישי', color: '#C2417F', title: 'שופינג וטיסה הביתה', stops: [
      { kind: 'shop', name: 'Passeig de Gràcia', story: 'gracia', note: 'קניות אחרונות', lat: 41.3936, lng: 2.1634, wiki: 'Passeig_de_Gràcia', rule: 'shops' },
      { kind: 'food', name: 'Honest Greens', note: 'צהריים · Gran de Gràcia 30', lat: 41.39870, lng: 2.15699 },
      { kind: 'plane', name: 'מהמלון לשדה', note: 'איסוף מזוודות ויציאה', hotelRef: true, keepName: true }
    ]}
  ],
  // Opening-hours rules, checked against several sources on 10.11.2026. Re-check the official sites a week before the trip.
  rules: {
    closedSunday: { closed: [0], text: 'סגור בימי ראשון', hours: 'שני–שבת, בבוקר עד הערב' },
    palauguell: { closed: [1], raw: 'Tu-Su 10:00-17:30', text: 'סגור בימי שני (חוץ מחגים)', hours: 'בחורף 10:00–17:30, כניסה אחרונה 16:30', src: 'https://www.barcelona.de/en/barcelona-palau-guell.html' },
    mnac: { closed: [1], raw: 'Tu-Sa 10:00-18:00; Su 10:00-15:00', text: 'המוזיאון סגור בימי שני (חוץ מחגים)', hours: 'בחורף: שלישי–שבת 10:00–18:00, ראשון 10:00–15:00', src: 'https://www.museunacional.cat/en' },
    shops: { closed: [0], text: 'רוב החנויות סגורות בימי ראשון' }
  },
  // Places that sell tickets with an entry time. Official sites only. Checked 11.11.2026.
  booking: [
    { keys: ['sagrada', 'sagrada familia', 'סגרדה'], url: 'https://sagradafamilia.org/en/tickets', text: 'כניסה בשעה קבועה. בדצמבר נגמרים כרטיסים, להזמין שבועות מראש' },
    { keys: ['parkguell', 'park guell', 'פארק גואל'], url: 'https://parkguell.barcelona/en/buy-tickets', text: 'לאזור המונומנטלי נכנסים בשעה קבועה. להזמין מראש' },
    { keys: ['pedrera', 'casa mila', 'קאסה מילה'], url: 'https://www.lapedrera.com/en/tickets', text: 'כרטיס עם שעת כניסה. כדאי להזמין מראש' },
    { keys: ['casa batllo', 'קאסה באטיו'], url: 'https://www.casabatllo.es/en/tickets/', text: 'כרטיס עם שעת כניסה. כדאי להזמין מראש' },
    { keys: ['casavicens', 'casa vicens', 'קאסה ויסנס'], url: 'https://casavicens.org/tickets/', text: 'כרטיס עם שעת כניסה. כדאי להזמין מראש' },
    { keys: ['palauguell', 'palau guell', 'ארמון גואל'], url: 'https://inici.palauguell.cat/en/tickets', text: 'כניסה במשבצות זמן. סגור בימי שני' },
    { keys: ['flamenco', 'cordobes', 'פלמנקו'], url: 'https://www.tablaocordobes.es/en/', text: 'המופעים בשעות קבועות. להזמין מקום מראש' }
  ],
  // Holidays and events on the trip dates. Checked 11.11.2026; 2026 market dates were not published yet, so they are estimates.
  holidays: { note: 'אין חג רשמי בברצלונה ב־13–17.12.2026. החגים הקרובים: 8.12 (לפני) ו־25–26.12 (אחרי). החנויות פתוחות כרגיל, חוץ מיום ראשון.', src: 'https://ajuntament.barcelona.cat/calendarifestius/en' },
  events: [
    { id: 'llucia', name: 'Fira de Santa Llúcia', he: 'שוק חג המולד ליד הקתדרלה', from: '2026-11-27', to: '2026-12-22', approx: true, hours: 'בערך 10:00–21:00 (לפי 2025)', raw: 'Mo-Su 10:00-21:00', lat: 41.3840, lng: 2.1758, kind: 'market', note: 'השוק הוותיק בעיר, מאז 1786: קישוטים, עצי חג ודמויות לתפאורת המולד', url: 'https://www.firadesantallucia.cat/', src: 'https://barcelonahacks.com/barcelona-christmas-markets/' },
    { id: 'nadalsf', name: 'Fira de Nadal de la Sagrada Família', he: 'שוק חג המולד מול סגרדה פמיליה', from: '2026-11-21', to: '2026-12-22', approx: true, hours: 'בערך 10:00–21:00', raw: 'Mo-Su 10:00-21:00', lat: 41.4045, lng: 2.1746, kind: 'market', note: 'דוכני מלאכת יד וקישוטים בכיכר מול הבזיליקה', url: 'https://www.barcelona.com/things-to-do-in-barcelona/what-to-do-in-barcelona-in-december', src: 'https://barcelonahacks.com/barcelona-christmas-markets/' },
    { id: 'lights', name: 'Llums de Nadal', he: 'אורות חג המולד ברחובות', from: '2026-11-26', to: '2027-01-06', approx: true, hours: 'כל ערב מהחשכה', lat: 41.3870, lng: 2.1701, kind: 'walk', note: 'הרחובות הראשיים מוארים כל ערב: Passeig de Gràcia, Portal de l’Àngel ו־Rambla Catalunya', src: 'https://www.barcelona.com/things-to-do-in-barcelona/what-to-do-in-barcelona-in-december' },
    { id: 'pessebre', name: 'Pessebre a Plaça Sant Jaume', he: 'תפאורת המולד בכיכר העירייה', from: '2026-12-04', to: '2027-01-06', approx: true, hours: 'כל היום', lat: 41.3826, lng: 2.1770, kind: 'walk', note: 'בכל שנה העירייה מציבה בכיכר תפאורת מולד אחרת, ולפעמים מפתיעה', src: 'https://www.barcelona.com/things-to-do-in-barcelona/what-to-do-in-barcelona-in-december' }
  ],
  // Worth a look, but outside the trip dates or not confirmed yet
  eventsNear: [
    { name: 'מפצח האגוזים בליסאו', when: '8–12.12', why: 'לפני הטיול', url: 'https://www.liceubarcelona.cat/en' },
    { name: 'אורטוריית חג המולד של באך, L’Auditori', when: '18–19.12', why: 'אחרי הטיול', url: 'https://www.auditori.cat/en' },
    { name: 'La Nit de Nadal, Palau de la Música', when: '20.12', why: 'אחרי הטיול', url: 'https://www.palaumusica.cat/en' },
    { name: 'משחקי הבית של ברסה', when: 'לבדוק', why: 'לוח המשחקים לאמצע דצמבר עוד לא נקבע סופית', url: 'https://www.fcbarcelona.com/en/football/first-team/calendar' },
    { name: 'כל האירועים בעיר (העירייה)', when: 'מתעדכן', why: 'אתר האירועים הרשמי של ברצלונה', url: 'https://www.barcelona.cat/en/agenda' }
  ],
  // Things worth knowing on a given day that are not closures.
  infos: {
    fountain: { days: [4, 5, 6], text: 'המזרקה הקסומה (Font Màgica) פועלת בחורף רק בחמישי–שבת, בערך מ־20:00', src: 'https://www.barcelona.com/barcelona-theme-park/magic-fountain' }
  },
  discover: {
    food: [
      { name: 'Teresa Carles', note: 'צמחוני, הרבה מנות טבעוניות ואפשרויות ללא גלוטן', area: 'El Raval · Jovellanos 2', kind: 'food', lat: 41.38508, lng: 2.16801, src: 'https://timeout.com/barcelona/restaurants/teresa-carles' },
      { name: 'Flax & Kale Passage', note: 'תפריט שבנוי גם לללא גלוטן, כולל פיצות GF ידידותיות לטבעונים', area: 'Sant Pere · Sant Pere Més Alt 31', kind: 'food', lat: 41.38842, lng: 2.17652, src: 'https://www.timeout.com/barcelona/restaurants/flax-kale-passage' },
      { name: 'Roots & Rolls', note: 'סושי טבעוני', area: 'Eixample · Consell de Cent 401', kind: 'food', lat: 41.39536, lng: 2.17110, src: 'https://ajuntament.barcelona.cat/comerc/en/roots-rolls', verify: 'לשאול על אפשרויות ללא גלוטן' },
      { name: 'Honest Greens (Born)', note: 'בריא ומהיר, מסומן מה טבעוני ומה ללא גלוטן', area: 'El Born · Pla de Palau 11', kind: 'food', lat: 41.38343, lng: 2.18321, src: 'https://www.honestgreens.com/en/restaurants/born-en' },
      { name: 'Honest Greens (Gràcia)', note: 'אותה רשת, ליד Passeig de Gràcia', area: 'Gràcia · Gran de Gràcia 30', kind: 'food', lat: 41.39870, lng: 2.15699, src: 'https://www.honestgreens.com/en/restaurants/gdg-en' },
      { name: 'Hanai Vegana', note: 'מאפייה טבעונית וללא גלוטן לגמרי, לבראנץ׳ ומתוקים', area: 'El Born · Carders 28', kind: 'food', lat: 41.38679, lng: 2.18030, src: 'https://www.happycow.net/reviews/hanai-vegana-barcelona-122320', verify: 'פתוח בדרך כלל רביעי–ראשון' },
      { name: 'Mad Mad Vegan', note: 'טבעוני, המבורגרים וטאקו, יש אפשרויות ללא גלוטן', area: 'Eixample · Aribau 65', kind: 'food', lat: 41.38871, lng: 2.15870, src: 'https://www.timeout.es/barcelona/es/restaurantes/mad-mad-vegan-barcelona' },
      { name: 'Asante Café', note: 'בראנץ׳ טבעוני לגמרי. לחם ללא גלוטן לפי מלאי, הקינוחים לא GF', area: 'Sants · Elkano 63', kind: 'food', lat: 41.37401, lng: 2.16016, src: 'https://www.happycow.net/reviews/asante-barcelona-407671', verify: 'פתוח רק בחלק מימות השבוע, עד אחר הצהריים' }
    ],
    bars: [
      { name: 'Monk Barcelona', note: 'קוקטיילים בבר נסתר מאחורי חנות מכולת', area: 'El Born · Abaixadors 10', kind: 'bar', lat: 41.38330, lng: 2.18147, src: 'https://www.diffordsguide.com/bars/z268Az/monk' },
      { name: 'Paradiso', note: 'נכנסים דרך מקרר בבר פסטרמה. מקום 4 ברשימת 50 הברים הטובים בעולם 2025', area: 'El Born · Rera Palau 4', kind: 'bar', lat: 41.38367, lng: 2.18370, src: 'https://www.theworlds50best.com/bars/best-in-the-world/the-list/paradiso.html' },
      { name: 'Sips', note: 'מקום 3 ברשימת 50 הברים הטובים בעולם 2025. כדאי להגיע מוקדם', area: 'Eixample · Muntaner', kind: 'bar', lat: 41.38887, lng: 2.15672, src: 'https://www.timeout.com/news/the-worlds-50-best-bars-have-just-been-announced-for-2025-heres-the-top-10-100825' }
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
