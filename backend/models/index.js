"use strict"

const User = require('./user')
const Product = require("./product")

async function init() {
    await User.sync()
    await Product.sync()
}

init();

module.exports = {User , Product}