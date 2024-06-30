import { regexDecimals, regexNumberPositive } from "../constants/regexp";
import { ageValid, weightValid, heightValid } from "../constants/values"
import { convertByMetricSystem } from "./conversions";

export function validate(metricSystem, age, weight, height) {
    const valid = {
      age: {
        valid: false,
        messages: [],
      },
      weight: {
        valid: false,
        messages: [],
      },
      height: {
        valid: false,
        messages: [],
      },
    };

    const minWeightAndHeight = transformDataRange(metricSystem, weightValid.min, heightValid.min);
    const maxWeightAndHeight = transformDataRange(metricSystem, weightValid.max, heightValid.max);
    
    //* age validation
    if (regexNumberPositive.test(age)) {
      valid.age.valid = true;
    } else {
      valid.age.valid = false;
      valid.age.messages.push("El valor no un número valido");
    }

    if( age >= ageValid.min && age <= ageValid.max ){
      valid.age.valid = true;
    }else{
      valid.age.valid = false;
      valid.age.messages.push(`La edad no esta entre ${ageValid.min} y ${ageValid.max}`)
    }
  
    //* weight validation
    if (regexDecimals.test(weight)) {
      valid.weight.valid = true;
    } else {
      valid.weight.valid = false;
      valid.weight.messages.push("El valor no es numérico");
    }

    if( weight >= minWeightAndHeight.weight && weight <= maxWeightAndHeight.weight ){
      valid.weight.valid = true;
    }else{
      valid.weight.valid = false;
      valid.weight.messages.push(`El peso debe de estar entre ${minWeightAndHeight.weight} y ${maxWeightAndHeight.weight}`)
    }
  
    //* height validation
    if (regexDecimals.test(height)) {
      valid.height.valid = true;
    } else {
      valid.height.valid = false;
      valid.height.messages.push("El valor no es numérico");
    }

    if( height >= minWeightAndHeight.height && height <= maxWeightAndHeight.height ){
      valid.height.valid = true;
    }else{
      valid.height.valid = false;
      valid.height.messages.push(`La altura debe de estar entre ${minWeightAndHeight.height} y ${maxWeightAndHeight.height}`)
    }
  
    return valid;
  }

  function transformDataRange(metricSystem, weight, height){
    if(metricSystem === "decimal"){
      return {
        weight,
        height
      }
    }else{
      return convertByMetricSystem(metricSystem, weight, height);
    }
  }