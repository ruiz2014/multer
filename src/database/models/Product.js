module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    let cols  = {
        id: {type:DataTypes.BIGINT(11).UNSIGNED, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement:true
            },

        name: { type: DataTypes.STRING(100),
                allowNull: false
            },
        img: { type:DataTypes.TEXT('tiny')},    
           
        price:{type: DataTypes.DECIMAL(5,2).UNSIGNED,
            allowNull: false
        },

        stock: {type:DataTypes.BIGINT(11).UNSIGNED, 
            allowNull: false
        },
        category_id: {type: DataTypes.BIGINT(10)}

    }
    let config = {
        timestamps: true,
        createdAt:  'created_at',
        updatedAt: 'updated_at',
        deletesAt: false
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.Category,{
            as: "category",
            foreignKey:'category_id'
        });
    }
    
    return Product;
}