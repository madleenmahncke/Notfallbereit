CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM('PATIENT', 'PARAMEDIC', 'ADMIN') NOT NULL,

    paramedic_code VARCHAR(6) NULL,
    must_change_password BOOLEAN DEFAULT FALSE,
    
    session_code VARCHAR(36) NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE emergency_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    patient_id INT NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    
    street_and_number VARCHAR(200) NOT NULL, 
    location VARCHAR(100) NOT NULL,
    
    qr_code_uuid VARCHAR(36) UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
        
	FOREIGN KEY (patient_id)
		REFERENCES users(id)
		ON DELETE CASCADE
);

CREATE TABLE medications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    profile_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(100),
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (profile_id)
        REFERENCES emergency_profiles(id)
        ON DELETE CASCADE
);

ALTER TABLE medications
ADD CONSTRAINT uq_medication
UNIQUE (profile_id, name, dosage);

CREATE TABLE emergency_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,

    profile_id INT NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    phone VARCHAR(30) NOT NULL,
    relationship VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (profile_id)
        REFERENCES emergency_profiles(id)
        ON DELETE CASCADE
);

ALTER TABLE emergency_contacts
ADD CONSTRAINT uq_emergency_contact
UNIQUE (profile_id, first_name, last_name, phone, relationship);

CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,

    profile_id INT NOT NULL,

    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    description VARCHAR(500),

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (profile_id)
        REFERENCES emergency_profiles(id)
        ON DELETE CASCADE
);

CREATE TABLE allergies (
    id INT AUTO_INCREMENT PRIMARY KEY,

    profile_id INT NOT NULL,

    allergen VARCHAR(100) NOT NULL,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (profile_id)
        REFERENCES emergency_profiles(id)
        ON DELETE CASCADE
);

ALTER TABLE allergies
ADD CONSTRAINT uq_allergy
UNIQUE (profile_id, allergen);