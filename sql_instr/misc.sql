/* Delete all tables and seqs */
DO $$
DECLARE
    -- Declare variable for dynamic SQL
    sql_command TEXT := '';
BEGIN
    -- Construct DROP TABLE commands for all tables in the public schema
    SELECT INTO sql_command
    string_agg('DROP TABLE IF EXISTS ' || quote_ident(table_schema) || '.' || quote_ident(table_name) || ' CASCADE;', ' ')
    FROM information_schema.tables
    WHERE table_schema = 'public';

    -- Check if sql_command is not NULL, then execute the DROP TABLE commands
    IF sql_command IS NOT NULL THEN
        EXECUTE sql_command;
    END IF;

    -- Reset the sql_command variable to construct DROP SEQUENCE commands
    sql_command := '';

    -- Construct DROP SEQUENCE commands for all sequences in the public schema
    SELECT INTO sql_command
    string_agg('DROP SEQUENCE IF EXISTS ' || quote_ident(sequence_schema) || '.' || quote_ident(sequence_name) || ' CASCADE;', ' ')
    FROM information_schema.sequences
    WHERE sequence_schema = 'public';

    -- Check if sql_command is not NULL, then execute the DROP SEQUENCE commands
    IF sql_command IS NOT NULL THEN
        EXECUTE sql_command;
    END IF;
END $$;