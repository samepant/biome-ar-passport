import React from 'react';

export default class arPassport extends React.Component {
  constructor(props) {
    super(props);

    this.THREECAMERA = null;
    this.initFaceFilter = this.initFaceFilter.bind(this);
    this.initThreeScene = this.initThreeScene.bind(this);
    this.detectCallback = this.detectCallback.bind(this);
  }

  componentDidMount() {
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: (isError, bestVideoSettings) => {
        this.initFaceFilter(bestVideoSettings);
      },
    });
  }

  detectCallback(faceIndex, isDetected) {
    if (isDetected) {
        console.log('INFO in detectCallback() : DETECTED');
    } else {
        console.log('INFO in detectCallback() : LOST');
    }
  }

  initThreeScene(spec) {
    const threeStuffs = THREE.JeelizHelper.init(spec, this.detectCallback);

     // CREATE A CUBE
    const cubeGeometry = new THREE.BoxGeometry(1,1,1);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    threeCube.frustumCulled = false;
    threeStuffs.faceObject.add(threeCube);

    //CREATE THE CAMERA
    const aspecRatio = spec.canvasElement.width / spec.canvasElement.height;
    this.THREECAMERA = new THREE.PerspectiveCamera(20, aspecRatio, 0.1, 100);
  }

  initFaceFilter(videoSettings) {
    JEEFACEFILTERAPI.init({
      followZRot: true,
      canvasId: 'jeeFaceFilterCanvas',
      NNCpath: './jeelizScripts/', // root of NNC.json file
      maxFacesDetected: 1,
      callbackReady: (errCode, spec) => {
        if (errCode) {
          console.log('AN ERROR HAPPENS. ERR =', errCode);
          return;
        }

        console.log('INFO : JEEFACEFILTERAPI IS READY');
        this.initThreeScene(spec);
      },

      // called at each render iteration (drawing loop) :
      callbackTrack: (detectState) => {
        THREE.JeelizHelper.render(detectState, this.THREECAMERA);
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.code}
        <canvas width="600" height="600" id="jeeFaceFilterCanvas" />
      </div>
    );
  }
}
