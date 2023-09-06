const apiKey = "https://swapi.dev/api/people/1";
const baseUrl = "https://swapi.dev/api/people/";

const fetchCharacterInfo = (characterNumber) => {
    const apiUrl = `${baseUrl}${characterNumber}/`;

    const headers = {
        Authorization: `Bearer ${apiKey}`
    };

    return fetch(apiUrl, { headers })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const formattedCharacterInfo = {
                name: data.name,
                height: data.height,
                hair: data.hair_color,
            };
            return formattedCharacterInfo;
        });
};


const characterInfoPromises = [];
for (let characterNumber = 1; characterNumber <= 10; characterNumber++) {
    characterInfoPromises.push(fetchCharacterInfo(characterNumber));
}

Promise.all(characterInfoPromises)
    .then((characterInfoArray) => {

        characterInfoArray.forEach((characterInfo, index) => {
            console.log(`${index + 1}.`, characterInfo);
        });
    })
    .catch((error) => {
        console.error("Error fetching character information:", error);
    });