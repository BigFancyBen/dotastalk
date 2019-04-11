module.exports = {fpGraph};

function fpGraph(data, playerID) {
  total = data.offlane + data.mid + data.safelane;
  console.log(data);
  if(total != 0){
    console.log(playerID);
    let size = 80;
    let canvas = document.createElement('canvas');
    canvas.height = size;
    canvas.width = size;
    var context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, size);
    context.lineTo(size, size);
    context.closePath();

    // the outline
    context.lineWidth = 2;
    context.strokeStyle = '#6B6E70';
  //  context.stroke();

    // the fill color
    context.fillStyle = "#FFCC00";
    context.fill();

    let tri1 = Math.floor((data.offlane / total)*size);
    console.log(tri1);
    // the triangle
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, size);
    context.lineTo(tri1, tri1);
    context.closePath();

    // the outline
    context.lineWidth = 2;
    context.strokeStyle = '#6B6E70';
  //  context.stroke();

    // the fill color
    context.fillStyle = "#4286f4";
    context.fill();

    let tri3 = size - Math.floor((data.safelane / total)*size);
    console.log(tri3);
    // the triangle
    context.beginPath();
    context.moveTo(0, size);
    context.lineTo(size, size);
    context.lineTo(tri3, tri3);
    context.closePath();

    // the outline
    context.lineWidth = 2;
    context.strokeStyle = '#6B6E70';
  //  context.stroke();

    // the fill color
    context.fillStyle = "#db33ea";
    context.fill();
    return canvas.toDataURL();
  } else {
    return false;
  }
}