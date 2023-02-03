const express = require("express");

const cors = require("cors");

const app = express();

require('dotenv').config()

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

require("./app/routes/category.routes.js")(app)
require("./app/routes/subcategory.routes.js")(app)
require("./app/routes/product.routes.js")(app)
require("./app/routes/payment.routes.js")(app)
require("./app/routes/colors.routes.js")(app)
require("./app/routes/sizes.routes.js")(app)
require("./app/routes/sale.routes.js")(app)
require("./app/routes/client.routes.js")(app)
require("./app/routes/expense.routes.js")(app)
require("./app/routes/provider.routes.js")(app)
require("./app/routes/user.routes.js")(app)
require("./app/routes/movement.routes.js")(app)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
