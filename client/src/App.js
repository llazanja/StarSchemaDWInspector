import React, { Component } from 'react';

import API from './API';

import Header from './components/Header';
import FactTableContainer from "./containers/FactTableContainer";
import Footer from "./components/Footer";
import AtributesContainer from "./containers/AtributesContainer";
import QueryContainer from "./containers/QueryContainer";
import QueryResultContainer from "./containers/QueryResultContainer";

class App extends Component {
  constructor() {
    super();

    this.state = {
      factTables: [],
			dimensionTables: [],
			measures: [],
      haveAttributesError: false,
      areAttributesLoading: false,
      queryString: '',
      queryResults: [],
    };
  }

  handleFactTableIsCheckedToggle = async (factTableId, isChecked) => {
    this.setState({
      factTables: this.state.factTables.map((factTable) => {
        if (factTable.tableID === factTableId) {
          return {...factTable, isChecked: isChecked};
        } else {
          return {...factTable, isChecked: false};
        }
      }),
      areAttributesLoading: true,
    });

  	if (isChecked) {
  		try {
        const dResults = await API.get(`/dimension-tables/${factTableId}`);
        const mResults = await API.get(`/measures/${factTableId}`);

        this.setState({
          dimensionTables: dResults.data,
          measures: mResults.data,
        });
      } catch (err) {
        this.setState({ haveAttributesError: true });
      } finally {
        this.setState({ areAttributesLoading: false });
      }
		} else {
      this.setState({
        dimensionTables: [],
        measures: [],
        areAttributesLoading: false,
      });
		}
  };

  handleDimensionTableIsCheckedToggle = (dimensionTableId, isChecked) => {
    this.setState({
      dimensionTables: this.state.dimensionTables.map((dimensionTable) => {
        if (dimensionTable.tableID === dimensionTableId) {
          return { ...dimensionTable, isChecked: isChecked };
        } else {
          return dimensionTable;
        }
      })
    });
  };

  handleDimensionAtributeIsCheckedToggle = (dimensionTableId, atributeNumber, isChecked) => {
    this.setState({
      dimensionTables: this.state.dimensionTables.map((dimensionTable) => {
        if (dimensionTable.tableID === dimensionTableId) {
          const atributes = dimensionTable.atributes.map(atribute => {
            if (atribute.atributeNumber === atributeNumber) {
              return { ...atribute, isChecked };
            } else {
              return atribute;
            }
          });

          return { ...dimensionTable, atributes };
        } else {
          return dimensionTable;
        }
      })
    });
  };

  handleMeasureIsCheckedToggle = (measureId, isChecked) => {
    this.setState({
      measures: this.state.measures.map((measure) => {
        if (measure.id === measureId) {
          return { ...measure, isChecked: isChecked };
        } else {
          return measure;
        }
      })
    });
  };

  initializeFactTables = (factTables) => {
    this.setState({
      factTables
    });
	};

  handleExecuteQueryClicked = async () => {
    const checkedFactTable = this.state.factTables.filter(table => table.isChecked)[0];
    const checkedDimensionTables = this.state.dimensionTables.filter(table => {
      return table.isChecked || table.atributes.filter(atribute => atribute.isChecked).length > 0;
    });
    const checkedMeasures = this.state.measures.filter(measure => measure.isChecked);
    const checkedDimensionAtributes = checkedDimensionTables.reduce((atributes, table) => {
      const checkedAtributes = table.atributes.filter(a => a.isChecked);

      if (checkedAtributes.length > 0) {
        return atributes.concat(checkedAtributes.map(atribute => ({
          ...atribute, dimTable: table.sqlDimName,
        })));
      } else {
        return atributes;
      }
    }, []);

    if (!checkedFactTable) {
      alert('Molimo odaberite barem jednu činjeničnu tablicu.');
      return;
    } else if (checkedDimensionTables.length === 0) {
      alert('Molimo odaberite barem jednu dimenzijsku tablicu.');
      return;
    } else if (checkedDimensionAtributes.length === 0) {
      alert('Molimo odaberite barem jedan dimenzijski atribut.');
      return;
    } else if (checkedMeasures.length === 0) {
      alert('Molimo odaberite barem jednu mjeru.');
      return;
    }

    let selectClause = 'SELECT ';

    checkedMeasures.forEach(
      measure => selectClause += `${measure.agregateFunction}(${checkedFactTable.sqlName}.${measure.sqlName}) AS '${measure.name}'\n, `
    );
    checkedDimensionAtributes.forEach((atribute, index) => {
      index === (checkedDimensionAtributes.length - 1) ?
        selectClause += `${atribute.dimTable}.${atribute.sqlName} AS '${atribute.name}'\n` :
        selectClause += `${atribute.dimTable}.${atribute.sqlName} AS '${atribute.name}'\n, `
    });

    let fromClause = `FROM ${checkedFactTable.sqlName} `;

    checkedDimensionTables.forEach(table => {
      fromClause += `JOIN ${table.sqlDimName} ON ${checkedFactTable.sqlName}.${table.factAtributeName} = ${table.sqlDimName}.${table.dimAtributeName}\n`;
    });

    let groupByClause = 'GROUP BY ';

    checkedDimensionAtributes.forEach((atribute, index) => {
      index === (checkedDimensionAtributes.length - 1) ?
        groupByClause += `${atribute.dimTable}.${atribute.sqlName}` :
        groupByClause += `${atribute.dimTable}.${atribute.sqlName}, `;
    });

    const queryString = `${selectClause}${fromClause}${groupByClause}`;

    this.setState({
      queryString,
    });

    try {
      const response = await API.get(`/execute-query`, { params: { queryString } });

      this.setState({
        queryResults: response.data,
      });
    } catch (e) {
      // TODO
    }
  };

	render() {
		return (
			<div>
				<Header text="4. Domaća Zadaća" />
        <div className="container">
          <div className="row mb-2">
            <div className="col-5">
              <FactTableContainer
                factTables={this.state.factTables}
                handleFactTableIsCheckedToggle={this.handleFactTableIsCheckedToggle}
                initializeFactTables={this.initializeFactTables}/>
            </div>
            <div className="col-7">
              <QueryContainer
                queryString={this.state.queryString}
                handleExecuteQueryClicked={this.handleExecuteQueryClicked}/>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <AtributesContainer
                measures={this.state.measures}
                handleMeasureIsCheckedToggle={this.handleMeasureIsCheckedToggle}
                dimensionTables={this.state.dimensionTables}
                handleDimensionTableIsCheckedToggle={this.handleDimensionTableIsCheckedToggle}
                handleDimensionAtributeIsCheckedToggle={this.handleDimensionAtributeIsCheckedToggle}
                isLoading={this.state.areAttributesLoading}
                isError={this.state.haveAttributesError} />
            </div>
            <div className="col-7">
              <QueryResultContainer
                queryResults={this.state.queryResults}/>
            </div>
          </div>
          <Footer label="Poslovna Inteligencija" />
        </div>
			</div>
		);
	}
}

export default App;
