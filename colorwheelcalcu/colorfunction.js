let selectedColor = null;

function selectColor(color) {
    selectedColor = color;
    document.getElementById('probabilityResult').textContent = `Calculating for ${selectedColor.toUpperCase()}...`;
}

function calculateProbability() {
    if (!selectedColor) {
        alert("Please select a color first by clicking a color button!");
        return;
    }

    const numDraws = parseInt(document.getElementById('numDraws').value);
    if (isNaN(numDraws) || numDraws < 1) {
        alert("Please enter a valid number of draws (at least 1).");
        return;
    }

    const totalColors = 6; // Total colors on the wheel

    // Calculate the probability of drawing the selected color at least once
    const probability = 1 - Math.pow((totalColors - 1) / totalColors, numDraws);
    const percentage = (probability * 100).toFixed(2);

    document.getElementById('probabilityResult').textContent = `Probability of drawing ${selectedColor.toUpperCase()} at least once in ${numDraws} draws: ${percentage}%`;
}
