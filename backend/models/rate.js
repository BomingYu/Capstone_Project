const {DataTypes , Model} = require("sequelize")
const dbConnect = require("../dbConnect");
const User = require("./user")
const Product = require("./product")
const sequelizeInstance = dbConnect.Sequelize;

class Rate extends Model {}
Rate.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    userid : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references:{
            model:"users",
            key : "id"
        }
    },
    productid:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references:{
            model:"products",
            key:"id"
        }
    },
    rate : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize : sequelizeInstance,
    modelName:"rates",
    freezeTableName:true,
    timestamps:true
})

// Rate.belongsTo(User , {foreignKey : "userid"})
// Rate.belongsTo(Product , {foreignKey : "productid"})

module.exports = Rate;