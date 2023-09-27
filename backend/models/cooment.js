const {DataTypes , Model} = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Comment extends Model {}

Comment.init({
    id:{
        type : DataTypes.INTEGER,
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
    body:{
        type:DataTypes.TEXT,
        allowNull:false,
        required:true
    },
},{
    sequelize:sequelizeInstance,
    timestamps:true,
    modelName:"comments",
    freezeTableName:true
})

module.exports = Comment;