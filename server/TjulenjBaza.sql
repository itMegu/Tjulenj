-- to je use kreirano v strezniku, to tukaj je samo koda in proces 
CREATE DATABASE Tjulenjbaza;

CREATE TABLE usluzbenci(
    id SERIAL PRIMARY KEY,
    ime VARCHAR(40),
    priimek VARCHAR(40), 
    funkcija VARCHAR(40)
);