let selectedColor = null;

// Function to select the color
function selectColor(color) {
    selectedColor = color;
    document.getElementById('probabilityResult').textContent = `Calculating for ${selectedColor.toUpperCase()}...`;
}

// Helper function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Helper function to calculate combinations: C(n, k) = n! / [k! * (n-k)!]
function combination(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

// Function to calculate the discrete probability
function calculateDiscreteProbability() {
    if (!selectedColor) {
        alert("Please select a color first by clicking a color button!");
        return;
    }

    // Get user input values
    const numDraws = parseInt(document.getElementById('numDraws').value);
    const desiredOccurrences = parseInt(document.getElementById('desiredOccurrences').value);

    // Validate the inputs
    if (isNaN(numDraws) || numDraws < 1) {
        alert("Please enter a valid number of draws (at least 1).");
        return;
    }

    if (isNaN(desiredOccurrences) || desiredOccurrences < 0 || desiredOccurrences > numDraws) {
        alert("Please enter a valid number of desired occurrences (between 0 and the number of draws).");
        return;
    }

    const totalColors = 6; // Total colors available on the wheel
    const p = 1 / totalColors; // Probability of drawing the selected color

    // Formula: P(X = k) = C(n, k) * p^k * (1-p)^(n-k)
    // Where:
    // n = numDraws (total number of draws)
    // k = desiredOccurrences (desired number of occurrences)
    // p = probability of drawing the selected color
    const probability =
        combination(numDraws, desiredOccurrences) *
        Math.pow(p, desiredOccurrences) *
        Math.pow(1 - p, numDraws - desiredOccurrences);

    // Convert the probability to a percentage
    const percentage = (probability * 100).toFixed(2);

    const explanation = `
     <p align="left">You are spinning the wheel <strong>${numDraws}</strong> times.</p>
     <p align="left">You want to calculate the probability of the color <strong>${selectedColor}</strong> appearing exactly <strong>${desiredOccurrences}</strong> times.</p>

     <p align="left">The probability of landing on <strong>${selectedColor}</strong> in any single spin is p = 1/${totalColors} = <strong>${p.toFixed(2)}</strong>.</p>

      <p align="left">The probability of <strong>not</strong> landing on ${selectedColor} in a single spin is <strong>${(1 - p).toFixed(2)}</strong>.</p>

     <p align="left">Since you want <strong>${desiredOccurrences}</strong> occurrences of ${selectedColor}, the remaining <strong>${numDraws - desiredOccurrences}</strong> spins must not land on ${selectedColor}. This gives us the term <strong>(1 - p)^${numDraws - desiredOccurrences} = ${(1 - p).toFixed(2)}^${numDraws - desiredOccurrences}</strong>.</p>

     <p align="left">Using the binomial probability formula, the calculation is as follows:</p>

     <p align="left">
         P(X = <strong>${desiredOccurrences}</strong>) = 
         C(${numDraws}, ${desiredOccurrences}) * 
         (<strong>${p.toFixed(2)})^${desiredOccurrences}</strong> * 
         (<strong>${(1 - p).toFixed(2)})^${numDraws - desiredOccurrences}</strong>
         </p>

     <p align="left">This gives a probability of <strong>${percentage}%</strong>.</p>
`;


    // Display the result
    document.getElementById('probabilityResult').innerHTML = explanation;
}