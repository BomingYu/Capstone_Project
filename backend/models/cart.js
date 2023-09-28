const { DataTypes , Model} = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user")
const Product = require("./product")

class Cart extends Model {}

Cart.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"id"
        }
    },
    productid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"products",
            key:"id"
        }
    },
    quantity:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:1
    }
},{
    modelName:"carts",
    freezeTableName:true,
    timestamps:true,
    sequelize:sequelizeInstance
})

Cart.belongsTo(User , {foreignKey : "userid"})
Cart.belongsTo(Product , {foreignKey : "productid"})

module.exports = Cart;