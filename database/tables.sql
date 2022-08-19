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
	product_key INT PRIMARY KEY AUTO_INCREMENT,
	product_code VARCHAR(10) NOT NULL,
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

CREATE INDEX idx_product_code ON product(product_code);

CREATE TABLE IF NOT EXISTS payment_form(
	payment_key INT PRIMARY KEY AUTO_INCREMENT,
    payment_description VARCHAR(100) NOT NULL,
    payment_discount_percent DECIMAL(10, 2) DEFAULT 0,
    payment_type VARCHAR(1)
);

CREATE TABLE IF NOT EXISTS colors (
	color_key INT PRIMARY KEY AUTO_INCREMENT,
    color_description VARCHAR(80) NOT NULL
)

CREATE TABLE IF NOT EXISTS product_sizes (
	size_key INT PRIMARY KEY AUTO_INCREMENT,
    size_description VARCHAR(80) NOT NULL,
    category_key INT NOT NULL,
    size_status VARCHAR(1) DEFAULT 'A',
    FOREIGN KEY(category_key) REFERENCES product_category(category_key)
)

CREATE TABLE IF NOT EXISTS client(
	client_key INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(100) NOT NULL,
    client_telephone VARCHAR(20),
    client_inc_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    client_update_date DATETIME
)

CREATE INDEX idx_client_name ON client(client_name);

CREATE INDEX idx_client_telephone ON client(client_telephone);

CREATE TABLE IF NOT EXISTS sale (
	sale_key BIGINT PRIMARY KEY AUTO_INCREMENT,
    client_key INT NOT NULL,
    payment_key INT NOT NULL,
    sale_net_amount DECIMAL(15, 2) NOT NULL,
    sale_gross_amount DECIMAL(15, 2) NOT NULL,
    sale_cost DECIMAL(15, 2) NOT NULL,
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_key) REFERENCES client(client_key),
    FOREIGN KEY (payment_key) REFERENCES payment_form(payment_key)
)

CREATE TABLE IF NOT EXISTS sale_item (
	sale_key BIGINT AUTO_INCREMENT,
	product_code VARCHAR(10) NOT NULL,
    product_description VARCHAR(100) NOT NULL,
    category_key INT NOT NULL,
    subcategory_key INT NOT NULL,
    color_key INT NOT NULL,
    size_key INT NOT NULL,
    product_unit_cost DECIMAL(15,2) NOT NULL,
    product_quantity INT NOT NULL,
    product_unit_amount DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (sale_key) REFERENCES sale(sale_key),
    FOREIGN KEY (color_key) REFERENCES colors(color_key),
    FOREIGN KEY (size_key) REFERENCES product_sizes(size_key)
)