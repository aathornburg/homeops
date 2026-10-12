DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_roles WHERE rolname = 'homeops_migrator'
    ) THEN
        CREATE ROLE homeops_migrator LOGIN;
    END IF;

    IF NOT EXISTS (
        SELECT FROM pg_roles WHERE rolname = 'homeops_app'
    ) THEN
        CREATE ROLE homeops_app LOGIN;
    END IF;
END
$$;

CREATE SCHEMA IF NOT EXISTS homeops
    AUTHORIZATION homeops_migrator;

GRANT CONNECT ON DATABASE homeops
    TO homeops_migrator, homeops_app;

GRANT USAGE ON SCHEMA homeops TO homeops_app;