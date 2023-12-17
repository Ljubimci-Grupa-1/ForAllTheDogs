CREATE TABLE IF NOT EXISTS SPECIES
(
    speciesId BIGINT NOT NULL,
    speciesName VARCHAR NOT NULL,
    PRIMARY KEY (speciesId)
    );


CREATE TABLE IF NOT EXISTS ACTIVITY
(
    activityId BIGINT NOT NULL,
    activityCategory VARCHAR NOT NULL,
    PRIMARY KEY (activityId)
    );

CREATE SEQUENCE IF NOT EXISTS ACTIVITY_SEQ;

CREATE TABLE IF NOT EXISTS USER_TYPE
(
    userTypeId BIGINT NOT NULL,
    name VARCHAR NOT NULL,
    PRIMARY KEY (userTypeId)
    );

CREATE SEQUENCE IF NOT EXISTS USER_TYPE_SEQ;

CREATE TABLE IF NOT EXISTS COLOR
(
    colorId BIGINT NOT NULL,
    colorName VARCHAR NOT NULL,
    PRIMARY KEY (colorId)
    );

CREATE TABLE IF NOT EXISTS COUNTY
(
    countyId BIGINT NOT NULL,
    countyName VARCHAR NOT NULL,
    PRIMARY KEY (countyId)
    );

CREATE TABLE IF NOT EXISTS CITY
(
    cityId BIGINT NOT NULL,
    cityName VARCHAR NOT NULL,
    countyId BIGINT NOT NULL,
    PRIMARY KEY (cityId),
    FOREIGN KEY (countyId) REFERENCES COUNTY(countyId)
    );


CREATE TABLE IF NOT EXISTS APP_USER
(
    userId BIGINT NOT NULL,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    telephone_number VARCHAR NOT NULL,
    userTypeId BIGINT NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (userTypeId) REFERENCES USER_TYPE(userTypeId),
    UNIQUE (username),
    UNIQUE (email),
    UNIQUE (telephone_number)
);

CREATE SEQUENCE IF NOT EXISTS APP_USER_SEQ;

CREATE TABLE IF NOT EXISTS LOCATION
(
    locationId BIGINT NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    cityId BIGINT NOT NULL,
    PRIMARY KEY (locationId),
    FOREIGN KEY (cityId) REFERENCES CITY(cityId)
);

CREATE SEQUENCE IF NOT EXISTS LOCATION_SEQ;

CREATE TABLE IF NOT EXISTS PET
(
    petId BIGINT NOT NULL,
    petName VARCHAR,
    petAge INT,
    dateTimeMissing TIMESTAMP WITHOUT TIME ZONE,
    description VARCHAR NOT NULL,
    speciesId BIGINT NOT NULL,
    locationId BIGINT NOT NULL,
    PRIMARY KEY (petId),
    FOREIGN KEY (speciesId) REFERENCES SPECIES(speciesId),
    FOREIGN KEY (locationId) REFERENCES LOCATION(locationId)
);

CREATE SEQUENCE IF NOT EXISTS PET_SEQ;

CREATE TABLE IF NOT EXISTS AD
(
    adId BIGINT NOT NULL,
    inShelter INT NOT NULL,
    activityId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    petId BIGINT NOT NULL,
    PRIMARY KEY (adId),
    FOREIGN KEY (activityId) REFERENCES ACTIVITY(activityId),
    FOREIGN KEY (userId) REFERENCES APP_USER(userId),
    FOREIGN KEY (petId) REFERENCES PET(petId)
);

CREATE SEQUENCE IF NOT EXISTS AD_SEQ;

CREATE TABLE IF NOT EXISTS MESSAGE
(
    messageId BIGINT NOT NULL,
    text VARCHAR,
    date DATE NOT NULL,
    userId BIGINT NOT NULL,
    adId BIGINT NOT NULL,
    locationId BIGINT NOT NULL,
    PRIMARY KEY (messageId),
    FOREIGN KEY (userId) REFERENCES APP_USER(userId),
    FOREIGN KEY (adId) REFERENCES AD(adId),
    FOREIGN KEY (locationId) REFERENCES LOCATION(locationId)
);

CREATE SEQUENCE IF NOT EXISTS MESSAGE_SEQ;

CREATE TABLE IF NOT EXISTS IMAGE
(
    imageId BIGINT NOT NULL,
    imageUrl VARCHAR NOT NULL,
    adId BIGINT,
    messageId BIGINT,
    PRIMARY KEY (imageId),
    FOREIGN KEY (adId) REFERENCES AD(adId),
    FOREIGN KEY (messageId) REFERENCES MESSAGE(messageId)
);

CREATE SEQUENCE IF NOT EXISTS IMAGE_SEQ;

CREATE TABLE IF NOT EXISTS OF_COLOR
(
    colorId BIGINT NOT NULL,
    petId BIGINT NOT NULL,
    PRIMARY KEY (colorId, petId),
    FOREIGN KEY (colorId) REFERENCES COLOR(colorId),
    FOREIGN KEY (petId) REFERENCES PET(petId)
    );

CREATE SEQUENCE IF NOT EXISTS OF_COLOR_SEQ;




-- INSERTS
INSERT INTO USER_TYPE (userTypeId, name) VALUES (1, 'Osoba');
INSERT INTO USER_TYPE (userTypeId, name) VALUES (2, 'Sklonište');

-- TEST USER INSERT
INSERT INTO APP_USER (userId, username, email, password, name, telephone_number, userTypeId)
VALUES (1, 'Drizzy Drake', 'drizzy.drake@goated.com', 'drizzy', 'Aubrey Drake Graham', '0981234567', 1);

INSERT INTO COLOR (colorId, colorName) VALUES (1, 'Smeđa');
INSERT INTO COLOR (colorId, colorName) VALUES (2, 'Crna');
INSERT INTO COLOR (colorId, colorName) VALUES (3, 'Bijela');
INSERT INTO COLOR (colorId, colorName) VALUES (4, 'Žuta');
INSERT INTO COLOR (colorId, colorName) VALUES (5, 'Narančasta');
INSERT INTO COLOR (colorId, colorName) VALUES (6, 'Siva');
INSERT INTO COLOR (colorId, colorName) VALUES (7, 'Crvena');
INSERT INTO COLOR (colorId, colorName) VALUES (8, 'Plava');
INSERT INTO COLOR (colorId, colorName) VALUES (9, 'Zelena');
INSERT INTO COLOR (colorId, colorName) VALUES (10, 'Bež');

INSERT INTO SPECIES (speciesId, speciesName) VALUES (1, 'Pas');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (2, 'Mačka');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (3, 'Papiga');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (4, 'Hrčak');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (5, 'Zmija');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (6, 'Gušter');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (7, 'Zec');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (8, 'Kornjača');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (9, 'Konj');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (10, 'Magarac');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (11, 'Kokoš');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (12, 'Pijetao');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (13, 'Svinja');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (14, 'Pilić');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (15, 'Miš');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (16, 'Zamorac');
INSERT INTO SPECIES (speciesId, speciesName) VALUES (17, 'Ostalo');

INSERT INTO COUNTY (countyId, countyName) VALUES (1, 'Zagrebačka');
INSERT INTO COUNTY (countyId, countyName) VALUES (2, 'Krapinsko-zagorska');
INSERT INTO COUNTY (countyId, countyName) VALUES (3, 'Sisačko-moslavačka');
INSERT INTO COUNTY (countyId, countyName) VALUES (4, 'Karlovačka');
INSERT INTO COUNTY (countyId, countyName) VALUES (5, 'Varaždinska');
INSERT INTO COUNTY (countyId, countyName) VALUES (6, 'Koprivničko-križevačka');
INSERT INTO COUNTY (countyId, countyName) VALUES (7, 'Bjelovarsko-bilogorska');
INSERT INTO COUNTY (countyId, countyName) VALUES (8, 'Primorsko-goranska');
INSERT INTO COUNTY (countyId, countyName) VALUES (9, 'Ličko-senjska');
INSERT INTO COUNTY (countyId, countyName) VALUES (10, 'Virovitičko-podravska');
INSERT INTO COUNTY (countyId, countyName) VALUES (11, 'Požeško-slavonska');
INSERT INTO COUNTY (countyId, countyName) VALUES (12, 'Brodsko-posavska');
INSERT INTO COUNTY (countyId, countyName) VALUES (13, 'Zadarska');
INSERT INTO COUNTY (countyId, countyName) VALUES (14, 'Osječko-baranjska');
INSERT INTO COUNTY (countyId, countyName) VALUES (15, 'Šibensko-kninska');
INSERT INTO COUNTY (countyId, countyName) VALUES (16, 'Vukovarsko-srijemska');
INSERT INTO COUNTY (countyId, countyName) VALUES (17, 'Splitsko-dalmatinska');
INSERT INTO COUNTY (countyId, countyName) VALUES (18, 'Istarska');
INSERT INTO COUNTY (countyId, countyName) VALUES (19, 'Dubrovačko-neretvanska');
INSERT INTO COUNTY (countyId, countyName) VALUES (20, 'Međimurska');
INSERT INTO COUNTY (countyId, countyName) VALUES (21, 'Grad Zagreb');


INSERT INTO CITY (cityId, cityName, countyId) VALUES (1, 'Bakar', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (2, 'Beli Manastir', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (3, 'Belišće', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (4, 'Benkovac', 13);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (5, 'Biograd na Moru', 13);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (6, 'Bjelovar', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (7, 'Buje', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (8, 'Buzet', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (9, 'Cres', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (10, 'Crikvenica', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (11, 'Čabar', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (12, 'Čakovec', 20);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (13, 'Čazma', 3);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (14, 'Daruvar', 3);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (15, 'Delnice', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (16, 'Donja Stubica', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (17, 'Donji Miholjac', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (18, 'Drniš', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (19, 'Dubrovnik', 19);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (20, 'Duga Resa', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (21, 'Dugo Selo', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (22, 'Đakovo', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (23, 'Đurđevac', 6);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (24, 'Garešnica', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (25, 'Glina', 3);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (26, 'Gospić', 9);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (27, 'Grubišno Polje', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (28, 'Hrvatska Kostajnica', 4);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (29, 'Hvar', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (30, 'Ilok', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (31, 'Imotski', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (32, 'Ivanec', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (33, 'Ivanić-Grad', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (34, 'Jastrebarsko', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (35, 'Karlovac', 4);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (36, 'Kastav', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (37, 'Kaštela', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (38, 'Klanjec', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (39, 'Knin', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (40, 'Komiža', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (41, 'Koprivnica', 6);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (42, 'Korčula', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (43, 'Kraljevica', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (44, 'Krapina', 2);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (45, 'Križevci', 6);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (46, 'Krk', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (47, 'Kutina', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (48, 'Kutjevo', 11);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (49, 'Labin', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (50, 'Lepoglava', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (51, 'Lipik', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (52, 'Ludbreg', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (53, 'Makarska', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (54, 'Mali Lošinj', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (55, 'Metković', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (56, 'Mursko Središće', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (57, 'Našice', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (58, 'Nin', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (59, 'Nova Gradiška', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (60, 'Novalja', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (61, 'Novigrad', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (62, 'Novi Marof', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (63, 'Novi Vinodolski', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (64, 'Novska', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (65, 'Obrovac', 13);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (66, 'Ogulin', 4);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (67, 'Omiš', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (68, 'Opatija', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (69, 'Opuzen', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (70, 'Orahovica', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (71, 'Oroslavje', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (72, 'Osijek', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (73, 'Otočac', 9);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (74, 'Otok', 6);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (75, 'Ozalj', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (76, 'Pag', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (77, 'Pakrac', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (78, 'Pazin', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (79, 'Petrinja', 3);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (80, 'Pleternica', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (81, 'Ploče', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (82, 'Popovača', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (83, 'Poreč', 19);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (84, 'Požega', 11);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (85, 'Pregrada', 2);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (86, 'Prelog', 6);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (87, 'Pula', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (88, 'Rab', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (89, 'Rijeka', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (90, 'Rovinj', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (91, 'Samobor', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (92, 'Senj', 9);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (93, 'Sinj', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (94, 'Sisak', 3);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (95, 'Skradin', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (96, 'Slatina', 10);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (97, 'Slavonski Brod', 12);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (98, 'Slunj', 4);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (99, 'Solin', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (100, 'Split', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (101, 'Stari Grad', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (102, 'Supetar', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (103, 'Sveta Nedelja', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (104, 'Sveti Ivan Zelina', 20);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (105, 'Šibenik', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (106, 'Trilj', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (107, 'Trogir', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (108, 'Umag', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (109, 'Valpovo', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (110, 'Varaždin', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (111, 'Varaždinske Toplice', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (112, 'Velika Gorica', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (113, 'Vinkovci', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (114, 'Virovitica', 10);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (115, 'Vis', 16);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (116, 'Vodice', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (117, 'Vodnjan', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (118, 'Vrbovec', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (119, 'Vrbovsko', 2);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (120, 'Vrgorac', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (121, 'Vrlika', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (122, 'Vukovar', 16);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (123, 'Zabok', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (124, 'Zadar', 13);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (125, 'Zagreb', 21);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (126, 'Zaprešić', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (127, 'Zlatar', 2);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (128, 'Županja', 16);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (129, 'Ostalo', 1);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (130, 'Ostalo', 2);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (131, 'Ostalo', 3);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (132, 'Ostalo', 4);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (133, 'Ostalo', 5);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (134, 'Ostalo', 6);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (135, 'Ostalo', 7);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (136, 'Ostalo', 8);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (137, 'Ostalo', 9);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (138, 'Ostalo', 10);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (139, 'Ostalo', 11);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (140, 'Ostalo', 12);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (141, 'Ostalo', 13);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (142, 'Ostalo', 14);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (143, 'Ostalo', 15);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (144, 'Ostalo', 16);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (145, 'Ostalo', 17);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (146, 'Ostalo', 18);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (147, 'Ostalo', 19);
INSERT INTO CITY (cityId, cityName, countyId) VALUES (148, 'Ostalo', 20);

INSERT INTO ACTIVITY(activityId, activityCategory) VALUES (1, 'Za ljubimcem se traga');
INSERT INTO ACTIVITY(activityId, activityCategory) VALUES (2, 'Sretno pronađen');
INSERT INTO ACTIVITY(activityId, activityCategory) VALUES (3, 'Nije pronađen, potraga nije više u tijeku');
INSERT INTO ACTIVITY(activityId, activityCategory) VALUES (4, 'Nesretno pronađen');