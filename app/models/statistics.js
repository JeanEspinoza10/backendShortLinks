module.exports = (sequelize, DataTypes) => {
    const Statistics = sequelize.define('Statistics', {
        ip_applicant: {
            type: DataTypes.STRING,
        },
        browser: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'statistics',
    });
    return Statistics;
  };