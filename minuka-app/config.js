const env = process.env;

const config = {
  db: {
    host     : process.env.MYSQLDB_HOSTNAME || "minuka-cwk-db.covnfict6avg.us-east-1.rds.amazonaws.com",
    user     : process.env.MYSQLDB_USER || "root",
    password : process.env.MYSQLDB_ROOT_PASSWORD || "1A36OX90zmFsUFv1qZZN",
    port     : process.env.MYSQLDB_DOCKER_PORT || "3306",
    database: process.env.MYSQLDB_DATABASE || "CloudDb"
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;