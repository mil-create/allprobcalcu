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
    const probability =
        combination(numDraws, desiredOccurrences) *
        Math.pow(p, desiredOccurrences) *
        Math.pow(1 - p, numDraws - desiredOccurrences);

    // Convert the probability to a percentage
    const percentage = (probability * 100).toFixed(2);

    // Use MathJax syntax to display the math equations
    const explanation = `
    <p>You are spinning the wheel <strong>${numDraws}</strong> times.</p>
    <p>You want to calculate the probability of the color <strong>${selectedColor}</strong> appearing exactly <strong>${desiredOccurrences}</strong> times during these spins.</p>
    
    <p>The formula used is:</p>
    <p>\\[
        P(X = k) = C(n, k) \\cdot p^k \\cdot (1 - p)^{n-k}
    \\]</p>
    
    <p>Here’s what the formula means:</p>
    <ul class="circle-list">
        <li><strong>C(n, k)</strong>: The number of ways to choose <strong>${desiredOccurrences}</strong> successes out of <strong>${numDraws}</strong> trials.</li>
        <li><strong>p</strong>: The probability of landing on the color <strong>${selectedColor}</strong> in a single spin.</li>
         \\[
         p = \\frac 1 \ 6 = 0.17</li>
         \\]
        <li><strong>1 - p</strong>: The probability of NOT landing on <strong>${selectedColor}</strong> in a single spin.</li>
        \\[
        (1 - p) = 0.83\\]
    </ul>
    
    <p>Next, we substitute the values into the formula:</p>
    <p>\\[
        P(X = ${desiredOccurrences}) = 
        C(${numDraws}, ${desiredOccurrences}) \\cdot 
        (${p.toFixed(2)})^{${desiredOccurrences}} \\cdot 
        (${(1 - p).toFixed(2)})^{${numDraws - desiredOccurrences}}
    \\]</p>
    
    <p>After calculating, the probability is:</p>
    <p>\\[
        P(X = ${desiredOccurrences}) = ${percentage}\\%
    \\]</p>
    
    <p>This means there is a <strong>${percentage}%</strong> chance that the color <strong>${selectedColor}</strong> will appear exactly <strong>${desiredOccurrences}</strong> times in <strong>${numDraws}</strong> spins.</p>
`;




    // Display the result
    document.getElementById('probabilityResult').innerHTML = explanation;

    // Trigger MathJax to render the equations
    MathJax.typeset();
}
