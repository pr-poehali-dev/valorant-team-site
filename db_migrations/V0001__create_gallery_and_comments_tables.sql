CREATE TABLE IF NOT EXISTS t_p71722051_valorant_team_site.gallery (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p71722051_valorant_team_site.comments (
    id SERIAL PRIMARY KEY,
    gallery_id INTEGER NOT NULL REFERENCES t_p71722051_valorant_team_site.gallery(id),
    user_name VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    avatar VARCHAR(10) DEFAULT '👤',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_gallery_id ON t_p71722051_valorant_team_site.comments(gallery_id);