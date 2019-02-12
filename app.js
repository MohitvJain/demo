import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './App.css';
import { fetchData } from './services.js'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Created On</th>
        <th >Action</th>
      </tr>
    </thead>
  );
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [], visible: false,modalData: [] };
  }

  async fetchData() {
    const fetcheddata = await fetchData();
    console.log(">>>>this>>state>",this.state);
  //  this.state.data = fetcheddata;
    // console.log(">>>>>>>>>>>>>>this.state.data",this.state.data)
    this.setState({ data: fetcheddata,asa:"ASasas" });
    console.log(">>>>this>>state>new ",this.state);
  }

  async showMore(row) {
  
    this.setState({
      visible: true,
      modalData: row.children
    });
   
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div className="App">

        <button type="button" onClick={this.fetchData.bind(this)} className="btn">Click Me</button>
        <Modal visible={this.state.visible} width="800" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
          <table >
          {this.state.modalData.length != 0 ? <TableHeader /> : null}
          <tbody>
            {this.state.modalData.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row._id}</td>
                  <td>{row.name}</td>
                  <td>{row.created_on}</td>                 
                </tr>

              );
            })}
          </tbody>
          </table>
            {/* <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a> */}
          </div>
        </Modal>

        <table>
          {this.state.data.length != 0 ? <TableHeader /> : null}
          <tbody>
            {this.state.data.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row._id}</td>
                  <td>{row.name}</td>
                  <td>{row.created_on}</td>
                  <td><button onClick={() => this.showMore(row)}>View More</button></td>
                </tr>

              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
