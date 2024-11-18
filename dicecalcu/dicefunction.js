function rollDiceIcon() {
  // Generate a random number between 1 and 6
  const result = Math.floor(Math.random() * 6) + 1;

  // Update the display for rolled number
  document.getElementById('rolledNumber').innerText = `Rolled: ${result}`;
  
  // Set the target sum to the rolled number for convenience
  document.getElementById('targetSum').value = result;
}

function calculateProbability() {
  const numDice = parseInt(document.getElementById('numDice').value);
  const targetSum = parseInt(document.getElementById('targetSum').value);

  // Calculate all possible outcomes for the given number of dice
  let outcomes = getAllOutcomes(numDice);
  let favorableOutcomes = outcomes.filter(outcome => 
    outcome.reduce((a, b) => a + b) === targetSum
  );

  // Probability calculation
  let probability = (favorableOutcomes.length / outcomes.length) * 100;

  // Display result
  document.getElementById('probabilityResult').innerHTML = 
    `Probability of rolling a sum of ${targetSum} with ${numDice} dice: ${probability.toFixed(2)}%`;
}

// Helper function to generate all possible outcomes for n dice
function getAllOutcomes(numDice) {
  let outcomes = [];
  
  function roll(diceLeft, currentRoll) {
    if (diceLeft === 0) {
      outcomes.push(currentRoll);
      return;
    }
    for (let i = 1; i <= 6; i++) {
      roll(diceLeft - 1, [...currentRoll, i]);
    }
  }

  roll(numDice, []);
  return outcomes;
}
