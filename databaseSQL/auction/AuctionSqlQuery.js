export const INSERT_AUCTION = `
    INSERT INTO auctions (name, description, seller_id, status_id, img_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
`

export const SELECT_ALL_AUCTION_STATUS = `
    SELECT *
    from auction_status
`

export const SELECT_AUCTION_BY_SELLER_ID = `
    SELECT a.id          AS auction_id,
           a.name        AS auction_name,
           a.description AS auction_description,
           a.date_created,
           rs.name       AS auction_status,
           rs.id         AS auction_status_id,
           i.image_url   AS auction_img_path,
           a.seller_id   AS seller_id,
           s.full_name   AS seller_name
    FROM auctions a
             JOIN
         auction_status rs ON a.status_id = rs.id
             LEFT JOIN
         images i ON a.img_id = i.id
             JOIN
         sellers s ON a.seller_id = s.id
    WHERE a.seller_id = $1;
`

export const SELECT_AUCTION_BY_ID = `
    SELECT r.id          AS auction_id,
           r.name        AS auction_name,
           r.description AS auction_description,
           rs.name       AS auction_status,
           rs.id         AS auction_status_id,
           i.image_url   AS auction_img_path,
           r.seller_id   AS seller_id,
           s.full_name   AS seller_name
    FROM auctions r
             JOIN
         auction_status rs ON r.status_id = rs.id
             LEFT JOIN
         images i ON r.img_id = i.id
             JOIN
         sellers s ON r.seller_id = s.id
    WHERE r.id = $1;
`
export const SELECT_ALL_AUCTION = `
    SELECT r.id          AS auction_id,
           r.name        AS auction_name,
           r.description AS auction_description,
           rs.name       AS auction_status,
           rs.id         AS auction_status_id,
           i.image_url   AS auction_img_path,
           r.seller_id   AS seller_id,
           s.full_name   AS seller_name
    FROM auctions r
             JOIN
         auction_status rs ON r.status_id = rs.id
             LEFT JOIN
         images i ON r.img_id = i.id
             JOIN
         sellers s ON r.seller_id = s.id;
`
export const UPDATE_AUCTION_BY_ID = `
    UPDATE auctions
    SET name        = $1,
        description = $2,
        status_id   = $3,
        img_id      = $4
    WHERE id = $5
    returning *
`
export const UPDATE_AUCTION_BY_ID_WITHOUT_IMG = `
    UPDATE auctions
    SET name        = $1,
        description = $2,
        status_id   = $3
    WHERE id = $4
    returning *
`
export const DELETE_AUCTION_BY_ID = `
    DELETE
    FROM auctions
    where id = $1
    returning *
`
export const SELECT_ONLY_AUCTION_CREATE_STATUS = `
    SELECT *
    from auction_status
    WHERE name != 'finished'
`