const getInfoButton = document.querySelector('#get-info-button');
const results = document.querySelector('.results');

document.getElementById('get-info-button').addEventListener('click', getInfoFromApi);

async function getInfoFromApi() {
    const baseUrl = 'https://swapi.dev/api/people/10/';
    const settings = {
        method: 'GET',
        headers: {}
    };

    try {
        const response = await fetch(baseUrl, settings);
        const data = await response.json();

        console.log('Är data bättre?', data);

        // Eftersom data är ett objekt och inte en array
        if (data) {
            results.innerHTML = ''; // Rensa tidigare innehåll
        
            const name = document.createElement('p');
            name.innerText = `Name: ${data.name}`;
            results.appendChild(name);
        
            const birthYear = document.createElement('p');
            birthYear.innerText = `Birth Year: ${data.birth_year}`;
            results.appendChild(birthYear);
        
            const height = document.createElement('p');
            height.innerText = `Height: ${data.height}`;
            results.appendChild(height);
        
            const mass = document.createElement('p');
            mass.innerText = `Mass: ${data.mass}`;
            results.appendChild(mass);

            const gender = document.createElement('p');
            gender.innerText = `Gender: ${data.gender}`;
            results.appendChild(gender);   
        
            const hairColor = document.createElement('p');
            hairColor.innerText = `Hair Color: ${data.hair_color}`;
            results.appendChild(hairColor);

            const skinColor = document.createElement('p');
            skinColor.innerText = `Skin Color: ${data.skin_color}`;
            results.appendChild(skinColor);
        
            const eyeColor = document.createElement('p');
            eyeColor.innerText = `Eye Color: ${data.eye_color}`;
            results.appendChild(eyeColor);
            
        } else {
            results.innerText = 'Ingen information tillgänglig.';
        }
    } catch (error) {
        console.error('Något gick fel:', error);
        results.innerText = 'Något gick fel. Försök igen senare.';
    }
}
document.getElementById('get-info-button').addEventListener('click', function() {
    document.querySelector('.results p').textContent = 'Here is your API result!';
  });

document.getElementById('search-character-button').addEventListener('click', function() {
    let query = document.getElementById('character-input').value;
    console.log(query); // Här kan du se vad användaren skriver in
});

document.getElementById('search-character-button').addEventListener('click', function() {
    let query = document.getElementById('character-input').value.toLowerCase();
    
    fetch(`https://swapi.dev/api/people/?search=${query}`)
        .then(response => response.json())
        .then(data => {
            let character = data.results[0]; // Vi tar första träffen
            if (character) {
                // Uppdatera HTML med karaktärsinformation
                document.querySelector('.ApiSearch').innerHTML = `
                    <p>Name: ${character.name}</p>
                    <p>Height: ${character.height}</p>
                    <p>Mass: ${character.mass}</p>
                    <p>Hair Color: ${character.hair_color}</p>
                    <p>Skin Color: ${character.skin_color}</p>
                    <p>Eye Color: ${character.eye_color}</p>
                    <p>Birth Year: ${character.birth_year}</p>
                    <p>Gender: ${character.gender}</p>
                    <article class= 'homeworld'></article>
                `;
                console.log(character)
                fetchHomeWorld(character.homeworld)
            } else {
                document.querySelector('.ApiSearch').innerHTML = '<p>No character found</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('search-planet-button').addEventListener('click', function() {
    let query = document.getElementById('planet-input').value;
    console.log(query); // Här kan du se vad användaren skriver in
});

document.getElementById('search-planet-button').addEventListener('click', function() {
    let query = document.getElementById('planet-input').value.toLowerCase();
    
    fetch(`https://swapi.dev/api/planets/?search=${query}`)
        .then(response => response.json())
        .then(data => {
            let planet = data.results[0]; // Vi tar första träffen
            if (planet) {
                // Uppdatera HTML med planetsinformation
                document.querySelectorAll('.ApiSearch')[1].innerHTML = `
                    <p>Name: ${planet.name}</p>
                    <p>Rotation Period: ${planet.rotation_period}</p>
                    <p>Orbital Period: ${planet.orbital_period}</p>
                    <p>Diameter: ${planet.diameter}</p>
                    <p>Climate: ${planet.climate}</p>
                    <p>Gravity: ${planet.gravity}</p>
                    <p>Terrain: ${planet.terrain}</p>
                    <p>Surface Water: ${planet.surface_water}</p>
                    <p>Population: ${planet.population}</p>
                `;
            } else {
                document.querySelectorAll('.ApiSearch')[1].innerHTML = '<p>No planet found</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
function fetchHomeWorld(homeWorld) {
    fetch(homeWorld)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Lägg till texten "Homeworld:" framför namnet
            document.querySelector('.homeworld').innerHTML = `Homeworld: ${data.name}`;

            // Uppdatera sökfältet med homeworld-namnet
            document.getElementById('planet-input').value = data.name.toLowerCase();

            // Trigga sökningen genom att simulera ett klick på sökknappen
            document.getElementById('search-planet-button').click();
        })
        .catch(error => console.error('Error fetching data:', error));
}
            

/* //Level 5 Detta laggar så mycket när man söker, så jag tar bort det.
let saveEl = document.getElementById("save-el");
let searchCharacterButton = document.getElementById("search-character-button");

searchCharacterButton.addEventListener('click', function() {
    let query = document.getElementById('character-input').value.toLowerCase();
    let historyStr = " " + query + " - "; 
    saveEl.innerText += historyStr;
});*/