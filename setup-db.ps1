# =============================================================
#  Velvet Vogue — PostgreSQL Setup (Windows PowerShell)
#  Run from the project root: .\setup-db.ps1
# =============================================================

$PG_USER = if ($env:PGUSER) { $env:PGUSER } else { "postgres" }
$PG_HOST = if ($env:PGHOST) { $env:PGHOST } else { "localhost" }
$PG_PORT = if ($env:PGPORT) { $env:PGPORT } else { "5432" }
$DB_NAME = "velvet_vogue"

Write-Host ""
Write-Host "┌─────────────────────────────────────────┐"
Write-Host "│   Velvet Vogue — Database Setup          │"
Write-Host "└─────────────────────────────────────────┘"
Write-Host ""
Write-Host "Connecting as: $PG_USER @ $PG_HOST`:$PG_PORT"
Write-Host ""

# 1. Create database
Write-Host "▸ Creating database '$DB_NAME'..."
$exists = & psql -U $PG_USER -h $PG_HOST -p $PG_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'"
if ($exists -eq "1") {
    Write-Host "  ✓ Database already exists, skipping."
} else {
    & psql -U $PG_USER -h $PG_HOST -p $PG_PORT -c "CREATE DATABASE $DB_NAME;"
    Write-Host "  ✓ Database created."
}

# 2. Run schema + seed
Write-Host ""
Write-Host "▸ Applying schema and seed data..."
& psql -U $PG_USER -h $PG_HOST -p $PG_PORT -d $DB_NAME -f "$PSScriptRoot\backend\db\schema.sql"
Write-Host "  ✓ Done."

# 3. Verify
Write-Host ""
Write-Host "▸ Seeded products:"
& psql -U $PG_USER -h $PG_HOST -p $PG_PORT -d $DB_NAME -c "SELECT name, category, price FROM products ORDER BY category, name;"

Write-Host ""
Write-Host "✓ Setup complete!"
Write-Host "  Add this to backend\.env:"
Write-Host "  DATABASE_URL=postgresql://${PG_USER}@${PG_HOST}:${PG_PORT}/${DB_NAME}"
Write-Host ""
