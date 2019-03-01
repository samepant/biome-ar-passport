import React from 'react';
import QrReader from 'react-qr-scanner';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: 500,
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleScan(data) {
    if (data) {
      if (data.length < 5) {
        // do nothing
      } else {
        this.props.handleScan(data);
      }
    }
  }

  handleError(err) {
    console.error(err);
  }

  render() {
    const previewStyle = {
      height: window.innerHeight,
      width: window.innerWidth,
      transform: 'scale(2.5, 2.5)',
      clipPath: 'circle(13% at 50% 54%)',
    };
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p className="helper-text">Scan plate code</p>
      </div>
    );
  }
}
