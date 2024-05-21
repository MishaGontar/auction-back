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
    image_id     integer DEFAULT 1 REFERENCES images (id),
    is_activated boolean default false not null
);

-- TEST USER
INSERT INTO users (username, password, email, is_activated)
VALUES ('misha', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'turictscol40@gmail.com', true),
       ('sasha', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'afgfduzbf@yomail.info', true),
       ('mirko', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'knwkmwfqf@emlpro.com', true),
       ('pili', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'fya2k7p6@flymail.tk', true),
       ('aldo', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'ayccneirg@emltmp.com', true),
       ('marta', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'afqfonfodfbvjo@dropmail.me', true),
       ('ciel', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'qkbdktknf@emlhub.com', true),
       ('landon', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'j1jf0j2x@spymail.one', true),
       ('matia', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'j1jf3c7g@spymail.one', true),
       ('alma', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'iebymwfqf@emlpro.com', true),
       ('eliora', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'fpfhktknf@emlhub.com', true),
       ('catrine', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'j1jf745x@spymail.one', true),
       ('brandon', '$2b$10$aNs79TF/NXKjqdma3NMinOW0AmDFmHcSQosn0sQI92sQzq3rf4yaC', 'd0dod1wedak3@10mail.xyz', true);
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
VALUES (1, 'очікування'),
       (2, 'підтверджено'),
       (3, 'відхилено');

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

-- Тестові продавці
INSERT INTO sellers (user_id, full_name, social_media, status_id, address, description, phone_number)
VALUES (3, 'Іван Петренко', 'instagram:IvanPetrenko', 1, 'вул. Головна 123, Місто',
        'Досвідчений продавець, спеціалізується на антикваріаті.',
        '123-456-7890'),
       (4, 'Олена Смирнова', 'twitter:OlenaSmirnova', 3, 'вул. Ялинкова 456, Селище',
        'Пристрасно захоплюється вінтажними колекціями.',
        '234-567-8901'),
       (5, 'Богдан Іванов', 'instagram:BohdanIvanov', 2, 'вул. Дубова 789, Село',
        'Поціновувач мистецтва з акцентом на сучасний живопис.', '345-678-9012'),
       (6, 'Анастасія Браун', 'twitter:AnastasiaBraun', 2, 'вул. Соснова 987, Передмістя',
        'Відданий продавець рідкісних книг та рукописів.', '456-789-0123'),
       (7, 'Давид Вілсон', 'instagram:DavidWilson', 3, 'вул. Кедрова 321, Район',
        'Експерт у вінтажних прикрасах та коштовностях.', '567-890-1234'),
       (8, 'Софія Лі', 'twitter:SophiaLee', 1, 'вул. Березова 654, Село',
        'Спеціалізується на ручних ремеслах та кераміці.', '678-901-2345'),
       (9, 'Максим Тейлор', 'instagram:MaximTaylor', 1, 'вул. Кленова 876, Ліс',
        'Пристрасний поціновувач класичних автомобілів.', '789-012-3456'),
       (10, 'Ольга Білоус', 'twitter:OlgaBilaus', 2, 'вул. Дубова 543, Гори',
        'Збирає та продає вінтажні вінілові платівки.', '890-123-4567'),
       (11, 'Віталій Кларк', 'instagram:VitaliyClark', 3, 'вул. Ялинкова 234, Долина',
        'Пристрасний колекціонер рідкісних монет та валюти.', '901-234-5678'),
       (12, 'Ганна Бейкер', 'twitter:HannaBaker', 3, 'вул. Соснова 789, Каньйон',
        'Спеціалізується на реставрації антикварних меблів.', '012-345-6789'),
       (13, 'Богдан', 'instagram:Bohdan', 1, 'вул. Ялинкова 100, Селище', 'Пристрасний колекціонер вінтажних іграшок.',
        '345-678-9012');
-- END DATA


create table if not exists auction_status
(
    id   SERIAL PRIMARY KEY,
    name varchar(50) not null unique
);

INSERT INTO auction_status (id, name)
VALUES (1, 'відкритий'),
       (2, 'тільки по url'),
       (3, 'закритий'),
       (4, 'завершений');

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
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
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