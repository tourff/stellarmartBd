require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');

const PORT = process.env.PORT || 10000;

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database (PostgreSQL with Sequelize)
    const { sequelize } = require('./src/models');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync models (use { force: true } to reset tables)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
