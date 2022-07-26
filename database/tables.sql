CREATE TABLE IF NOT EXISTS product_category(
	category_key INT NOT NULL PRIMARY KEY,
    category_description VARCHAR(100) NOT NULL,
    category_status VARCHAR(1) NOT NULL DEFAULT 'A',
    category_date DATETIME DEFAULT CURRENT_TIMESTAMP
)