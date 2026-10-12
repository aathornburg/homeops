CREATE TABLE homeops.project (
    project_id UUID PRIMARY KEY,
    household_id UUID NOT NULL,
    title TEXT NOT NULL,

    CONSTRAINT fk_project_household
        FOREIGN KEY (household_id)
            REFERENCES homeops.household (household_id)
);