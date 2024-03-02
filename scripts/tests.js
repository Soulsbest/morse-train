import { wpmToTimeUnit, timeUnitToWpm } from "./utility.js";

const epsilon = 1e-5;

//Check that wpmToTimeUnit and timeUnitToWpm are inverses
for (let i = 1.0; i <= 100.0; i++) {
    let a = wpmToTimeUnit(i);
    let b = timeUnitToWpm(a);
    if (Math.abs(b - i) > epsilon) {
        console.log("wpmToTimeUnit and timeUnit To Wpm are not inverses: (val, unit, inverseAttempt):\n", i, a, b);
    }
}