create TABLE USER (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(30) NOT NULL,
  UNIQUE(email)
)