#!/usr/bin/env bash
set -euo pipefail

# Git Bash path to your API project.
cd /c/devl/git/homeops/apps/api

# Remove the password from this script's environment on exit.
trap 'unset FLYWAY_PASSWORD' EXIT

# Prompt without displaying or recording the password.
read -r -s -p "Migrator password: " FLYWAY_PASSWORD
printf '\n'
export FLYWAY_PASSWORD

# Show the migration history before changing it.
flyway -configFiles=flyway.conf info

read -r -p "If there are no unexpected missing/failed migrations, type repair: " answer
if [[ "$answer" != "repair" ]]; then
    printf 'Stopped without repairing.\n'
    exit 0
fi

# Align Flyway's recorded checksums with the migration files.
flyway -configFiles=flyway.conf repair