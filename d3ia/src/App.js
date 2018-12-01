import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart'



class App extends Component {
   render() {
   return (
      <div className='App'>
          <div className='App-header'>
              <h2>d3ia dashboard</h2>
          </div>
          <div>
            <BarChart data={[5,10,1,3,15,20,5,10, 20]} size={[500,500]} />
          </div>
      </div>
   )
   }
}



// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//       <div>
//       <BarChart data={[5,10,1,3]} size={[500,500]} />
//       </div>
//     );
//   }
// }

export default App;
