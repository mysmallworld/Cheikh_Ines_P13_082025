CREATE DATABASE IF NOT EXISTS your_car_your_way;
    USE your_car_your_way;

CREATE TABLE your_car_your_way.Address (
    id CHAR(36) PRIMARY KEY,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE TABLE your_car_your_way.Agency (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address_id CHAR(36) NOT NULL,
    FOREIGN KEY (address_id) REFERENCES your_car_your_way.Address(id) ON DELETE CASCADE
);

CREATE TABLE your_car_your_way.User (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    driving_license VARCHAR(100),
    role ENUM('CLIENT', 'ADMIN', 'AGENT') NOT NULL,
    address_id CHAR(36),
    FOREIGN KEY (address_id) REFERENCES your_car_your_way.Address(id) ON DELETE SET NULL
);

CREATE TABLE your_car_your_way.Car (
    id CHAR(36) PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    license_plate VARCHAR(50) NOT NULL UNIQUE,
    category ENUM('ECONOMY', 'COMPACT', 'INTERMEDIATE', 'STANDARD', 'FULLSIZE', 'PREMIUM', 'LUXURY', 'SUV', 'VAN', 'OTHER') NOT NULL,
    seats_number INT NOT NULL,
    fuel_type ENUM('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID') NOT NULL,
    transmission ENUM('MANUAL', 'AUTOMATIC') NOT NULL,
    acriss CHAR(4) NOT NULL,
    agency_id CHAR(36) NOT NULL,
    FOREIGN KEY (agency_id) REFERENCES your_car_your_way.Agency(id) ON DELETE CASCADE
);


CREATE TABLE your_car_your_way.Payment (
    id CHAR(36) PRIMARY KEY,
    type ENUM('CARD', 'CASH', 'ONLINE') NOT NULL,
    date DATE NOT NULL,
    reservation_id CHAR(36) UNIQUE
);

CREATE TABLE your_car_your_way.Reservation (
    id CHAR(36) PRIMARY KEY,
    departure_city VARCHAR(100) NOT NULL,
    return_city VARCHAR(100) NOT NULL,
    departure_datetime DATETIME NOT NULL,
    return_datetime DATETIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL,
    user_id CHAR(36) NOT NULL,
    car_id CHAR(36) NOT NULL,
    payment_id CHAR(36) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES your_car_your_way.User(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES your_car_your_way.Car(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES your_car_your_way.Payment(id) ON DELETE SET NULL
);

ALTER TABLE your_car_your_way.Payment
    ADD FOREIGN KEY (reservation_id) REFERENCES your_car_your_way.Reservation(id) ON DELETE CASCADE;

CREATE TABLE your_car_your_way.Assistance (
    id CHAR(36) PRIMARY KEY,
    status ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL,
    createdAt DATETIME NOT NULL,
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES your_car_your_way.User(id) ON DELETE CASCADE
);

CREATE TABLE your_car_your_way.Message (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('SENT', 'READ', 'ARCHIVED') NOT NULL,
    createdAt DATETIME NOT NULL,
    user_id CHAR(36) NOT NULL,
    assistance_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES your_car_your_way.User(id) ON DELETE CASCADE,
    FOREIGN KEY (assistance_id) REFERENCES your_car_your_way.Assistance(id) ON DELETE CASCADE
);
