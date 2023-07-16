const express = require("express");
const { dbConnection } = require("./config/config");
const app = express();
const PORT = 3000;

dbConnection();

app.use(express.json());

app.use("/users", require("./routes/users"));

app.use("/queries", require("./routes/queries"));

app.use("/answers", require("./routes/answers"));

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));

module.exports = app;
