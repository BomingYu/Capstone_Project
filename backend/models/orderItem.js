const {DataTypes , Model} = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const Product = require("./product")

class OrderItem extends Model {}

OrderItem.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        orderid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"orders",
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
            allowNull:false
        },
        price:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        subtotal:{
            type:DataTypes.DECIMAL,
            allowNull:false
        }
    },{
        sequelize:sequelizeInstance,
        modelName:"orderItems",
        timestamps:true,
        freezeTableName:true
    }
)

OrderItem.belongsTo(Product , {foreignKey:"productid"})

module.exports=OrderItem;