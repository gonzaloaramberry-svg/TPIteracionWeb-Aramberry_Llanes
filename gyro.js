const GyroscopeController = (() => {
  const AXIS_KEYS = ['alpha', 'beta', 'gamma'];

  let config = {
    axisX: 'gamma',
    axisY: 'beta',
    sensitivity: 1.5,
    invertX: false,
    invertY: false,
    useKeyboard: true,
  };

    let calibration = { alpha: 0, beta: 0, gamma: 0 };
    let raw = { alpha: 0, beta: 0, gamma: 0 };
    let output = { x: 0, y: 0 };
    let enabled = false;
    let permissionGranted = false;