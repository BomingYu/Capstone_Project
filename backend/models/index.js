"use strict"

const User = require('./user')
const Product = require("./product")
const Rate = require("./rate")
const Comment = require("./cooment")

async function init() {
    await User.sync()
    await Product.sync()
    await Rate.sync()
    await Comment.sync()
}

init();

module.exports = {User , Product , Rate , Comment}