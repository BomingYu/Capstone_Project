"use strict"

const User = require('./user')
const Product = require("./product")
const Rate = require("./rate")
const Comment = require("./cooment")
const Cart = require("./cart")

async function init() {
    await User.sync()
    await Product.sync()
    await Rate.sync()
    await Comment.sync()
    await Cart.sync()
}

init();

module.exports = {User , Product , Rate , Comment , Cart}