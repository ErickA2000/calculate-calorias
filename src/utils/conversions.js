//* Imperial to Decimal
export function poundsToKilograms(pound) {
  const factorConversion = 0.453592;
  const kilograms = pound * factorConversion;
  return parseFloat(kilograms.toFixed(2));
}

//* Decimal to imperial
export function kilogramsToPound(kilograms) {
  const factorConversion = 2.20462;
  const pound = kilograms * factorConversion;
  return parseFloat(pound.toFixed(2));
}

//* Decimal to imperial
export function metersToInches(meters) {
  const factorConversion = 39.3701;
  const inches = meters * factorConversion;
  return parseFloat(inches.toFixed(2));
}

//* Imperial to Decimal
export function inchesToMeters(inches) {
  const factorConversion = 1 / 39.3701;
  const meters = inches * factorConversion;
  return parseFloat(meters.toFixed(2));
}

export function convertByMetricSystem(system, weight, height){
  if (system === "") {
    return {
      weight,
      height
    }
  }

  if(system === "decimal"){
    return {
      weight: poundsToKilograms(weight),
      height: inchesToMeters(height)
    }
  }

  if(system === "imperial"){
    return {
      weight: kilogramsToPound(weight),
      height: metersToInches(height)
    }
  }

  return {
    weight: 0,
    height: 0
  };
}