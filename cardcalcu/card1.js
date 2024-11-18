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

function calculateProbability() {
    const numCardsDrawn = parseInt(document.getElementById('numCardsDrawn').value);
    const deckSize = 52;
    const cardsPerSuit = 13;

    if (!selectedCardType) {
        alert("Please select a card type!");
        return;
    }

    // Calculate probability
    const probabilityOfDrawingType = 1 - ( (deckSize - cardsPerSuit) / deckSize ) ** numCardsDrawn;
    const probabilityPercentage = (probabilityOfDrawingType * 100).toFixed(2);

    document.getElementById('probabilityResult').textContent = 
        `Probability of drawing a ${selectedCardType.toUpperCase()} card: ${probabilityPercentage}%`;
}
