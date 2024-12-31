const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const path = require('path');
const booksRoutes = require('./routes/books');
const loansRoutes = require('./routes/loans');
const reservationsRoutes = require('./routes/reservations');
const swaggerDocument = require('./swagger.json'); // Swagger JSON file

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Routes API
app.use('/api/books', booksRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/reservations', reservationsRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
