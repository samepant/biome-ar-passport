import React from 'react';

import ArPassport from './arPassport';
import CodeScan from './codeScan';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeScanned: false,
      codeString: null,
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(code) {
    this.setState({
      codeScanned: true,
      codeString: code,
    });
  }

  render() {
    return (
      <div>
        {this.state.codeScanned ?
          <ArPassport code={this.state.codeString} />
          :
          <CodeScan handleScan={this.handleScan} />
        }
      </div>
    );
  }
}
