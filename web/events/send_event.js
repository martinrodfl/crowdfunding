function sendEvent(event) {
  var domEvent = new Event(event.type);
  domEvent.data = event.data;
  window.dispatchEvent(domEvent);
}