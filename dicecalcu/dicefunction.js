// Function to handle the dynamic display of range inputs
function updateRangeInputs() {
  const comparisonType = document.getElementById("comparisonType").value;
  const rangeInputs = document.getElementById("rangeInputs");
  
  // Show range inputs only if "between" is selected
  if (comparisonType === "between") {
    rangeInputs.style.display = "block";
  } else {
    rangeInputs.style.display = "none";
  }
}

// Function to roll the dice and update the displayed result
function rollDiceIcon() {
  // Generate a random number between 1 and 6
  const result = Math.floor(Math.random() * 6) + 1;

  // Update the display for rolled number
  document.getElementById('rolledNumber').innerText = `Rolled: ${result}`;
  
  // Set the target sum to the rolled number for convenience
  document.getElementById('targetSum').value = result;
}

// Main function to calculate the probability
function calculateDiscreteDiceProbability() {
  const numDice = parseInt(document.getElementById('numDice').value);
  const targetSum = parseInt(document.getElementById('targetSum').value);
  const comparisonType = document.getElementById('comparisonType').value;

  if (isNaN(numDice) || numDice < 1 || numDice > 20) {
    alert("Please enter a valid number of dice (1 to 20).");
    return;
  }
  if (isNaN(targetSum) || targetSum < numDice || targetSum > 6 * numDice) {
    alert(`Please enter a valid target sum (between ${numDice} and ${6 * numDice}).`);
    return;
  }

  const totalOutcomes = Math.pow(6, numDice); // Total possible outcomes
  let favorableOutcomes = 0;
  let combinations = [];
  let explanation = "";

  if (comparisonType === "equal") {
    // Count outcomes exactly equal to targetSum
    favorableOutcomes = getFavorableOutcomes(numDice, targetSum, combinations);
    explanation = `Favorable outcomes are calculated by finding all combinations of ${numDice} dice rolls that add up to exactly ${targetSum}.<br>`;
  } else if (comparisonType === "greater") {
    // Count outcomes greater than targetSum
    for (let sum = targetSum + 1; sum <= 6 * numDice; sum++) {
      favorableOutcomes += getFavorableOutcomes(numDice, sum, combinations);
    }
    explanation = `Favorable outcomes are calculated by summing all combinations of ${numDice} dice rolls that result in a sum greater than ${targetSum}.<br>`;
  } else if (comparisonType === "less") {
    // Count outcomes less than targetSum
    for (let sum = numDice; sum < targetSum; sum++) {
      favorableOutcomes += getFavorableOutcomes(numDice, sum, combinations);
    }
    explanation = `Favorable outcomes are calculated by summing all combinations of ${numDice} dice rolls that result in a sum less than ${targetSum}.<br>`;
  } else if (comparisonType === "between") {
    const rangeStart = parseInt(document.getElementById('rangeStart').value);
    const rangeEnd = parseInt(document.getElementById('rangeEnd').value);
    if (isNaN(rangeStart) || isNaN(rangeEnd) || rangeStart > rangeEnd || rangeStart < numDice || rangeEnd > 6 * numDice) {
      alert("Please enter a valid range.");
      return;
    }
    for (let sum = rangeStart; sum <= rangeEnd; sum++) {
      favorableOutcomes += getFavorableOutcomes(numDice, sum, combinations);
    }
    explanation = `Favorable outcomes are calculated by summing all combinations of ${numDice} dice rolls that result in a sum between ${rangeStart} and ${rangeEnd}.<br>`;
  }

  // Calculate probability
  const probability = (favorableOutcomes / totalOutcomes) * 100;

  // Display result with explanation and combinations
  document.getElementById('probabilityResult').innerHTML = `
  Probability: <strong>${probability.toFixed(2)}%</strong><br>
  <p align="left"><strong>Explanation:</strong><br></p>
  <p align="left">Total possible outcomes: <strong>6^${numDice} = ${totalOutcomes}.</strong><br></p>
  <p align="left">${explanation}</p>
  <p align="left">Favorable outcomes: <strong>${favorableOutcomes}</strong>.<br></p>
  <p align="left">Combinations: <strong>${combinations.map(comb => `(${comb.join(",")})`).join(", ")}</strong>.<br></p>
  <p align="left">Formula: P = <strong>Favorable Outcomes / Total Outcomes.</strong><br></p>
  <p align="left">P = <strong>${favorableOutcomes} / ${totalOutcomes} = ${probability.toFixed(2)}%.</strong></p>
  `;
}

// Helper function to count favorable outcomes and store combinations
function getFavorableOutcomes(numDice, targetSum, combinations) {
  let count = 0;

  function roll(diceLeft, currentSum, currentCombination) {
    if (diceLeft === 0) {
      if (currentSum === targetSum) {
        count++;
        combinations.push([...currentCombination]); // Save the combination
      }
      return;
    }
    for (let i = 1; i <= 6; i++) {
      if (currentSum + i <= targetSum) {
        roll(diceLeft - 1, currentSum + i, [...currentCombination, i]);
      }
    }
  }

  roll(numDice, 0, []);
  return count;
}

// Attach the updateRangeInputs function to the dropdown's onchange event
document.getElementById("comparisonType").addEventListener("change", updateRangeInputs);
