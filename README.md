1. To run API please run `yarn install` then `yarn start:dev`
2. MongoDB is deployed on mongodb.com. User: payever1111@outlook.com / Kjui1490
3. RabbitMq is deployed on cloudamqp.com. User: payever1111@outlook.com / Kjui1490
4. Emails are sent to payever1111@outlook.com. To view, login to www.outlook.com with user: payever1111@outlook.com / Kjui1490

Endpoint are as requested
POST /api/users
GET /api/user/{userId}
GET /api/user/{userId}/avatar
DELETE /api/user/{userId}/avatar

App is listerning http://localhost:3000, so to create a user, POST request should be sent to http://localhost:3000/api/users with user as a body

Not implemented:
1. Tests
2. Request validation
