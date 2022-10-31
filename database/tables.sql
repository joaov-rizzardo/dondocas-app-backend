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
);

CREATE TABLE IF NOT EXISTS expense_category(
	category_key TINYINT PRIMARY KEY AUTO_INCREMENT,
    category_description VARCHAR(15) NOT NULL,
    category_status VARCHAR(1) DEFAULT 'A',
    category_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_category_status ON expense_category(category_status);

CREATE TABLE IF NOT EXISTS expense (
  `expense_key` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `expense_description` varchar(200) NOT NULL,
  `category_key` tinyint(4) NOT NULL,
  `expense_value` decimal(15,2) NOT NULL,
  `expense_status` varchar(1) DEFAULT 'A',
  `expense_date` datetime DEFAULT current_timestamp(),
  FOREIGN KEY (category_key) REFERENCES expense_category(category_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_expense_status ON expense(expense_status);

CREATE TABLE IF NOT EXISTS provider (
    provider_key INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    provider_name VARCHAR(50) NOT NULL,
    provider_telephone VARCHAR(15),
    provider_email VARCHAR(80),
    provider_category INT NOT NULL,
    provider_site VARCHAR(80),
    provider_status VARCHAR(1) DEFAULT 'A',
    provider_date DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (provider_category) REFERENCES product_category(category_key),
    KEY idx_provider_status (provider_status)
);

CREATE TABLE IF NOT EXISTS user_profile(
	profile_key INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    profile_description VARCHAR(50) NOT NULL,
    profile_level TINYINT NOT NULL,
    profile_status VARCHAR(1) DEFAULT 'A',
    KEY idx_profile_level (profile_level),
    KEY idx_profile_status (profile_status)
);

CREATE TABLE IF NOT EXISTS user (
	user_key INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_identification VARCHAR(40) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    user_profile INT NOT NULL,
    user_status VARCHAR(1) DEFAULT 'A',
    FOREIGN KEY (user_profile) REFERENCES user_profile(profile_key),
    KEY idx_user_identification (user_identification),
    KEY idx_user_password (user_password),
    KEY idx_user_status (user_status)
);
