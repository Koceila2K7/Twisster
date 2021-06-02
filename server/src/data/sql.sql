CREATE TABLE IF NOT EXISTS user (
    userName VARCHAR(20) PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(20),
    bio VARCHAR(100)
)



CREATE TABLE IF NOT EXISTS friend (
    userFrom VARCHAR(20) NOT NULL,
    userTo VARCHAR(20) NOT NULL,
    PRIMARY KEY (userFrom, userTo)
)



CREATE TABLE IF NOT EXISTS googleauthentification (
    googleId VARCHAR(100) PRIMARY KEY,
    email VARCHAR(50),
    family_name VARCHAR(20),
    given_name VARCHAR(20)
)
DELETE FROM friend WHERE userFrom = ? AND userTo

INSERT INTO googleauthentification (googleId, email, family_name, give_name) VALUES (?, ?, ?, ?, ?)

DROP TABLE USER;


 SELECT userName, firstName, lastName, email, bio FROM USER WHERE userName LIKE %?% OR firstName LIKE %?% OR lastName LIKE %?%