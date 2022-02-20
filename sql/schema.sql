-- Útfæra schema


-- CREATE TABLE test(
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(64) not null,
--   number int not null
-- );


DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE IF NOT EXISTS events(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  slug VARCHAR(64) NOT NULL,
  description VARCHAR(400),
  created TIMESTAMP NOT NULL,
  updated TIMESTAMP NOT NULL
);

-- --#region INSERT
INSERT INTO
  events (name, slug, description, created, updated)
  VALUES(
    'DaftPunk í laugardalshöllinni',
    'daftpunk-i-laugardalshollinni',
    'Hljómsveitin DaftPunk ætlar að spila í Laugardalshöllinni',
    'January 20, 2022',
    'January 20, 2022'
    );
-- INSERT 2
INSERT INTO
  events (name, slug, description, created, updated)
  VALUES(
    'StarWars LXXXXVIIII Yet Another Skywalker',
    'starwars-lxxxxviiii-yet-another-skywalker',
    'Splúnku ný bíómynd frá barnabarnabarnabarnabarni George Lucas!',
    'May 4, 2222',
    'May 4, 2222'
    );
-- INSERT 3
INSERT INTO
  events (name, slug, description, created, updated)
  VALUES(
    'Endalok Alheimsins',
    'endalok-alheimsins',
    'Þið viljið ekki missa af stærsta viðburði sem alheimurinn hefur nokkurtímann boðið upp á. Bring your wives, bring your kids and dont under ANY circumstances forget your towel!!',
    'April 1, 2012',
    'April 1, 2012'
    );
  --#endregion

DROP TABLE IF EXISTS signatures;

CREATE TABLE IF NOT EXISTS signatures(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  comment VARCHAR(400),
  event INT NOT NULL,
  created TIMESTAMP,
  FOREIGN KEY (event) REFERENCES events(id)
);

-- INSERT 1
 INSERT INTO
    signatures (name, comment, event, created)
    VALUES(
      'valdi',
      'Svo spenntur fyrir endalokunum!!',
      3,>
      'February 18, 2022, 5:45:18'
    );
-- INSERT 2
INSERT INTO
    signatures (name, comment, event, created)
    VALUES(
      'Krissi',
      'Ég ELSKA DAFT PUNK!!',
      1,
      'February 18, 2022, 10:10:45 am'
    );
-- INSERT 3
INSERT INTO
    signatures (name, comment, event, created)
    VALUES(
      'Óli',
      'Loksins! búinn að vera að bíða eftir þessari lengi!',
      2,
      'February 18, 2022'
    );

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username character varying(255) NOT NULL,
  password character varying(255) NOT NULL
);

--INSERT users (username, password) VALUES ('admin', <kóða eitthvað password>)
