const app = require('./app.js');
const real_time_message_server = require('./realtimemessage');
require('dotenv').config({ path: './src/config/.env' });
app.listen(process.env.PORT, () => console.log(`server connecter dans ${process.env.PORT}`));
real_time_message_server.listen(process.env.MESSAGE_PORT, () => console.log("server running in port : 8080"));



















