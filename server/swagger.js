const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ArtFlow API',
      version: '1.0.0',
      description: 'API documentation for ArtFlow artistic social platform',
    },
    servers: [
      { url: 'http://localhost:3000' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['admin', 'artist', 'guest'] },
            pp: { type: 'string', description: 'Profile picture URL' },
            bio: { type: 'string' },
          },
        },
        Artwork: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            image_url: { type: 'string' },
            category: { type: 'string' },
            artist_id: { type: 'string' },
          },
        },
        ChallengeSubmission: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            image_url: { type: 'string' },
            user_id: { type: 'string' },
            challenge_id: { type: 'string' },
          },
        },
      },
    },
    tags: [
      { name: 'Authentication', description: 'User registration and login' },
      { name: 'Users', description: 'User profiles and artists' },
      { name: 'Artworks', description: 'Artworks management' },
      { name: 'Comments', description: 'Artwork comments' },
      { name: 'Likes', description: 'Artwork likes' },
      { name: 'Messages', description: 'Private messaging' },
      { name: 'Weekly Challenges', description: 'Art challenges' },
      { name: 'Admin', description: 'Admin operations' },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const specs = swaggerJsdoc(options);
module.exports = specs;