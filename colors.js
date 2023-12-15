const { fromEvent, merge } = rxjs;

const button1 = document.getElementById('color1_button');
const button2 = document.getElementById('color2_button');
const button3 = document.getElementById('color3_button');

const button1Stream = fromEvent(button1, 'click');
const button2Stream = fromEvent(button2, 'click');
const button3Stream = fromEvent(button3, 'click');

const mergedStream = merge(button1Stream, button2Stream, button3Stream);
mergedStream.subscribe(() => {
  document.body.style.backgroundColor = `#${((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")}`
});