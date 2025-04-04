/*
  # Initial Schema Setup

  1. New Tables
    - donations
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - amount (numeric)
      - pan (text)
      - created_at (timestamp)
      - status (text)

    - events
      - id (uuid, primary key)
      - title (text)
      - date (date)
      - time (text)
      - location (text)
      - image (text)
      - description (text)
      - created_at (timestamp)

    - gallery
      - id (uuid, primary key)
      - url (text)
      - caption (text)
      - created_at (timestamp)

    - volunteers
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - interest (text)
      - message (text)
      - created_at (timestamp)

    - testimonials
      - id (uuid, primary key)
      - name (text)
      - role (text)
      - image (text)
      - quote (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  amount numeric NOT NULL,
  pan text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'donations' 
    AND policyname = 'Allow authenticated users to view their own donations'
  ) THEN
    ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow authenticated users to view their own donations"
      ON donations
      FOR SELECT
      TO authenticated
      USING (auth.uid()::text = email);
  END IF;
END $$;

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'events' 
    AND policyname = 'Allow public read access to events'
  ) THEN
    ALTER TABLE events ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow public read access to events"
      ON events
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text NOT NULL,
  created_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gallery' 
    AND policyname = 'Allow public read access to gallery'
  ) THEN
    ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow public read access to gallery"
      ON gallery
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  interest text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'volunteers' 
    AND policyname = 'Allow authenticated users to view their own volunteer applications'
  ) THEN
    ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow authenticated users to view their own volunteer applications"
      ON volunteers
      FOR SELECT
      TO authenticated
      USING (auth.uid()::text = email);
  END IF;
END $$;

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  image text NOT NULL,
  quote text NOT NULL,
  created_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Allow public read access to testimonials'
  ) THEN
    ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow public read access to testimonials"
      ON testimonials
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS transaction_id text;