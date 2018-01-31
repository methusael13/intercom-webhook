
const triggerAnimationLoop = (stepFn) => {
  if (typeof stepFn !== 'function') return;

  // Get appropriate animation frame hook
  var requestAnimationFrame =
    window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;

  // Time keepers (How grand!)
  // Time measured in milliseconds
  var ptime = Date.now(); var epoch = ptime;

  var step = (ctime) => {
    // Trigger the callback funtion.
    // Duration is passed in milliseconds, while
    // time since epoch passed in seconds
    stepFn(ctime - ptime, (ctime - epoch) * 0.001);
    // Save current time
    ptime = ctime;

    // Hook current function for callback on next frame
    requestAnimationFrame(step);
  }

  // Initiate loop
  step();
}

class CanvasWorker {
  constructor(canvas, canvasWrapper) {
    this.canvas = canvas;
    this.wrapper = canvasWrapper;

    // Get 2D context
    this.ctx = this.canvas.getContext('2d');

    // Bind class methods
    this.initiate = this.initiate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    
    this.step = this.step.bind(this);
    this.render = this.render.bind(this);
    this.drawWave = this.drawWave.bind(this);

    // Add a resize handler
    window.addEventListener('resize', this.updateDimensions);

    // Initial resize
    this.updateDimensions();

    // Constants
    this.xscale = Math.PI / 200.0;
    // Evaluate wave functions every 50 pixels
    this.xstep = 30;
  }

  drawWave(anchorY, waveFnEvaluator, color, fill = false) {
    let cpy = waveFnEvaluator(0);
    // Maximum {x} for which the wave is evaluated
    let xDrawLimit = this.canvas.width + this.xstep;

    // Define wave path
    this.ctx.beginPath();
    this.ctx.moveTo(0, anchorY + cpy);
    for (let i = this.xstep; i < xDrawLimit; i += this.xstep) {
      cpy = waveFnEvaluator(i);
      this.ctx.lineTo(i, anchorY + cpy);
    }

    // If {fill} is true, we need to enclose a domain
    // through the bottom of the screen to the start
    if (fill) {
      // Line to the bottom with a small offset
      this.ctx.lineTo(xDrawLimit, this.canvas.height + 3);
      // Line to the left of screen
      this.ctx.lineTo(-3, this.canvas.height + 3);
      // Set color and fill
      this.ctx.fillStyle = color; this.ctx.fill();
    } else {
      // Set color and stroke
      this.ctx.strokeStyle = color; this.ctx.stroke();
    }

    // Close the curve shape
    this.ctx.closePath();
  }

  render(duration, epoch) {
    this.drawWave(this.canvas.height * 0.8, (x) => {
      let octave0 = 50.0 * Math.sin(x * this.xscale * 0.4 - epoch);
      let octave1 = 30.0 * Math.sin(x * this.xscale * 0.8 - 1.1 * epoch);
      return octave0 + octave1;
    }, 'rgba(255, 255, 255, 0.8)', true);

    this.drawWave(this.canvas.height * 0.8, (x) => {
      let octave0 = 50.0 * Math.sin(x * this.xscale * 0.3 + epoch);
      let octave1 = 20.0 * Math.sin(x * this.xscale + 1.5 * epoch);
      return octave0 + octave1;
    }, 'rgba(255, 255, 255, 0.9)', true);
  }

  step(duration, epoch) {
    // Clear canvas area
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render(duration, epoch);
  }

  updateDimensions() {
    this.canvas.width = this.wrapper.clientWidth;
    this.canvas.height = this.wrapper.clientHeight;
  }

  initiate() {
    triggerAnimationLoop(this.step);
  }
}

export default CanvasWorker;