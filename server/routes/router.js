const express = require('express');
const router = express.Router();

const driver = require('../database/mssql');

router.get('/fact-tables', async function (req, res, next) {
  const result = await driver.getFactTables();

  const factTables = [];

  for (let i = 0; i < result.recordset.length; i++) {
    const factTable = result.recordset[i];

    factTables.push({
      tableID: factTable.sifTablica,
      sqlName: factTable.nazSQLTablica.trim(),
      name: factTable.nazTablica.trim(),
      isChecked: false,
    });
  }

  return res.json(factTables);
});

router.get('/dimension-tables/:factTableId', async function (req, res, next) {
  const factTableId = req.params.factTableId;
  const result = await driver.getDimensionTables(factTableId);

  const dimensionTables = [];

  for (let i = 0; i < result.recordset.length; i++) {
    const dimensionTable = result.recordset[i];

    const idx = dimensionTables.findIndex(table => table.tableID === dimensionTable.sifTablica);

    if (idx === -1) {
      dimensionTables.push({
        tableID: dimensionTable.sifTablica,
        name: dimensionTable.nazTablica.trim(),
        sqlDimName: dimensionTable.nazSqlDimTablica.trim(),
        sqlFactName: dimensionTable.nazSqlCinjTablica.trim(),
        factAtributeName: dimensionTable.nazCinjTablica.trim(),
        dimAtributeName: dimensionTable.nazDimTablica.trim(),
        isChecked: false,
        atributes: [
          {
            atributeNumber: dimensionTable.rbrAtrib,
            name: dimensionTable.imeAtrib.trim(),
            sqlName: dimensionTable.imeSQLAtrib.trim(),
            isChecked: false,
          }
        ],
      });
    } else {
      dimensionTables[idx].atributes.push({
        atributeNumber: dimensionTable.rbrAtrib,
        name: dimensionTable.imeAtrib.trim(),
        sqlName: dimensionTable.imeSQLAtrib.trim(),
        isChecked: false,
      });
    }
  }

  const uniqueDimTables = dimensionTables.filter(function (currentTable, index, self) {
    const idx = self.findIndex(table => table.tableID === currentTable.tableID);

    return idx === index;
  });

  return res.json(uniqueDimTables);
});

router.get('/measures/:factTableId', async function (req, res, next) {
  const factTableId = req.params.factTableId;
  const result = await driver.getMeasures(factTableId);

  const measures = [];

  for (let i = 0; i < result.recordset.length; i++) {
    const measure = result.recordset[i];

    measures.push({
      id: i,
      name: measure.imeAtribut.trim(),
      sqlName: measure.imeSqlAtribut.trim(),
      atributeNumber: measure.rbrAtrib,
      agregateFunction: measure.nazAgrFun.trim()
    });
  }

  return res.json(measures);
});

router.get('/execute-query', async function (req, res, next) {
  const queryString = req.query.queryString;
  const result = await driver.executeQuery(queryString);

  return res.json(result.recordset);
});

module.exports = router;
