-- Insert Admin User
-- Username: turjo
-- Password: turjo0424
-- This password hash is generated using bcrypt with 10 salt rounds

INSERT INTO users (name, email, password, phone, role, status) 
VALUES (
  'Turjo Admin',
  'turjo@stellarmart.com',
  '$2a$10$rVnKHQx8KQ3XQVZ5KxYEOe3P5O9KxYEOe3P5O9KxYEOe3P5O9KxYEO', -- This is a placeholder, update with real hash
  '+8801234567890',
  'admin',
  'active'
)
ON DUPLICATE KEY UPDATE role = 'admin', status = 'active';

-- For MySQL, use this to update if user exists
UPDATE users SET role = 'admin', status = 'active' WHERE email = 'turjo@stellarmart.com';
