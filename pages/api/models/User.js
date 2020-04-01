module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: Sequelize.STRING,
            unique: true
        },
        lastname: {
            type: Sequelize.STRING,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        city: {
            type: Sequelize.STRING,
            unique: true
        },
        state: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: false
    })

    return User
}