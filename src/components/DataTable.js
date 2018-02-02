import React, { Component } from 'react';
import { mFetch } from './Auth';

import './css/DataTable.css';

class DataRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false, key: this.props.msgKey, msg: this.props.msg
    };

    /* Bind to this */
    this.setHoverState = this.setHoverState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.confirmAddRow = this.confirmAddRow.bind(this);
    this.confirmDeleteRow = this.confirmDeleteRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      key: nextProps.msgKey, msg: nextProps.msg
    });
  }

  setHoverState(mouseOver) {
    this.setState({ hovered: mouseOver });
  }

  handleChange(event) {
    let target = event.target.name;
    if (this.state[target] === event.target.value) return;
    this.setState({ [target]: event.target.value });
  }

  confirmAddRow() {
    this.props.onAddRow &&
      this.props.onAddRow(this.state.key, this.state.msg);
  }

  confirmDeleteRow() {
    this.props.onDeleteRow && this.props.onDeleteRow(this.props.idx);
  }

  render() {
    const idx = this.props.idx;
    const msgKey = this.state.key || '';
    const msg = this.state.msg || '';

    let klass = this.props.header === true ?
                "data-row-header theme-text-header-normal" :
                "data-row theme-text-light";

    const addRowKlass = this.props.placeholderRow && this.state.hovered ?
                        "fa-plus-square" : "fa-plus-square-o";

    return (
      <div className={ "table-row " + klass }
           onMouseEnter={(event) => { this.setHoverState(true); } }
           onMouseLeave={(event) => { this.setHoverState(false); } }>
        <div className="data-item col-fixed data-sn">
          {
            this.props.placeholderRow === true ?
            (
              <span className="btn-add-row" onClick={ this.confirmAddRow }>
                <i className={ "fa " + addRowKlass } aria-hidden="true"></i>
              </span>
            ) : idx
          }
        </div>
        <div className="data-item col-f1 data-key">
          {
            this.props.header !== true ?
            (<input type="text" placeholder="Enter key" value={msgKey}
                   name="key" onChange={ this.handleChange } />) : msgKey
          }
        </div>
        <div className="data-item col-f2 data-msg">
          {
            this.props.header !== true ?
            (<input type="text" placeholder="Enter message" value={msg}
                   name="msg" onChange={ this.handleChange } />) : msg
          }
        </div>
        <div className="data-item col-fixed data-del-btn theme-text-red">
          {
            this.state.hovered && (!this.props.header && !this.props.placeholderRow) ?
            (
              <span className="btn-del-row" onClick={ this.confirmDeleteRow }>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </span>
            ) : ""
          }
        </div>
      </div>
    )
  }
}

class DataTable extends Component {
  constructor(props) {
    super(props);

    // The table data
    // An array of { key: ..., msessage: ... }
    this.state = { data: [] }

    // Bind functions to this
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.uploadTableData = this.uploadTableData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearTable === true) {
      // Flush table data down the gutter
      this.setState({ data: [] });
    }

    if (nextProps.uploadTable === true) {
      // Upload table data
      this.uploadTableData();
    }
  }

  uploadTableData() {
    // Notify parent of upload status
    this.props.notifyUploadStatus('processing');

    // Use mFetch to upload data
  }

  addRow(key, message) {
    this.setState((prevState, props) => {
      return { data: [ ...prevState.data, { key: key, message: message } ] };
    });
  }

  deleteRow(idx) {
    // Invalid index
    if (idx < 1 || idx > this.state.data.length) return;

    this.setState((prevState, props) => {
      return { data: [ ...prevState.data.filter((obj, index) => idx !== (index+1)) ] };
    });
  }

  render() {
    return (
      <div className="data-table">
        <DataRow idx="#" msgKey="Key" msg="Message" header={true} />
        <DataRow placeholderRow={true} onAddRow={ this.addRow } />
        {
          this.state.data.map((value, idx) => (
            <DataRow idx={idx + 1} msgKey={value.key} msg={value.message}
                     key={ "data-table-row-item-" + idx } onDeleteRow={ this.deleteRow } />
          ))
        }
      </div>
    )
  }
}

export default DataTable;
