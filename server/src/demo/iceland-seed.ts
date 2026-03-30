import Database from 'better-sqlite3';

// Category IDs (matches demo-seed.ts): 1=Hotel, 2=Restaurant, 3=Attraction,
// 5=Transport, 6=Entertainment, 7=Bar/Cafe, 8=Beach, 9=Nature

export function seedIcelandTrip(
    db: Database.Database,
    adminId: number,
    demoId: number
  ): void {
    const insertTrip = db.prepare(
          'INSERT INTO trips (user_id, name, description, start_date, end_date, currency) VALUES (?, ?, ?, ?, ?, ?)'
        );
    const insertDay = db.prepare(
          'INSERT INTO trip_days (trip_id, day_number, date) VALUES (?, ?, ?)'
        );
    const insertPlace = db.prepare(
          'INSERT INTO places (trip_id, name, lat, lng, address, category_id, place_time, duration_minutes, notes, image_url, google_place_id, website, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
    const insertAssignment = db.prepare(
          'INSERT INTO day_assignments (day_id, place_id, order_index) VALUES (?, ?, ?)'
        );
    const insertPacking = db.prepare(
          'INSERT INTO packing_items (trip_id, name, checked, category, sort_order) VALUES (?, ?, ?, ?, ?)'
        );
    const insertBudget = db.prepare(
          'INSERT INTO budget_items (trip_id, category, name, total_price, persons, note) VALUES (?, ?, ?, ?, ?, ?)'
        );
    const insertReservation = db.prepare(
          'INSERT INTO reservations (trip_id, day_id, title, reservation_time, confirmation_number, status, type, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
    const insertMember = db.prepare(
          'INSERT OR IGNORE INTO trip_members (trip_id, user_id, invited_by) VALUES (?, ?, ?)'
        );
    const insertNote = db.prepare(
          'INSERT INTO day_notes (day_id, trip_id, text, time, icon, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
        );

  // ---- Trip 4: Iceland Ring Road ----
  const trip4 = insertTrip.run(
        adminId,
        'Iceland Ring Road',
        "Fire and ice - geysers, glaciers, black-sand beaches, and the midnight sun on Iceland's legendary Ring Road.",
        '2026-07-05',
        '2026-07-11',
        'EUR'
      );
    const t4 = Number(trip4.lastInsertRowid);

  const t4days: number[] = [];
    for (let i = 0; i < 7; i++) {
          const d = insertDay.run(t4, i + 1, `2026-07-${String(5 + i).padStart(2, '0')}`);
          t4days.push(Number(d.lastInsertRowid));
    }

  const t4places: [
        number, string, number, number, string, number, string, number,
        string, string | null, string | null, string | null, string | null
      ][] = [
        // --- Day 1: Reykjavik ---
        [t4, 'Konsulat Hotel Reykjavik', 64.1466, -21.9426,
               'Hafnarstraeti 19, 101 Reykjavik, Iceland', 1, '15:00', 60,
               'Check-in from 3 PM. Boutique hotel in the heart of the old harbour district.',
               null, 'ChIJ_konsulat_rvk', 'https://www.islandhotelreykjavik.is/', '+354 595 8540'],
        [t4, 'Hallgrimskirkja Church', 64.1422, -21.9266,
               'Hallgrimstorg 1, 101 Reykjavik, Iceland', 3, '09:30', 60,
               'Take the elevator to the top for panoramic views. Arrive early to skip queues.',
               null, 'ChIJhallgrimskirkja', 'https://www.hallgrimskirkja.is/', '+354 510 1000'],
        [t4, 'Harpa Concert Hall', 64.1497, -21.9329,
               'Austurbakki 2, 101 Reykjavik, Iceland', 6, '11:00', 45,
               'Stunning glass facade designed by Henning Larsen. Free to walk through the lobby.',
               null, 'ChIJharpa_rvk', 'https://harpa.is/', '+354 528 5050'],
        [t4, 'Laugavegur Street', 64.1448, -21.9235,
               'Laugavegur, 101 Reykjavik, Iceland', 6, '13:00', 90,
               'Main shopping and dining street. Try a lamb hot dog at Baejarin Beztu nearby.',
               null, 'ChIJlaugavegur', null, null],
        [t4, 'Perlan - Wonders of Iceland', 64.1286, -21.9148,
               'Varmahlid 1, 105 Reykjavik, Iceland', 3, '16:00', 90,
               'Museum with Northern Lights planetarium show and real ice cave. Book tickets in advance!',
               null, 'ChIJperlan_rvk', 'https://perlan.is/', '+354 566 9000'],
        // --- Day 2: Golden Circle ---
        [t4, 'Thingvellir National Park', 64.2558, -20.9019,
               'Thingvellir, Iceland', 9, '09:00', 120,
               'Walk between the North American and Eurasian tectonic plates. UNESCO World Heritage Site.',
               null, 'ChIJthingvellir', 'https://www.thingvellir.is/', null],
        [t4, 'Geysir and Strokkur', 64.3133, -20.3016,
               'Haukadalur, Iceland', 9, '11:30', 60,
               'Strokkur erupts every 5-10 minutes. Stand downwind! Geysir is dormant but impressive.',
               null, 'ChIJgeysir_haukadalur', null, null],
        [t4, 'Gullfoss Waterfall', 64.3277, -20.1203,
               'Gullfoss, Iceland', 9, '13:00', 60,
               'Two-tiered waterfall plunging into a dramatic gorge. Bring a rain jacket - you will get wet!',
               null, 'ChIJgullfoss', 'https://www.gullfoss.is/', null],
        [t4, 'Hotel Selfoss', 63.9332, -21.0031,
               'Eyravegur 2, 800 Selfoss, Iceland', 1, '17:00', 60,
               'Check-in. Good base for the south coast day.',
               null, 'ChIJhotelselfoss', 'https://www.hotelselfoss.is/', '+354 482 2500'],
        // --- Day 3: South Coast ---
        [t4, 'Seljalandsfoss Waterfall', 63.6156, -19.9886,
               'Seljalandsfoss, Iceland', 9, '09:00', 60,
               'Walk behind the waterfall! Wear fully waterproof clothing - path can be very slippery.',
               null, 'ChIJseljalandsfoss', null, null],
        [t4, 'Skogafoss Waterfall', 63.5322, -19.5127,
               'Skogar, Iceland', 9, '10:30', 60,
               'Climb the 527 steps to the top for a view over the coastal plain.',
               null, 'ChIJskogafoss', null, null],
        [t4, 'Reynisfjara Black Sand Beach', 63.4085, -19.0449,
               'Reynisfjara, Vik, Iceland', 8, '12:30', 75,
               "Dramatic black basalt columns and sea stacks. NEVER turn your back to the waves — sneaker waves are dangerous.",
               null, 'ChIJreynisfjara', null, null],
        [t4, 'Hotel Dyrholaey', 63.4273, -19.1282,
               'Myrdalsvegur, 871 Vik, Iceland', 1, '16:00', 60,
               'Check-in. Scenic clifftop location near Vik with views of Reynisfjara.',
               null, 'ChIJdyrholaey', 'https://www.dyrholaey.is/', '+354 487 1333'],
        // --- Day 4: Vatnajokull Glacier Area ---
        [t4, 'Skaftafell Visitor Centre', 64.0166, -16.9753,
               'Skaftafell, Vatnajokull, Iceland', 9, '09:00', 120,
               "Gateway to Vatnajokull. Take the trail to Svartifoss waterfall — stunning black basalt columns.",
               null, 'ChIJskaftafell', 'https://www.vatnajokulsthjodgardur.is/', null],
        [t4, 'Jokulsarlon Glacier Lagoon', 64.0784, -16.2306,
               'Jokulsarlon, Iceland', 9, '12:00', 90,
               'Boat tour among blue icebergs is highly recommended. Book amphibious boat well in advance.',
               null, 'ChIJjokulsarlon', 'https://icelagoon.is/', '+354 478 2222'],
        [t4, 'Diamond Beach', 64.0438, -16.1797,
               'Diamond Beach, Jokulsarlon, Iceland', 8, '13:45', 45,
               'Ice chunks from the lagoon wash onto the black sand — a stunning photo opportunity.',
               null, 'ChIJdiamondbeach', null, null],
        [t4, 'Fosshotel Vatnajokull', 64.0267, -16.4000,
               'Fagurhólsmyri, Iceland', 1, '17:00', 60,
               'Check-in. Remote and peaceful — perfect base for the glacier area.',
               null, 'ChIJfosshotelvatna', 'https://www.islandshotel.is/', '+354 478 1945'],
        // --- Day 5: East Fjords -> Myvatn ---
        [t4, 'Hofn Lobster Restaurant', 64.2526, -15.2065,
               'Hafnarbraut 4, 780 Hofn, Iceland', 2, '10:00', 60,
               "Hofn is Iceland's langoustine capital. The humarsupa (lobster soup) is unmissable.",
               null, 'ChIJhofnlobster', null, '+354 478 1095'],
        [t4, 'Lake Myvatn', 65.5955, -17.0059,
               'Myvatn, Iceland', 9, '15:00', 120,
               'Surreal volcanic landscape with pseudo-craters and lava formations. Bring insect repellent — midges are ferocious!',
               null, 'ChIJmyvatn', null, null],
        [t4, 'Namaskard Geothermal Area', 65.6375, -16.8266,
               'Namafjall, Myvatn, Iceland', 9, '17:30', 60,
               'Bubbling mud pools and sulfurous fumaroles straight out of a sci-fi film.',
               null, 'ChIJnamaskard', null, null],
        [t4, 'Fosshotel Myvatn', 65.6081, -17.0001,
               'Grimsstadir, 660 Myvatn, Iceland', 1, '19:00', 60,
               'Check-in. Good base for northern Iceland days.',
               null, 'ChIJfosshotelmyvatn', 'https://www.islandshotel.is/', '+354 464 4240'],
        // --- Day 6: North Iceland ---
        [t4, 'Dettifoss Waterfall', 65.8146, -16.3847,
               'Vatnajokull National Park, Iceland', 9, '09:00', 90,
               'Most powerful waterfall in Europe. The east bank (Road 864) gives the best view.',
               null, 'ChIJdettifoss', null, null],
        [t4, 'Godafoss Waterfall', 65.6826, -17.5500,
               'Fossholl, Iceland', 9, '12:00', 60,
               "The Waterfall of the Gods — site where Norse idols were cast into the water in 1000 AD.",
               null, 'ChIJgodafoss', null, null],
        [t4, 'Akureyri Botanical Garden', 65.6885, -18.0855,
               'Eyrarlandsvegur, 600 Akureyri, Iceland', 9, '14:30', 60,
               "Northernmost botanical garden in the world. Free entry. Peaceful rest stop.",
               null, 'ChIJakureyribotanic', 'https://lystigardur.akureyri.is/', null],
        [t4, 'Hotel KEA Akureyri', 65.6828, -18.0955,
               'Hafnarstraeti 87-89, 600 Akureyri, Iceland', 1, '17:00', 60,
               "Check-in. Best hotel in Akureyri, Iceland's northern capital.",
               null, 'ChIJhotelkea', 'https://www.keahotels.is/', '+354 460 2000'],
        // --- Day 7: Snaefellsnes & Return ---
        [t4, 'Kirkjufell Mountain', 64.9370, -23.3100,
               'Grundarfjordur, Snaefellsnes, Iceland', 9, '10:00', 90,
               "Iceland's most-photographed mountain. Best shot from the waterfall viewpoint across the road.",
               null, 'ChIJkirkjufell', null, null],
        [t4, 'Snaefellsjokull Glacier', 64.8081, -23.7720,
               'Snaefellsjokull National Park, Iceland', 9, '12:30', 90,
               "Jules Verne's 'Journey to the Centre of the Earth' starts here. Walk the lava fields at the visitor centre.",
               null, 'ChIJsnaefellsjokull', 'https://www.snaefellsjokull.is/', null],
        [t4, 'Konsulat Hotel Reykjavik (Return)', 64.1466, -21.9426,
               'Hafnarstraeti 19, 101 Reykjavik, Iceland', 1, '18:00', 60,
               'Back in Reykjavik for the final night before flying home.',
               null, 'ChIJ_konsulat_rvk_d7', 'https://www.islandhotelreykjavik.is/', '+354 595 8540'],
      ];

  const t4pIds = t4places.map(p => Number(insertPlace.run(...p).lastInsertRowid));

  // --- Day assignments ---
  // Day 1: Reykjavik city
  insertAssignment.run(t4days[0], t4pIds[0], 0);
    insertAssignment.run(t4days[0], t4pIds[1], 1);
    insertAssignment.run(t4days[0], t4pIds[2], 2);
    insertAssignment.run(t4days[0], t4pIds[3], 3);
    insertAssignment.run(t4days[0], t4pIds[4], 4);
    insertNote.run(t4days[0], t4, 'Pick up rental car after check-in — 4WD strongly recommended.', '16:30', 'Car', 0);

  // Day 2: Golden Circle
  insertAssignment.run(t4days[1], t4pIds[5], 0);
    insertAssignment.run(t4days[1], t4pIds[6], 1);
    insertAssignment.run(t4days[1], t4pIds[7], 2);
    insertAssignment.run(t4days[1], t4pIds[8], 3);
    insertNote.run(t4days[1], t4, 'Full loop is ~250 km — start early to have enough time at each stop.', '08:30', 'Car', 0);

  // Day 3: South Coast
  insertAssignment.run(t4days[2], t4pIds[9], 0);
    insertAssignment.run(t4days[2], t4pIds[10], 1);
    insertAssignment.run(t4days[2], t4pIds[11], 2);
    insertAssignment.run(t4days[2], t4pIds[12], 3);
    insertNote.run(t4days[2], t4, 'Road 1 east from Selfoss — roughly 200 km to Vik.', '08:00', 'Car', 0);

  // Day 4: Vatnajokull glacier area
  insertAssignment.run(t4days[3], t4pIds[13], 0);
    insertAssignment.run(t4days[3], t4pIds[14], 1);
    insertAssignment.run(t4days[3], t4pIds[15], 2);
    insertAssignment.run(t4days[3], t4pIds[16], 3);
    insertNote.run(t4days[3], t4, 'Glacier lagoon boat tour departs at 12:00 — book online well in advance.', '11:45', 'Boat', 0);

  // Day 5: East Fjords -> Myvatn
  insertAssignment.run(t4days[4], t4pIds[17], 0);
    insertAssignment.run(t4days[4], t4pIds[18], 1);
    insertAssignment.run(t4days[4], t4pIds[19], 2);
    insertAssignment.run(t4days[4], t4pIds[20], 3);
    insertNote.run(t4days[4], t4, 'Long driving day (~400 km). Leave Hofn by 09:00.', '08:30', 'Car', 0);

  // Day 6: North Iceland
  insertAssignment.run(t4days[5], t4pIds[21], 0);
    insertAssignment.run(t4days[5], t4pIds[22], 1);
    insertAssignment.run(t4days[5], t4pIds[23], 2);
    insertAssignment.run(t4days[5], t4pIds[24], 3);
    insertNote.run(t4days[5], t4, 'Check road 864 conditions before heading to Dettifoss — can be closed.', '08:00', 'Warning', 0);

  // Day 7: Snaefellsnes -> Reykjavik
  insertAssignment.run(t4days[6], t4pIds[25], 0);
    insertAssignment.run(t4days[6], t4pIds[26], 1);
    insertAssignment.run(t4days[6], t4pIds[27], 2);
    insertNote.run(t4days[6], t4, 'Return rental car before 18:00. Flight home tomorrow from Keflavik.', '17:30', 'Plane', 0);

  // --- Packing list ---
  const t4packing: [string, number, string, number][] = [
        ['Passport', 1, 'Documents', 0],
        ['Travel insurance', 0, 'Documents', 1],
        ['4WD rental confirmation', 1, 'Documents', 2],
        ['Waterproof jacket', 0, 'Clothing', 3],
        ['Waterproof trousers', 0, 'Clothing', 4],
        ['Warm fleece / base layers', 0, 'Clothing', 5],
        ['Hiking boots', 0, 'Clothing', 6],
        ['Sunglasses', 0, 'Clothing', 7],
        ['Insect repellent (midges!)', 0, 'Toiletries', 8],
        ['Sunscreen SPF50', 0, 'Toiletries', 9],
        ['Camera + extra batteries (cold drains fast)', 0, 'Electronics', 10],
        ['Portable charger', 0, 'Electronics', 11],
        ['Offline maps (Maps.me or Google Offline)', 0, 'Electronics', 12],
        ['Swimwear (geothermal pools / hot pots)', 0, 'Summer', 13],
        ['Reusable water bottle (tap water is glacier-pure)', 0, 'Toiletries', 14],
      ];
    t4packing.forEach(p => insertPacking.run(t4, ...p));

  // --- Budget (EUR) ---
  insertBudget.run(t4, 'Accommodation', 'Hotels - 7 nights (avg 120 EUR/night)', 840, 2, 'Mix of boutique and fosshotels');
    insertBudget.run(t4, 'Transport', 'Return flights (e.g. FRA-KEF)', 320, 2, 'Icelandair or low-cost deals');
    insertBudget.run(t4, 'Transport', '4WD rental car - 7 days', 700, 2, 'Essential for gravel roads');
    insertBudget.run(t4, 'Food', 'Daily food budget', 350, 2, 'Approx. 50 EUR/day — self-catering saves a lot');
    insertBudget.run(t4, 'Activities', 'Glacier lagoon boat tour + Perlan museum', 120, 2, 'Book online in advance');
    insertBudget.run(t4, 'Activities', 'Snaefellsjokull national park + other fees', 40, 2, null);

  // --- Reservations ---
  insertReservation.run(t4, t4days[0], 'Konsulat Hotel Check-in', '15:00', 'KON-2026-11001', 'confirmed', 'hotel', 'Hafnarstraeti 19, Reykjavik');
    insertReservation.run(t4, t4days[3], 'Jokulsarlon Boat Tour', '12:00', 'ICE-LAG-2026-887', 'confirmed', 'activity', 'Jokulsarlon Glacier Lagoon');
    insertReservation.run(t4, t4days[6], 'Car Return - Keflavik Airport', '17:00', 'CAR-KEF-2026-4231', 'confirmed', 'transport', 'Keflavik International Airport');

  insertMember.run(t4, demoId, adminId);

  console.log('[Demo] Iceland Ring Road trip seeded.');
}
