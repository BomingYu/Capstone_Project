"use strict"

const User = require('./user')
const Product = require("./product")
const Rate = require("./rate")

async function init() {
    await User.sync()
    await Product.sync()
    await Rate.sync()
}

init();

module.exports = {User , Product , Rate}