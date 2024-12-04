function loadCalculator(calculatorFile) {
    document.getElementById('opening-page').classList.add('hidden');
    const calculatorContainer = document.getElementById('calculator-container');
    calculatorContainer.classList.remove('hidden');

    // Clear any previously loaded content
    calculatorContainer.innerHTML = '';

    // Fetch the calculator HTML file
    fetch(calculatorFile)
        .then((response) => {
            if (!response.ok) throw new Error(`Failed to load: ${calculatorFile}`);
            return response.text();
        })
        .then((data) => {
            // Insert the calculator's HTML into the container
            calculatorContainer.innerHTML = data;

            // Add the Back button dynamically
            if (!document.getElementById('back-button')) {
                const backButton = document.createElement('button');
                backButton.id = 'back-button';
                backButton.textContent = 'Back to Menu';
                backButton.onclick = showOpeningPage;
                calculatorContainer.appendChild(backButton);
            }

            // Dynamically load calculator-specific styles and scripts
            if (calculatorFile.includes('cardcalcu')) {
                loadExternalCSS('cardcalcu/cardstyle.css');
                loadExternalJS('cardcalcu/card1.js');
            } else if (calculatorFile.includes('colorwheelcalcu')) {
                loadExternalCSS('colorwheelcalcu/colorstyle.css');
                loadExternalJS('colorwheelcalcu/colorfunction.js');
            } else if (calculatorFile.includes('dicecalcu')) {
                loadExternalCSS('dicecalcu/dicestyle.css');
                loadExternalJS('dicecalcu/dicefunction.js');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showOpeningPage(); // Go back to the menu if loading fails
        });
}

function loadExternalJS(file) {
    if (!document.querySelector(`script[src="${file}"]`)) {
        const script = document.createElement('script');
        script.src = file;
        document.body.appendChild(script);
    }
}

function loadExternalCSS(file) {
    if (!document.querySelector(`link[href="${file}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    }
}

function showOpeningPage() {
    document.getElementById('calculator-container').classList.add('hidden');
    document.getElementById('opening-page').classList.remove('hidden');
    document.getElementById('calculator-container').innerHTML = ''; // Clear previous calculator content
}


