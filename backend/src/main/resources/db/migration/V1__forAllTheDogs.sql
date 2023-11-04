-- CREATE USERS
-- CREATE ROLE drizzy WITH LOGIN PASSWORD 'drake' SUPERUSER;

-- CREATE TABLES

CREATE TABLE IF NOT EXISTS SPECIES
(
    speciesId BIGINT NOT NULL,
    speciesName VARCHAR NOT NULL,
    PRIMARY KEY (speciesId)
    );

CREATE SEQUENCE IF NOT EXISTS SPECIES_SEQ;

CREATE TABLE IF NOT EXISTS PET
(
    petId BIGINT NOT NULL,
    petName VARCHAR NOT NULL,
    petAge INT NOT NULL,
    dateMissing DATE NOT NULL,
    hourMissing INT NOT NULL,
    description VARCHAR NOT NULL,
    speciesId BIGINT NOT NULL,
    PRIMARY KEY (petId),
    FOREIGN KEY (speciesId) REFERENCES SPECIES(speciesId)
    );

CREATE SEQUENCE IF NOT EXISTS PET_SEQ;

CREATE TABLE IF NOT EXISTS COLOR
(
    colorId BIGINT NOT NULL,
    colorName VARCHAR NOT NULL,
    PRIMARY KEY (colorId)
);

CREATE SEQUENCE IF NOT EXISTS COLOR_SEQ;

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

CREATE TABLE IF NOT EXISTS IMAGE
(
    imageId BIGINT NOT NULL,
    imageUrl VARCHAR NOT NULL,
    PRIMARY KEY (imageId)
);

CREATE SEQUENCE IF NOT EXISTS IMAGE_SEQ;

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

CREATE TABLE IF NOT EXISTS AD
(
    adId BIGINT NOT NULL,
    inShelter INT NOT NULL,
    activityId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    image1Id BIGINT NOT NULL,
    image2Id BIGINT,
    image3Id BIGINT,
    petId BIGINT NOT NULL,
    PRIMARY KEY (adId),
    FOREIGN KEY (activityId) REFERENCES ACTIVITY(activityId),
    FOREIGN KEY (userId) REFERENCES APP_USER(userId),
    FOREIGN KEY (image1Id) REFERENCES IMAGE(imageId),
    FOREIGN KEY (image2Id) REFERENCES IMAGE(imageId),
    FOREIGN KEY (image3Id) REFERENCES IMAGE(imageId),
    FOREIGN KEY (petId) REFERENCES PET(petId)
);

CREATE SEQUENCE IF NOT EXISTS AD_SEQ;

CREATE TABLE IF NOT EXISTS MESSAGE
(
    messageId BIGINT NOT NULL,
    text VARCHAR,
    date DATE NOT NULL,
    location VARCHAR,
    userId BIGINT NOT NULL,
    adId BIGINT NOT NULL,
    imageId BIGINT,
    PRIMARY KEY (messageId),
    FOREIGN KEY (userId) REFERENCES APP_USER(userId),
    FOREIGN KEY (adId) REFERENCES AD(adId),
    FOREIGN KEY (imageId) REFERENCES IMAGE(imageId)
);

CREATE SEQUENCE IF NOT EXISTS MESSAGE_SEQ;

CREATE TABLE IF NOT EXISTS of_color
(
    colorId BIGINT NOT NULL,
    petId BIGINT NOT NULL,
    PRIMARY KEY (colorId, petId),
    FOREIGN KEY (colorId) REFERENCES COLOR(colorId),
    FOREIGN KEY (petId) REFERENCES PET(petId)
);


-- INSERTS
INSERT INTO USER_TYPE (userTypeId, name) VALUES (1, 'Osoba');
INSERT INTO USER_TYPE (userTypeId, name) VALUES (2, 'Sklonište');


INSERT INTO COLOR (colorId, colorName) VALUES (1, 'Smedja');
INSERT INTO COLOR (colorId, colorName) VALUES (2, 'Crna');
INSERT INTO COLOR (colorId, colorName) VALUES (3, 'Bijela');
INSERT INTO COLOR (colorId, colorName) VALUES (4, 'Zuta');
INSERT INTO COLOR (colorId, colorName) VALUES (5, 'Narancasta');
INSERT INTO COLOR (colorId, colorName) VALUES (6, 'Siva');
INSERT INTO COLOR (colorId, colorName) VALUES (7, 'Crvena');
INSERT INTO COLOR (colorId, colorName) VALUES (8, 'Plava');
INSERT INTO COLOR (colorId, colorName) VALUES (9, 'Zelena');
INSERT INTO COLOR (colorId, colorName) VALUES (10, 'Bez');