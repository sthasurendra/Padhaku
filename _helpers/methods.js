var colors = {
  a: { bg: '#1abc9c', color: '#fff' },
  b: { bg: '#2ecc71', color: '#fff' },
  c: { bg: '#3498db', color: '#fff' },
  d: { bg: '#9b59b6', color: '#fff' },
  e: { bg: '#34495e', color: '#fff' },
  f: { bg: '#16a085', color: '#fff' },
  0: { bg: '#27ae60', color: '#fff' },
  1: { bg: '#7f8c8d', color: '#fff' },
  2: { bg: '#8e44ad', color: '#fff' },
  3: { bg: '#2c3e50', color: '#fff' },
  4: { bg: '#f1c40f', color: '#fff' },
  5: { bg: '#e67e22', color: '#fff' },
  6: { bg: '#e74c3c', color: '#fff' },
  7: { bg: '#c0392b', color: '#fff' },
  8: { bg: '#f39c12', color: '#fff' },
  9: { bg: '#d35400', color: '#fff' },
};
export const HexadecimalConverter = (str) => {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};

export const getInitials = (name) => {
  if (!name) return null;
  var nameArray = name.split(' ');

  if (nameArray.length <= 1) {
    return name.charAt(0).toUpperCase();
  }

  return nameArray[0].charAt(0).toUpperCase() + nameArray[nameArray.length - 1].charAt(0).toUpperCase();
};

export const getYourColor = (userId = null) => {
  if (userId) {
    let firstCharater = userId.substring(0, 1);
    return colors[firstCharater];
  } else {
    return { bg: '#e74c3c', color: '#333' };
  }
};
