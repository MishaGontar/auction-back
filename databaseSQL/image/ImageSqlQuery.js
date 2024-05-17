export const INSERT_IMAGE = `
    INSERT INTO images (name, image_url)
    VALUES ($1, $2)
    returning *
`

export const DELETE_IMAGE_BY_ID = `
    DELETE
    FROM images
    WHERE id = $1
    RETURNING *
`;

export const DELETE_IMAGE_BY_URL = `
    DELETE
    FROM images
    WHERE image_url = $1
    RETURNING *
`;