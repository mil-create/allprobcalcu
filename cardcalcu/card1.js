let selectedCardType = 'spade';

function toggleCard() {
    const cardTypes = ['spade', 'heart', 'diamond', 'club'];
    const cardIcons = ['spade.png', 'heart.png', 'diamond.png', 'club.png'];
    
    let currentIndex = cardTypes.indexOf(selectedCardType);
    let nextIndex = (currentIndex + 1) % cardTypes.length;

    selectedCardType = cardTypes[nextIndex];
    document.getElementById('cardTypeIcon').src = cardIcons[nextIndex];
    document.getElementById('probabilityResult').textContent = `Calculating for ${selectedCardType.toUpperCase()}...`;
}

function calculateDiscreteProbability() {
    const numCardsDrawn = parseInt(document.getElementById('numCardsDrawn').value);
    const numDesiredCards = parseInt(document.getElementById('numDesiredCards').value); // Number of desired cards drawn
    const deckSize = 52;
    const cardsPerSuit = 13;

    if (!selectedCardType) {
        alert("Please select a card type!");
        return;
    }

    if (numDesiredCards > numCardsDrawn || numDesiredCards > cardsPerSuit) {
        alert("Invalid input! Desired cards cannot exceed drawn cards or the total cards in the suit.");
        return;
    }

    // Helper function for factorial
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    // Combination function: C(n, k) = n! / [k!(n-k)!]
    function combination(n, k) {
        return factorial(n) / (factorial(k) * factorial(n - k));
    }

    // Calculate favorable outcomes
    const favorableOutcomes =
        combination(cardsPerSuit, numDesiredCards) * combination(deckSize - cardsPerSuit, numCardsDrawn - numDesiredCards);

    // Calculate total outcomes
    const totalOutcomes = combination(deckSize, numCardsDrawn);

    // Probability
    const probability = favorableOutcomes / totalOutcomes;
    const probabilityPercentage = (probability * 100).toFixed(2);

    const explanation = `
    Probability of drawing exactly ${numDesiredCards} ${selectedCardType.toUpperCase()} cards: ${probabilityPercentage}%\n
    <p align="left"><strong>Explanation:<strong><p>
    <p align="left">Total number of cards in the deck: 52.<p>
    <p align="left">Number of cards in the selected suit (${selectedCardType.toUpperCase()}): ${cardsPerSuit}.<p>
    <p align="left">Total number of ways to draw ${numCardsDrawn} cards: C(52, ${numCardsDrawn}).<p>
    <p align="left">Total number of ways to choose ${numDesiredCards} ${selectedCardType.toUpperCase()} cards: C(13, ${numDesiredCards}).<p>
    <p align="left">Total number of ways to choose the remaining ${numCardsDrawn - numDesiredCards} cards from non-${selectedCardType.toUpperCase()} cards: C(39, ${numCardsDrawn - numDesiredCards}).<p>
    <p align="left">Using the formula P(X = k) = [C(13, ${numDesiredCards}) * C(39, ${numCardsDrawn - numDesiredCards})] / C(52, ${numCardsDrawn})<p>
     <p align="left">the result is ${probabilityPercentage}%.<p>
`;

// Display result and explanation
document.getElementById('probabilityResult').innerHTML = explanation.trim();
}
