DROP table if exists users CASCADE;
DROP table if exists users_codes CASCADE;
DROP table if exists sellers CASCADE;
DROP table if exists seller_status CASCADE;
DROP table if exists admins CASCADE;
DROP table if exists auctions CASCADE;
DROP table if exists auction_status CASCADE;
DROP table if exists lots CASCADE;
DROP table if exists lot_bet CASCADE;
DROP table if exists lot_winner CASCADE;
DROP table if exists lot_images CASCADE;
DROP table if exists images CASCADE;


SET timezone TO 'Europe/Kiev';

CREATE TABLE IF NOT EXISTS images
(
    id        serial PRIMARY KEY,
    name      varchar(255) NOT NULL,
    image_url varchar(255) NOT NULL UNIQUE
);

INSERT INTO images (name, image_url)
VALUES ('user_logo_standard.png', '/images/user_logo_standard.png');

create table if not exists users
(
    id           serial primary key,
    username     varchar(255)          not null unique,
    password     varchar(255)          not null,
    email        varchar(255)          not null,
    img_path     integer DEFAULT 1 REFERENCES images (id),
    is_activated boolean default false not null
);
comment on column users.is_activated is 'need to be activate by email';

-- TEST USER
INSERT INTO users (username, password, email, is_activated)
VALUES ('misha', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('sasha', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('mirko', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('pili', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('aldo', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('marta', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('ciel', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('landon', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('matia', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('alma', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('eliora', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('catrine', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('brandon', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('hannah', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('david', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('emma', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('felix', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('grace', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('ian', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('julia', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('kevin', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('luna', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('nina', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('oscar', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('pablo', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true);
-- END TEST DATA

CREATE TABLE admins
(
    id          SERIAL PRIMARY KEY,
    login       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255)        NOT NULL,
    user_id     integer UNIQUE      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    secure_code VARCHAR(255)        NOT NULL
);

-- TEST ADMIN
INSERT INTO admins(login, password, user_id, secure_code)
VALUES ('admin', '$2b$13$bePi.8fnLfVCWxCXlza3jeK59BVJwtPIOKSBRGkFj/5a4WTF5Wbuq', 1,
        '$2b$13$GDajnJPNLmvJHr1khAia5eZeCPGITVcIc3LMqi5D3kWZsQn4pnN/S');
-- END DATA

CREATE TABLE IF NOT EXISTS users_codes
(
    id      SERIAL PRIMARY KEY,
    code    varchar(255) NOT NULL UNIQUE,
    user_id integer      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_users_codes FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

create table if not exists seller_status
(
    id   SERIAL PRIMARY KEY,
    name varchar(50) not null unique
);

INSERT INTO seller_status (id, name)
VALUES (1, 'pending'),
       (2, 'accepted'),
       (3, 'rejected');

CREATE TABLE IF NOT EXISTS sellers
(
    id           SERIAL PRIMARY KEY,
    user_id      integer             NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    full_name    varchar(255)        NOT NULL,
    social_media varchar(255)        NOT NULL,
    status_id    integer DEFAULT (1) NOT NULL REFERENCES seller_status (id) ON DELETE CASCADE,
    address      varchar(255),
    description  TEXT                NOT NULL,
    phone_number varchar(20)
);

-- TEST NOT ACTIVATE AUCTION
INSERT INTO sellers (user_id, full_name, social_media, status_id, address, description, phone_number)
VALUES (3, 'John Doe', 'instagram:JohnDoe', 1, '123 Main St, City',
        'Experienced seller specializing in antiques.',
        '123-456-7890'),
       (4, 'Alice Smith', 'twitter:AliceSmith', 3, '456 Elm St, Town', 'Passionate about vintage collectibles.',
        '234-567-8901'),
       (5, 'Bob Johnson', 'instagram:BobJohnson', 2, '789 Oak Ave, Village',
        'Art enthusiast with a focus on modern paintings.', '345-678-9012'),
       (6, 'Emma Brown', 'twitter:EmmaBrown', 2, '987 Pine Rd, Suburb',
        'Dedicated seller of rare books and manuscripts.', '456-789-0123'),
       (7, 'David Wilson', 'instagram:DavidWilson', 3, '321 Cedar Ln, County',
        'Expert in vintage jewelry and gemstones.', '567-890-1234'),
       (8, 'Sophia Lee', 'twitter:SophiaLee', 1, '654 Birch Blvd, Rural',
        'Specializes in handmade crafts and pottery.', '678-901-2345'),
       (9, 'James Taylor', 'instagram:JamesTaylor', 1, '876 Maple Dr, Forest',
        'Passionate about classic cars and automobilia.', '789-012-3456'),
       (10, 'Olivia White', 'twitter:OliviaWhite', 2, '543 Oakwood Ave, Mountain',
        'Collects and sells vintage vinyl records.', '890-123-4567'),
       (11, 'William Clark', 'instagram:WilliamClark', 3, '234 Spruce Ct, Valley',
        'Avid collector of rare coins and currency.', '901-234-5678'),
       (12, 'Grace Baker', 'twitter:GraceBaker', 3, '789 Pinecrest Rd, Canyon',
        'Specializes in antique furniture restoration.', '012-345-6789'),
       (13, 'Brandon', 'instagram:Brandon', 1, '100 Elm St, Town', 'Passionate about vintage toys.',
        '345-678-9012'),
       (14, 'Hannah', 'twitter:Hannah', 1, '200 Oak Ave, Village', 'Specializes in rare comic books.',
        '456-789-0123'),
       (15, 'David', 'instagram:David', 2, '300 Pine Rd, Suburb', 'Collector of vintage watches.',
        '567-890-1234'),
       (16, 'Emma', 'twitter:Emma', 2, '400 Cedar Ln, County', 'Expert in antique pottery.', '678-901-2345'),
       (17, 'Felix', 'instagram:Felix', 3, '500 Birch Blvd, Rural', 'Specializes in vintage clothing.',
        '789-012-3456'),
       (18, 'Grace', 'twitter:Grace', 1, '600 Maple Dr, Forest', 'Passionate about rare musical instruments.',
        '890-123-4567'),
       (19, 'Ian', 'instagram:Ian', 2, '700 Oakwood Ave, Mountain', 'Collector of antique cameras.',
        '901-234-5678'),
       (20, 'Julia', 'twitter:Julia', 3, '800 Spruce Ct, Valley', 'Avid seller of rare stamps.',
        '012-345-6789'),
       (21, 'Kevin', 'instagram:Kevin', 3, '900 Pinecrest Rd, Canyon',
        'Specializes in vintage sports memorabilia.', '123-456-7890'),
       (22, 'Luna', 'twitter:Luna', 1, '1000 Elm St, Town', 'Collector of classic vinyl records.',
        '234-567-8901'),
       (23, 'Nina', 'instagram:Nina', 2, '1100 Oak Ave, Village', 'Specializes in antique books.',
        '345-678-9012'),
       (24, 'Oscar', 'twitter:Oscar', 3, '1200 Pine Rd, Suburb', 'Passionate about vintage jewelry.',
        '456-789-0123'),
       (25, 'Pablo', 'instagram:Pablo', 1, '1300 Cedar Ln, County', 'Expert in rare collectibles.',
        '567-890-1234');
-- END DATA

create table if not exists auction_status
(
    id   SERIAL PRIMARY KEY,
    name varchar(50) not null unique
);

INSERT INTO auction_status (id, name)
VALUES (1, 'open'),
       (2, 'only by url'),
       (3, 'closed'),
       (4, 'finished');

CREATE TABLE IF NOT EXISTS auctions
(
    id           SERIAL PRIMARY KEY,
    name         varchar(255)                        NOT NULL,
    description  varchar(255)                        NOT NULL,
    seller_id    integer                             NOT NULL REFERENCES sellers (id) ON DELETE CASCADE,
    status_id    integer   DEFAULT (1)               NOT NULL REFERENCES auction_status (id) ON DELETE CASCADE,
    img_id       integer REFERENCES images (id),
    date_created timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS lots
(
    id               SERIAL PRIMARY KEY,
    name             varchar(255)                        NOT NULL,
    description      varchar(255)                        NOT NULL,
    seller_id        integer                             NOT NULL REFERENCES sellers (id) ON DELETE CASCADE,
    auction_id       integer                             NOT NULL REFERENCES auctions (id) ON DELETE CASCADE,
    status_id        integer   DEFAULT (1)               NOT NULL REFERENCES auction_status (id) ON DELETE CASCADE,
    amount           integer                             NOT NULL DEFAULT 0,
    bank_card_number varchar(19),
    monobank_link    varchar(255),
    date_created     timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lot_bet
(
    id           SERIAL PRIMARY KEY,
    lot_id       integer   NOT NULL REFERENCES lots (id) ON DELETE CASCADE,
    user_id      integer REFERENCES users (id) ON DELETE CASCADE,
    amount       integer   NOT NULL DEFAULT 0,
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp
);

CREATE TABLE IF NOT EXISTS lot_winner
(
    id           SERIAL PRIMARY KEY,
    lot_id       integer                             NOT NULL REFERENCES lots (id) ON DELETE CASCADE,
    lot_bet_id   integer                             NOT NULL REFERENCES lot_bet (id) ON DELETE CASCADE,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lot_images
(
    id     SERIAL PRIMARY KEY,
    lot_id integer NOT NULL REFERENCES lots (id) ON DELETE CASCADE,
    img_id integer NOT NULL REFERENCES images (id) ON DELETE CASCADE
);