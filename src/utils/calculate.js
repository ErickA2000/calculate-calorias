import { kilogramsToPound, metersToInches } from "./conversions";

export function calculateCalories(metricSystem, age, weight, height){
    if(metricSystem === "decimal" || metricSystem === ""){
        height = metersToInches(height);
        weight = kilogramsToPound(weight);
    }

    let factor;
    if(weight <= 165){
        factor = 1.6;
    }else if( weight >= 165 && weight <= 200 ){
        factor = 1.4;
    }else if( weight >= 201 && weight <= 220){
        factor = 1.2;
    }else{
        factor = 1;
    }

    const calories = ( 10 * weight + 6.5 * height - 10 * age + 5 ) * factor;

    return parseFloat(calories.toFixed(2));
}