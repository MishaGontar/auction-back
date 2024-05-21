export const SELECT_USER_BY_USERNAME_OR_EMAIL = `
    SELECT u.id AS user_id,
           u.username,
           u.email,
           u.password,
           u.is_activated,
           i.image_url
    FROM users u
             JOIN images i ON u.image_id = i.id
    WHERE u.username = $1
       OR u.email = $1
`;

export const SELECT_USER_BY_USERNAME_OR_EMAIL_WITH_EMAIL = `
    SELECT u.id AS user_id,
           u.username,
           u.email,
           u.password,
           u.is_activated,
           i.image_url
    FROM users u
             JOIN images i ON u.image_id = i.id
    WHERE u.username = $1
       OR u.email = $2
`;

export const INSERT_NEW_USER = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id as user_id, username, email
`;


export const UPDATE_USER_ACTIVATION_STATUS = `
    UPDATE users AS u
    SET is_activated = $1
    FROM images AS i
    WHERE u.id = $2
      AND u.image_id = i.id
    RETURNING u.id as user_id, u.username, u.email, u.is_activated, i.image_url
`;

export const DELETE_USER_BY_ID = `
    DELETE
    from users
    where id = $1
    returning *
`