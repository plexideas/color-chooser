const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export const getRandomColor = () => {
  return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)]
}

export const getColorWeight = (color) => {
  return color.reduce((a, b) => a + b)
}

export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
