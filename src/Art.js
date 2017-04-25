import React, { Component } from 'react';
import logoArt from './logo-art.json';
import './App.css';

var DEFAULT_COLOR = 1;

class Art extends Component {

  constructor(props){
    super(props);

    this.state = props.art || logoArt;
    console.log(11);

    this.initRows = this.initRows.bind(this);
    this.swapColor = this.swapColor.bind(this);

    this.export = this.export.bind(this);
    this.import = this.import.bind(this);

    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.removeCol = this.removeCol.bind(this);

    this.initRows();
  }

  addRow(){

    var rows = this.state.rows;
    var newRow = [];
    var colCount = rows[0].length;

    for ( var i = 0; i < colCount; i++ ) newRow.push(DEFAULT_COLOR);

    rows.push(newRow);

    this.refresh();
  }
  removeRow(){

    var rows = this.state.rows;
    rows.pop();

    this.refresh();
  }
  addCol(){

    var rows = this.state.rows;
    var rowCount = rows.length;

    for ( var i = 0; i < rowCount; i++ ) {
      var row = rows[i];
      row.push(DEFAULT_COLOR);
    }

    this.refresh();
  }
  removeCol(){

    var rows = this.state.rows;
    var rowCount = rows.length;

    for ( var i = 0; i < rowCount; i++ ) {
      var row = rows[i];
      row.pop();
    }

    this.refresh();
  }

  save(){
    localStorage.setItem('stickitArt', JSON.stringify(this.state));
  }

  refresh(){
    this.save();
    this.setState(this.state);
  }


  initRows(){
    var pallete = this.state.pallete;
    var rows = [];
    for ( var rowNum in this.state.rows ) {
      var row = this.state.rows[rowNum];
      var cols = [];
      for ( var colNum in row ) {
        var col = row[colNum];
        var color = pallete[col];
        cols.push(<a data-rownum={rowNum} data-colnum={colNum} style={{backgroundColor:color}} onClick={this.swapColor} onContextMenu={this.swapColor}></a>);
      }
      rows.push(<div>{cols}</div>)
    }
    return rows;
  }

  swapColor(event){

    if ( event.preventDefault ) event.preventDefault();

    var rowNum = event.currentTarget.dataset.rownum;
    var colNum = event.currentTarget.dataset.colnum;

    if ( rowNum && colNum ) {

      var currentColor = this.state.rows[rowNum][colNum];

      var newColor;
      if ( event.type === 'click' ) {
        newColor = 0;
        if ( this.state.pallete[currentColor+1] ) newColor = currentColor + 1;
      } else {
        newColor = this.state.pallete.length - 1;
        if ( this.state.pallete[currentColor-1] ) newColor = currentColor - 1;
      }

      this.state.rows[rowNum][colNum] = newColor;

    }

    this.refresh();

    return false;

  }

  export(){
    console.log(JSON.stringify(this.state));
  }

  import(){
    if ( !window.importState ) {
      alert('Please attach import object to window');
    } else {
      this.state = window.importState;
      this.refresh();
    }
  }

  render() {
    return (
      <div>
        <h3>{this.state.name}</h3>
        <article>
          {this.initRows()}
        </article>
        <button onClick={this.export}>Export</button>
        <button onClick={this.import}>Import</button>
        <br/>
        <button onClick={this.addRow}>+ Row</button>
        <button onClick={this.removeRow}>- Row</button>
        <button onClick={this.addCol}>+ Col</button>
        <button onClick={this.removeCol}>- Col</button>
      </div>
    );
  }
}

export default Art;
