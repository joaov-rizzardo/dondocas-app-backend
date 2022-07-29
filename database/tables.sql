CREATE TABLE IF NOT EXISTS product_category(
	category_key INT NOT NULL PRIMARY KEY,
    category_description VARCHAR(100) NOT NULL,
    category_status VARCHAR(1) NOT NULL DEFAULT 'A',
    category_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_subcategory(
	subcategory_key INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_key INT NOT NULL,
    subcategory_description VARCHAR(100) NOT NULL,
    subcategory_status VARCHAR(1) DEFAULT 'A',
    subcategory_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_key) REFERENCES product_category(category_key)
);

CREATE TABLE IF NOT EXISTS product(
	product_code VARCHAR(10) NOT NULL PRIMARY KEY,
    product_description VARCHAR(100) NOT NULL,
    category_key INT NOT NULL,
    subcategory_key INT NOT NULL,
    product_cash_payment_value DECIMAL(15,2) NOT NULL,
    product_deferred_payment_value DECIMAL(15,2) NOT NULL,
    product_purchase_value DECIMAL(15,2) NOT NULL,
    product_status VARCHAR(1) DEFAULT 'A',
	product_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    product_update_date DATETIME,
    FOREIGN KEY(category_key) REFERENCES product_category(category_key),
    FOREIGN KEY(subcategory_key) REFERENCES product_subcategory(subcategory_key)
);