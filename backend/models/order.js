const {DataTypes , Model} = require("sequelize");
const dbConnect = require("../dbConnect");
const OrderItem = require("./orderItem");
const sequelizeInstance = dbConnect.Sequelize;

class Order extends Model {}

Order.init({
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
    recipient:{
        type:DataTypes.STRING,
        allowNull:false,
        required:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        required:true
    },
    delivery:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING
    },
    total:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    payment:{
        type:DataTypes.STRING,
        allowNull:false
    },
    orderstatus:{
        type:DataTypes.STRING,
        defaultValue:"Pending"
    }
},{
    sequelize:sequelizeInstance,
    modelName:"orders",
    timestamps:true,
    freezeTableName:true
})

Order.hasMany(OrderItem , {foreignKey:"orderid"})

module.exports=Order