export function getColor(value) {
  value = Math.max(0, Math.min(100, value));

  const red = { r: 239, g: 68, b: 68 };
  const yellow = { r: 234, g: 179, b: 8 };
  const green = { r: 100, g: 200, b: 30 };

  let color;

  if (value <= 50) {
    let ratio = value / 50;
    color = {
      r: Math.round(red.r + ratio * (yellow.r - red.r)),
      g: Math.round(red.g + ratio * (yellow.g - red.g)),
      b: Math.round(red.b + ratio * (yellow.b - red.b)),
    };
  } else if (value <= 70) {
    let ratio = (value - 50) / 20;
    color = {
      r: Math.round(yellow.r + ratio * (green.r - yellow.r)),
      g: Math.round(yellow.g + ratio * (green.g - yellow.g)),
      b: Math.round(yellow.b + ratio * (green.b - yellow.b)),
    };
  } else {
    let ratio = (value - 70) / 30;
    color = {
      r: Math.max(30, Math.round(green.r - ratio * (255 - green.r))),
      g: Math.round(green.g),
      b: Math.min(55, Math.round(green.b + ratio * (255 - green.b))),
    };
  }

  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === NaN ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value?.trim().length === 0)
  );
}

export function isValidNumber(value) {
  return !isNaN(value) && isFinite(value);
}

export function isValidPhoneNumber(value) {
  let phoneNumber = value.trim();
  if (phoneNumber.startsWith("+")) {
    phoneNumber = phoneNumber.substring(1);
  }

  const phoneRegex = /^[0-9]{8,14}$/;
  return phoneRegex.test(phoneNumber);
}
