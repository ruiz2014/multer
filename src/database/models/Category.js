module.exports = (sequelize, DataTypes) => {
    let alias = "Category";
    let cols  = {
        id: {type:DataTypes.BIGINT(10).UNSIGNED, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement:true
            },

        name: { type: DataTypes.STRING(50),
                allowNull: false
            },

    }
    let config = {
        timestamps: true,
        createdAt:  'created_at',
        updatedAt: 'updated_at',
        deletesAt: false
    }

    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as: "products",
            foreignKey:'category_id'
        });
    }
    return Category;
}