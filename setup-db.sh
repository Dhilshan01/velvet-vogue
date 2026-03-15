#!/usr/bin/env bash
# =============================================================
#  Velvet Vogue — PostgreSQL Setup Script
#  Run from the project root: bash setup-db.sh
# =============================================================

set -e

# ── Config (edit these if your Postgres user/password differs) ──
PG_USER="${PGUSER:-postgres}"
PG_HOST="${PGHOST:-localhost}"
PG_PORT="${PGPORT:-5432}"
DB_NAME="velvet_vogue"

echo ""
echo "┌─────────────────────────────────────────┐"
echo "│   Velvet Vogue — Database Setup          │"
echo "└─────────────────────────────────────────┘"
echo ""
echo "Connecting as user: $PG_USER on $PG_HOST:$PG_PORT"
echo ""

# 1. Create the database (ignore error if it already exists)
echo "▸ Creating database '$DB_NAME'..."
psql -U "$PG_USER" -h "$PG_HOST" -p "$PG_PORT" -c \
  "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 \
  && echo "  ✓ Database already exists, skipping." \
  || psql -U "$PG_USER" -h "$PG_HOST" -p "$PG_PORT" -c "CREATE DATABASE $DB_NAME;" \
  && echo "  ✓ Database created."

# 2. Run schema + seed
echo ""
echo "▸ Running schema and seed data..."
psql -U "$PG_USER" -h "$PG_HOST" -p "$PG_PORT" -d "$DB_NAME" \
  -f "$(dirname "$0")/backend/db/schema.sql"
echo "  ✓ Schema and seed applied."

# 3. Verify tables
echo ""
echo "▸ Verifying tables..."
psql -U "$PG_USER" -h "$PG_HOST" -p "$PG_PORT" -d "$DB_NAME" -c \
  "\dt"

# 4. Count seeded products
echo ""
echo "▸ Seeded products:"
psql -U "$PG_USER" -h "$PG_HOST" -p "$PG_PORT" -d "$DB_NAME" -c \
  "SELECT name, category, price FROM products ORDER BY category, name;"

echo ""
echo "┌─────────────────────────────────────────┐"
echo "│   ✓ Database setup complete!             │"
echo "│                                          │"
echo "│   Next step: configure backend/.env      │"
echo "│   DATABASE_URL=postgresql://$PG_USER@$PG_HOST:$PG_PORT/$DB_NAME │"
echo "└─────────────────────────────────────────┘"
echo ""
