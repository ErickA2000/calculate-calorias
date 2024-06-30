import { useState } from "react";
import "./App.css";
import { validate } from "./utils/validations";
import { convertByMetricSystem } from "./utils/conversions";
import { calculateCalories } from "./utils/calculate";

function App() {
  const [metricSystem, setMetricSystem] = useState("");
  const [age, setAge] = useState(16);
  const [weight, setWeight] = useState(40.50);
  const [height, setHeight] = useState(1.40);
  const [weightMetric, setWeightMetric] = useState('kilogramo');
  const [heightMetric, setHeightMetric] = useState('metros');
  const [calories, setCalories] = useState(calculateCalories(metricSystem, age, weight, height));

  const formValid = validate(metricSystem, age, weight, height);

  const changeMetricSystem = (system) => {
    setMetricSystem(system);

    if(system === "decimal") {
      setWeightMetric('kilogramo');
      setHeightMetric('metros');
      const conversions = convertByMetricSystem(system, weight, height);

      setWeight(conversions.weight);
      setHeight(conversions.height);
      
    }else if(system === "imperial"){
      setWeightMetric("libra");
      setHeightMetric("pulgadas");
      const conversions = convertByMetricSystem(system, weight, height);

      setWeight(conversions.weight);
      setHeight(conversions.height);
    }
  }
  
  return (
    <>
      <h1>Calculadora de calorías</h1>

      <form>
        <section className="width-15">
          <h4>Sistema métrico</h4>
          <select
            name="metric"
            value={metricSystem}
            onChange={(ev) => {
              changeMetricSystem(ev.target.value)
            }}>
            <option value="decimal">Decimal</option>
            <option value="imperial">Imperial</option>
          </select>
        </section>

        <section className="width-15">
          <h4>Edad</h4>
          <input
            type="text"
            placeholder="Edad"
            name="age"
            value={age}
            onChange={(ev) => {
              setAge(ev.target.value)
              setCalories(calculateCalories(metricSystem, ev.target.value, weight, height));
            }}
          />
          {!formValid.age.valid && <p>{formValid.age.messages}</p>}
        </section>

        <section className="width-15">
          <h4>Peso | <span>{weightMetric}</span></h4> 
          <input
            type="text"
            placeholder="Peso"
            name="weight"
            value={weight}
            onChange={(ev) => {
              setWeight(ev.target.value);
              setCalories(calculateCalories(metricSystem, age, ev.target.value, height))
            }}
          />
          {!formValid.weight.valid && <p>{formValid.weight.messages}</p>}
        </section>

        <section className="width-15">
          <h4>Altura | <span>{heightMetric}</span></h4>
          <input
            type="text"
            placeholder="Altura"
            name="height"
            value={height}
            onChange={(ev) => {
              setHeight(ev.target.value);
              setCalories(calculateCalories(metricSystem, age, weight, ev.target.value));
            }}
          />
          {!formValid.height.valid && <p>{formValid.height.messages}</p>}
        </section>
      </form>

      <h2>Calorías: {calories}</h2>
    </>
  );
}

export default App;
