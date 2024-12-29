const { sequelize } = require('./db');
const { Sequelize } = require('sequelize');

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Role = require('./roles')(sequelize, Sequelize);
db.Link = require('./links')(sequelize, Sequelize);
db.Statistics = require('./statistics')(sequelize, Sequelize);

db.User.belongsTo(db.Role, {
    foreignKey: 'role_id',
    as: 'role'
});

db.Role.hasMany(db.User, {
    foreignKey: 'role_id', 
    as: 'users'
});


// Relationships between models Links Many to 1 Users
db.Link.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Relationships between models Users 1 to Many Users
db.User.hasMany(db.Link, {
    foreignKey: 'user_id', 
    as: 'links'
});


// Relationships between models Statistics Many to 1 Links
db.Statistics.belongsTo(db.Link, {
    foreignKey: 'link_id',
    as: 'link'
});

// Relationships between models Links 1 to Many Statistics
db.Link.hasMany(db.Statistics, {
    foreignKey: 'link_id', 
    as: 'statistics'
});





async function syncDatabase() {
    try {
      await db.sequelize.authenticate();
      console.log('Conexión establecida con éxito.');
      await db.sequelize.sync({ alter: true });
      console.log('Tablas sincronizadas.');
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    }
}

async function createRole() {
    try {
      const adminRole = await db.Role.create({
        name: 'Admin',  
      });
      const userRole = await db.Role.create({
        name: 'Usuario',  
      });
      console.log('Nuevo rol creado:', adminRole);
      console.log('Nuevo rol creado:', userRole);
    } catch (error) {
      console.error('Error creando el rol:', error);
    }
}


syncDatabase();

module.exports = db;