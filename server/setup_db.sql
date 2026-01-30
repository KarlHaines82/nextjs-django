-- PostgreSQL Database Setup Script for Blog Application
-- For x64 Linux systems

-- Create database
CREATE DATABASE blogdb;

-- Create user (replace 'yourpassword' with a secure password)
CREATE USER bloguser WITH PASSWORD 'yourpassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE blogdb TO bloguser;

-- Connect to the database
\c blogdb

-- Grant schema privileges (for Django migrations)
GRANT ALL ON SCHEMA public TO bloguser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bloguser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO bloguser;

-- Ensure future tables are also accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO bloguser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO bloguser;

-- Verify the setup
\l
\du
