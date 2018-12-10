const sql = require('mssql');

const pool = new sql.ConnectionPool({
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_HOST,
  database: process.env.MSSQL_DATABASE,
  connectionTimeout: 5000,
  requestTimeour: 5000,
});

const conn = pool.connect(function (err) {

  if (err) console.log(err);

  console.log('Connected to MSSQL.')
});

class DBDriver {
  constructor(connection) {
    this.connection = connection;
  }

  async getFactTables() {
    return this.connection.request()
      .query(
        `SELECT *
         FROM tablica
         WHERE sifTipTablica = 1`
      );
  }

  async getDimensionTables(factTableId) {
    return this.connection.request()
      .query(
        `SELECT  dimTablica.nazTablica
               , dimTablica.nazSQLTablica  AS nazSqlDimTablica
               , cinjTablica.nazSQLTablica AS nazSqlCinjTablica
               , cinjTabAtribut.imeSQLAtrib AS nazCinjTablica
               , dimTabAtribut.imeSqlAtrib AS nazDimTablica
               , tabAtribut.*
            FROM tabAtribut
            JOIN dimCinj
              ON tabAtribut.siftablica = dimCinj.sifDimTablica
            JOIN tablica AS dimTablica
              ON dimCinj.sifDimTablica = dimTablica.sifTablica
            JOIN tablica AS cinjTablica
              ON dimCinj.sifCinjTablica = cinjTablica.sifTablica
            JOIN tabAtribut AS cinjTabAtribut
              ON dimCinj.sifCinjTablica = cinjTAbAtribut.sifTablica
             AND dimCinj.rbrCinj = cinjTabAtribut.rbrAtrib
            JOIN tabAtribut AS dimTabAtribut
              ON dimCinj.sifDimTablica = dimTabAtribut.sifTablica
             AND dimCinj.rbrDim = dimTabAtribut.rbrAtrib
           WHERE sifCinjTablica = ${factTableId}
             AND tabAtribut.sifTipAtrib = 2
        ORDER BY dimTablica.nazTablica, rbrAtrib`
      );
  }

  async getMeasures(factTableId) {
    return this.connection.request()
      .query(
        `SELECT tabAtributAgrFun.imeAtrib imeAtribut,
	              tabAtribut.imeSQLAtrib imeSqlAtribut,
	              tabAtribut.rbrAtrib,
	              agrFun.nazAgrFun
           FROM tabAtribut
           JOIN tablica
             ON tabAtribut.sifTablica = tablica.sifTablica
           JOIN tabAtributAgrFun
             ON tabAtribut.sifTablica  = tabAtributAgrFun.sifTablica
            AND tabAtribut.rbrAtrib  = tabAtributAgrFun.rbrAtrib
           JOIN agrFun
             ON tabAtributAgrFun.sifAgrFun = agrFun.sifAgrFun                                         
          WHERE tabAtribut.sifTablica =  ${factTableId}
            AND tabAtribut.sifTipAtrib = 1
       ORDER BY tabAtribut.rbrAtrib`
      );
  }

  async executeQuery(query) {
    return this.connection.request()
      .query(query);
  }
}

const instance = new DBDriver(conn);
Object.freeze(instance);

module.exports = instance;
