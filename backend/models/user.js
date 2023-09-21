const {DataTypes , Model} = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull : false,
        autoIncrement :true,
        primaryKey : true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull : false,
        required :true
    },
    firstName:{
        type : DataTypes.STRING,
        allowNull:false,
        required : true
    },
    password:{
        type : DataTypes.STRING,
        allowNull:false,
        require : true
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        required : true,
        unique : true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: "customer"
    }
},{
    sequelize:sequelizeInstance,
    timestamps:true,
    modelName:"users",
    freezeTableName:true
})

module.exports = User;