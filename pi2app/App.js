import React from 'react';
import { RootNavigator } from './src/Routes';
import { isSignedIn } from "./src/AuthMethods";

if (process.env.BACKEND == undefined || process.env.BACKEND == ''){
  process.env.BACKEND='http://' + process.env.REACT_NATIVE_PACKAGER_HOSTNAME
}

class App extends React.Component {
  state = {
    signed: false,
    signLoaded: false,
  }

  componentWillMount(){
    isSignedIn()
    .then(res => this.setState({ signed: res, signLoaded: true }))
    .catch(err => alert("Erro"));
  }

  render() {
    const { signLoaded, signed } = this.state;

    if (!signLoaded) {
      return null;
    }

    const Layout = RootNavigator(signed);
    return <Layout />;
  }
}

export default App;