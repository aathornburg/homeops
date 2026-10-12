CREATE TABLE homeops.household_member (
    household_member_id UUID PRIMARY KEY,
    household_id UUID NOT NULL,
    display_name TEXT NOT NULL,

    CONSTRAINT fk_household_member_household
        FOREIGN KEY (household_id)
            REFERENCES homeops.household (household_id)
);