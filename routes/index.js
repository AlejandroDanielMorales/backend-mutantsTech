const usersRoutes = require("./users.routes")
const productsRoutes = require("./products.routes")
const categoryRoutes = require("./category.routes")
const orderRoutes = require("./order.routes")

module.exports = [
                    productsRoutes,
                    usersRoutes,
                    categoryRoutes,
                    orderRoutes
                ]