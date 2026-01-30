# Database Setup Instructions

## PostgreSQL Installation (x64 Linux)

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### CentOS/RHEL
```bash
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Database Creation

### Method 1: Using the SQL Script
```bash
# Switch to postgres user
sudo -u postgres psql

# Run the setup script
\i /path/to/setup_db.sql

# Or directly from command line
sudo -u postgres psql -f setup_db.sql
```

### Method 2: Manual Setup
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE blogdb;

# Create user (replace 'yourpassword' with a secure password)
CREATE USER bloguser WITH PASSWORD 'yourpassword';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE blogdb TO bloguser;

# Exit
\q
```

## Environment Configuration

Update your `.env` file in the server directory:

```env
POSTGRES_HOST=localhost
POSTGRES_NAME=blogdb
POSTGRES_USER=bloguser
POSTGRES_PASSWORD=yourpassword
POSTGRES_PORT=5432
```

## Run Migrations

```bash
cd server
source .venv/bin/activate
python manage.py migrate
python manage.py createsuperuser
```

## Verify Connection

```bash
python manage.py dbshell
```

This should connect you to the PostgreSQL database.
