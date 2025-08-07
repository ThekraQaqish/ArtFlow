const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const db = require('./db.js');
const port =process.env.PORT || 3000;
require('dotenv').config();

// للإنتاج، قيد المصادر المسموحة:
// app.use(cors({
//   origin: ['http://localhost:3001', 'https://your-frontend-domain.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const routes = require('./routes');
app.use('/api', routes);

const homeRoutes = require('./routes/home');
app.use('/', homeRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
