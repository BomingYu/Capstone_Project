const { DataTypes , Model } = require("sequelize");
const connectdb = require("../dbConnect");
const { dataTool } = require("echarts");
const sequelizeInstance = connectdb.Sequelize;

class Product extends Model {}

Product.init({
    id:{
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name:{
        type:DataTypes.STRING,
        allowNull : false,
        require : true
    },
    barcode:{
        type : DataTypes.STRING,
        allowNull : true
    },
    category:{
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    },
    price:{
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        required : true,
        validate : {isDecimal : true}
    },
    unit:{
        type : DataTypes.STRING,
        allowNull : true,
        required : true
    },
    stock:{
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        defaultValue : 0
    },
    description:{
        type : DataTypes.TEXT,
        allowNull : true
    },
    picFile : {
        type : DataTypes.STRING
    },
    available : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : true
    }
},{
    sequelize : sequelizeInstance,
    timestamps : true,
    freezeTableName : true,
    modelName : "products"
})

module.exports = Product;