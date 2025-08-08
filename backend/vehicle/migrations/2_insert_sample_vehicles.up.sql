-- Insert sample vehicles for testing
INSERT INTO vehicles (name, brand_id, type_id, year_start, year_end, engine_specs, power_hp, top_speed_kmh, acceleration_0_100, production_count, estimated_value_min, estimated_value_max, rarity_level, restoration_difficulty, description, history, available_for_acquisition) VALUES

-- German vehicles
('911 Carrera 2.7', 1, 1, 1973, 1975, 'Flat-6 2.7L', 210, 240, 6.3, 5000, 80000, 120000, 3, 3, 'Icône de la marque Porsche, la 911 Carrera 2.7 est une référence absolue.', 'Lancée en 1973, cette version marque l''apogée de la première génération de 911.', true),
('E30 M3', 2, 1, 1986, 1991, 'S14 2.3L I4', 200, 235, 6.7, 17970, 45000, 75000, 4, 2, 'La première M3, une légende de la route et de la piste.', 'Développée pour l''homologation en DTM, la E30 M3 est devenue culte.', true),
('300 SL Gullwing', 3, 1, 1954, 1957, 'M198 3.0L I6', 215, 250, 8.8, 1400, 1200000, 1800000, 5, 4, 'L''une des voitures les plus désirables au monde.', 'Révolutionnaire avec ses portes papillon et son injection directe.', false),
('Quattro', 4, 1, 1980, 1991, '2.1L I5 Turbo', 200, 220, 7.1, 11452, 35000, 55000, 3, 3, 'Pionnière de la transmission intégrale en rallye.', 'Révolutionna le monde du rallye avec sa transmission quattro.', true),

-- Italian vehicles
('250 GTO', 5, 1, 1962, 1964, 'V12 3.0L', 300, 280, 6.1, 36, 40000000, 70000000, 5, 5, 'La Ferrari la plus précieuse au monde.', 'Conçue pour la compétition, seulement 36 exemplaires produits.', false),
('Miura P400', 6, 1, 1966, 1973, 'V12 4.0L', 350, 280, 6.7, 764, 800000, 1500000, 5, 4, 'La première supercar moderne.', 'Révolutionna le design automobile avec son moteur central.', false),
('33 Stradale', 7, 1, 1967, 1969, 'V8 2.0L', 230, 260, 5.5, 18, 8000000, 12000000, 5, 5, 'L''une des plus belles voitures jamais créées.', 'Chef-d''œuvre de design signé Franco Scaglione.', false),
('Bora', 8, 1, 1971, 1978, 'V8 4.7L', 310, 280, 6.5, 564, 120000, 180000, 4, 3, 'Élégante GT italienne à moteur central.', 'Dessinée par Giugiaro, rivale de la Lamborghini Miura.', true),

-- French vehicles
('A110 1600S', 9, 1, 1970, 1977, '1.6L I4', 140, 210, 6.5, 7976, 45000, 75000, 3, 2, 'Légendaire Alpine de rallye.', 'Dominatrice des rallyes dans les années 70.', true),
('DS21', 10, 6, 1965, 1975, '2.1L I4', 109, 175, 12.5, 1330755, 15000, 35000, 2, 2, 'Révolutionnaire berline française.', 'Avancée technologique majeure avec sa suspension hydropneumatique.', true),
('205 GTI 1.9', 11, 1, 1986, 1994, '1.9L I4', 130, 195, 7.8, 73500, 12000, 25000, 2, 1, 'Référence des GTI compactes.', 'Définit les standards de la sportive accessible.', true),

-- British vehicles
('E-Type Series 1', 12, 1, 1961, 1968, 'XK6 3.8L I6', 265, 240, 7.1, 15490, 80000, 150000, 4, 3, 'Icône du design automobile britannique.', 'Enzo Ferrari l''appelait "la plus belle voiture du monde".', true),
('DB5', 13, 2, 1963, 1965, 'I6 4.0L', 282, 230, 8.1, 1021, 400000, 800000, 4, 4, 'L''Aston Martin de James Bond.', 'Rendue célèbre par les films de James Bond.', false),
('Cooper S', 14, 1, 1963, 1971, '1.3L I4', 76, 155, 10.9, 45000, 18000, 35000, 2, 2, 'Petite sportive révolutionnaire.', 'Domina les rallyes malgré sa petite taille.', true),

-- American vehicles
('Mustang Boss 429', 15, 3, 1969, 1970, 'Boss 429 V8', 375, 190, 5.1, 1359, 180000, 350000, 5, 3, 'Muscle car légendaire de Ford.', 'Créée pour l''homologation NASCAR avec le moteur Boss 429.', true),
('Corvette Stingray', 16, 1, 1963, 1967, 'V8 327', 365, 225, 5.6, 118964, 65000, 120000, 3, 2, 'Icône américaine de la voiture de sport.', 'Design révolutionnaire signé Bill Mitchell.', true),
('Charger R/T 440', 17, 3, 1968, 1970, 'V8 440', 375, 210, 5.3, 96100, 45000, 85000, 3, 2, 'Muscle car emblématique de Dodge.', 'Star du cinéma et symbole de l''Amérique des années 60.', true),

-- Japanese vehicles
('Supra A80', 18, 1, 1993, 2002, '2JZ-GTE 3.0L I6 Twin Turbo', 320, 250, 4.9, 11239, 55000, 120000, 4, 2, 'Légende japonaise de la performance.', 'Rendue célèbre par Fast & Furious et sa fiabilité légendaire.', true),
('Skyline GT-R R32', 19, 1, 1989, 1994, 'RB26DETT 2.6L I6 Twin Turbo', 280, 250, 5.6, 43934, 35000, 65000, 4, 2, 'Godzilla des circuits japonais.', 'Domina les circuits japonais et australiens.', true),
('NSX NA1', 20, 1, 1990, 1997, 'C30A 3.0L V6', 270, 270, 5.3, 8997, 85000, 150000, 4, 3, 'Supercar japonaise révolutionnaire.', 'Première supercar japonaise, développée avec Ayrton Senna.', true);

-- Insert sample vehicle images
INSERT INTO vehicle_images (vehicle_id, url, alt_text, is_primary, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3', 'Porsche 911 Carrera 2.7', true, 0),
(2, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3', 'BMW E30 M3', true, 0),
(3, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3', 'Mercedes 300 SL', true, 0),
(4, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3', 'Audi Quattro', true, 0),
(5, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3', 'Ferrari 250 GTO', true, 0),
(6, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3', 'Lamborghini Miura', true, 0),
(7, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3', 'Alfa Romeo 33 Stradale', true, 0),
(8, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3', 'Maserati Bora', true, 0),
(9, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3', 'Alpine A110', true, 0),
(10, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3', 'Citroën DS21', true, 0),
(11, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3', 'Peugeot 205 GTI', true, 0),
(12, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3', 'Jaguar E-Type', true, 0),
(13, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3', 'Aston Martin DB5', true, 0),
(14, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3', 'Mini Cooper S', true, 0),
(15, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3', 'Ford Mustang Boss 429', true, 0),
(16, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3', 'Chevrolet Corvette Stingray', true, 0),
(17, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3', 'Dodge Charger R/T', true, 0),
(18, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3', 'Toyota Supra A80', true, 0),
(19, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3', 'Nissan Skyline GT-R R32', true, 0),
(20, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3', 'Honda NSX NA1', true, 0);
