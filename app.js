let countries = []; 


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        countries = data; 
        displayCountries(countries); 
    })
    .catch(error => console.error('Error fetching data:', error));


function displayCountries(countriesToDisplay) {
    const countryCard = document.getElementById('countryCard');
    countryCard.innerHTML = ''; 

    countriesToDisplay.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');

        countryDiv.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name} flag">
            <h2>${country.name} </h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region} (${country.subregion})</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
           
        `;

        countryCard.appendChild(countryDiv);
    });
}


function filterCountries() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const selectedRegion = document.getElementById('region').value;

    let filteredCountries = countries;

    if (selectedRegion !== 'allregion') {
        filteredCountries = filteredCountries.filter(country => country.region.toLowerCase() === selectedRegion.toLowerCase());
    }

    if (searchTerm) {
        filteredCountries = filteredCountries.filter(country => country.name.toLowerCase().includes(searchTerm));
    }

    displayCountries(filteredCountries);
}


document.getElementById('searchBox').addEventListener('input', filterCountries);
document.getElementById('region').addEventListener('change', filterCountries);

// To select the Dark Mode button
const darkModeButton = document.getElementById('darkMode');


darkModeButton.addEventListener('click', () => {
    // Toggle the 'dark-mode' class on the body
    document.body.classList.toggle('dark-mode');

    // Change the button text based on the mode
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = 'Light Mode';
    } else {
        darkModeButton.textContent = 'Dark Mode';
    }
});
