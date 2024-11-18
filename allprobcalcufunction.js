function loadCalculator(calculatorFile) {
    document.getElementById('opening-page').classList.add('hidden');
    const calculatorContainer = document.getElementById('calculator-container');
    calculatorContainer.classList.remove('hidden');

    // Fetch the calculator HTML file directly
    fetch(calculatorFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load file: ${calculatorFile}`);
            }
            return response.text();
        })
        .then(data => {
            // Load the calculator content and include Back button
            calculatorContainer.innerHTML = data;
            if (!document.getElementById('back-button')) {
                calculatorContainer.innerHTML += '<button id="back-button" onclick="showOpeningPage()">Back to Menu</button>';
            }

            // Load specific JS and CSS files based on calculatorFile path
            if (calculatorFile.includes('cardcalcu')) {
                loadExternalJS('cardcalcu/card1.js');
                loadExternalCSS('cardcalcu/cardstyle.css');
            } else if (calculatorFile.includes('colorwheelcalcu')) {
                loadExternalJS('colorwheelcalcu/colorfunction.js');
                loadExternalCSS('colorwheelcalcu/colorstyle.css');
            } else if (calculatorFile.includes('dicecalcu')) { 
                loadExternalJS('dicecalcu/dicefunction.js');
                loadExternalCSS('dicecalcu/dicestyle.css');
            }
        })
        .catch(error => {
            console.error('Error loading calculator file:', error);
            showOpeningPage(); // Go back to menu if loading fails
        });
}

// Helper function to load external JavaScript files only once
function loadExternalJS(file) {
    if (!document.querySelector(`script[src="${file}"]`)) {
        const script = document.createElement('script');
        script.src = file;
        document.body.appendChild(script);
    }
}

// Helper function to load external CSS files only once
function loadExternalCSS(file) {
    if (!document.querySelector(`link[href="${file}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    }
}

// Function to return to the opening page
function showOpeningPage() {
    document.getElementById('calculator-container').classList.add('hidden');
    document.getElementById('opening-page').classList.remove('hidden');
    document.getElementById('calculator-container').innerHTML = ''; // Clear previous calculator content
}
