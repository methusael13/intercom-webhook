
class CanvasWorker {
  initiate() {
    console.log('Initiated canvas');
  }
}

var canvasWorker;
window.addEventListener('load', (event) => {
  canvasWorker = new CanvasWorker();
}, false);
