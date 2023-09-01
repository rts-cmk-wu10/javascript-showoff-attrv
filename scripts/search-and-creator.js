// local kun, ville bruge json hvis jeg kunne få det til at virke
let attractions = JSON.parse(localStorage.getItem("attractions")) || [
    {
        name: 'Union Aqua Park',
        description: 'Immerse yourself in a paradise of splashy fun at Union Aqua Park, located in the bustling town of Union in the picturesque region of New Bevis. As one of Novelias premier water-fun-lands, our expansive indoor facility ensures the perfect day out no matter the weather. Experience aquatic thrills in a climate-controlled environment, ideal for kids and adults alike.',
        state: 'New Bevis',
        location: "Manhattan",
        hours: "9AM - 5PM",
        admission: [
            { label: "Adults", price: "$30" },
            { label: "Children (5-12)", price: "$20" },
            { label: "Under 5", price: "Free" }
        ],
        ratings: 5,
        imageUrl: 'https://static.wikia.nocookie.net/stroke-facility/images/5/5a/Tropical0007.jpg/revision/latest/scale-to-width-down/1000?cb=20230818110023'
    },
    {
        name: 'Huge fucking Monroe statue',
        description: 'Giant statue of Edgard Monroe, its awesome.',
        state: 'New Bevis',
        location: "Manhattan",
        hours: "9AM - 5PM",
        admission: [
            { label: "Adults", price: "$30" },
            { label: "Children (5-12)", price: "$20" },
            { label: "Under 5", price: "Free" }
        ],
        ratings: 4,
        imageUrl: 'https://static.wikia.nocookie.net/stroke-facility/images/6/66/Uniondistance.png/revision/latest/scale-to-width-down/1000?cb=20230307124838'
    },
    {
        name: 'Ostvald Castle',
        description: 'Ascend to a world where history and fantasy intertwine at Ostvald Castle. This architectural marvel towers atop a mountain, adjacent to the charming Ostvald Village in the scenic realm of Abaliet. A relic from medieval times, Ostvald Castle offers a glimpse into Novelias rich past, as well as panoramic views that will take your breath away.',
        state: 'Abaliet',
        location: "Manhattan",
        hours: "9AM - 5PM",
        admission: [
            { label: "Adults", price: "$30" },
            { label: "Children (5-12)", price: "$20" },
            { label: "Under 5", price: "Free" }
        ],
        ratings: 5,
        imageUrl: 'https://static.wikia.nocookie.net/stroke-facility/images/0/0d/Ostvald.jpg/revision/latest/scale-to-width-down/1000?cb=20211107143938'
    },
];

function saveAttractions() {
    localStorage.setItem("attractions", JSON.stringify(attractions));
}

if (document.getElementById('searchInput')) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const stateFilter = document.getElementById('stateFilter');
    const ratingsFilter = document.getElementById('ratingsFilter');

    searchInput.addEventListener('input', performSearch);
    stateFilter.addEventListener('change', performSearch);
    ratingsFilter.addEventListener('change', performSearch);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedState = stateFilter.value;
        const selectedRating = parseInt(ratingsFilter.value, 10);

        const filteredAttractions = attractions.filter(attraction => {
            const matchesTerm = attraction.name.toLowerCase().includes(searchTerm) ||
                attraction.state.toLowerCase().includes(searchTerm);

            const matchesState = selectedState ? attraction.state === selectedState : true;

            const matchesRating = selectedRating ? attraction.ratings === selectedRating : true;

            return matchesTerm && matchesState && matchesRating;
        });

        displaySearchResults(filteredAttractions);
    }


    function displaySearchResults(results) {
        searchResults.innerHTML = '';

        const searchTerm = searchInput.value;

        results.forEach(result => {
            const attractionDiv = document.createElement('div');
            attractionDiv.className = 'attraction';

            const img = document.createElement('img');
            img.src = result.imageUrl;
            img.alt = result.name;
            img.style.width = "100%";

            const h3 = document.createElement('h3');
            h3.innerHTML = highlightText(result.name, searchTerm);

            const p = document.createElement('p');
            p.innerHTML = highlightText(result.description, searchTerm);

            const stateElement = document.createElement('p');
            stateElement.innerHTML = `State: ${highlightText(result.state, searchTerm)}`;

            const locationElement = document.createElement('p');
            locationElement.innerHTML = `📍 Location: ${highlightText(result.location, searchTerm)}`;

            const hoursElement = document.createElement('p');
            hoursElement.innerHTML = `⏰ Hours: ${highlightText(result.hours, searchTerm)}`;

            const ratingsElement = document.createElement('p');
            let stars = '';
            for (let i = 0; i < result.ratings; i++) {
                stars += '⭐';
            }
            ratingsElement.textContent = `Ratings: ${stars}`;

            const admissionUl = document.createElement('ul');
            admissionUl.className = 'attraction-admission';
            let admissionElement = document.createElement('p');
            admissionElement.textContent = '💲 Admission:';

            result.admission.forEach((entry) => {
                const li = document.createElement('li');
                li.textContent = `${entry.label}: ${entry.price}`;
                admissionUl.appendChild(li);
            });

            const readMoreButton = document.createElement('a');
            readMoreButton.innerHTML = 'Read More';
            readMoreButton.className = 'read-more-button';
            readMoreButton.href = '#';

            attractionDiv.appendChild(img);
            attractionDiv.appendChild(h3);
            attractionDiv.appendChild(p);
            attractionDiv.appendChild(stateElement);
            attractionDiv.appendChild(locationElement);
            attractionDiv.appendChild(hoursElement);
            attractionDiv.appendChild(admissionElement);
            attractionDiv.appendChild(admissionUl);
            attractionDiv.appendChild(ratingsElement);
            attractionDiv.appendChild(readMoreButton);

            searchResults.appendChild(attractionDiv);
        });
    }

}

if (document.getElementById('creator')) {
    const attractionList = document.getElementById("attractionList");
    const addButton = document.getElementById("addButton");
    const updateButton = document.getElementById("updateButton");
    const removeButton = document.getElementById("removeButton");
    const previewButton = document.getElementById("previewButton");

    const nameInput = document.getElementById("attractionName");
    const stateInput = document.getElementById("attractionState");
    const ratingsInput = document.getElementById("attractionRatings");
    const descriptionInput = document.getElementById("attractionDescription");
    const hoursInput = document.getElementById("attractionHours");
    const locationInput = document.getElementById("attractionLocation");
    const admissionInput = document.getElementById("attractionAdmission");
    const imgUrlInput = document.getElementById("attractionImgUrl");

    const previewArea = document.getElementById("previewArea");
    const imgPreview = document.getElementById("imgPreview");
    const errorText = document.getElementById("errorText");

    let selectedAttraction = null;

    function updatePreviewImage(url) {
        if (url) {
            imgPreview.src = url;
            imgPreview.style.display = 'block';
        } else {
            imgPreview.style.display = 'none';
        }
    }

    function togglePreviewButton() {
        if (validateForm()) {
            previewButton.style.display = 'block';
        } else {
            previewButton.style.display = 'none';
        }
    }

    imgUrlInput.addEventListener("input", function () {
        const imgUrl = imgUrlInput.value;
        updatePreviewImage(imgUrl);
    });

    // error validation
    function validateForm() {
        if (
            !nameInput.value ||
            !stateInput.value ||
            !ratingsInput.value ||
            !descriptionInput.value ||
            !imgUrlInput.value ||
            !hoursInput.value ||
            !locationInput.value ||
            !admissionInput.value
        ) {
            errorText.textContent = "All fields must be filled out.";
            return false;
        }

        try {
            JSON.parse(admissionInput.value);
        } catch (e) {
            errorText.textContent = "Invalid Admission JSON format.";
            return false;
        }

        errorText.textContent = "";
        return true;
    }

    function validateRatings() {
        const ratings = parseInt(ratingsInput.value);
        if (ratings < 1 || ratings > 5) {
            ratingsInput.value = Math.min(5, Math.max(1, ratings));
        }
    }

    function toggleJSONPanel() {
        const jsonPanel = document.getElementById("jsonPanel");
        jsonPanel.style.display = jsonPanel.style.display === 'none' ? 'flex' : 'none';
    }

    function updateJSONTextarea() {
        const jsonTextarea = document.getElementById("jsonTextarea");
        if (selectedAttraction !== null) {
            jsonTextarea.value = JSON.stringify(attractions[selectedAttraction], null, 4);
        }
    }

    function applyJSONToForm() {
        const jsonTextarea = document.getElementById("jsonTextarea");
        try {
            const parsed = JSON.parse(jsonTextarea.value);
            nameInput.value = parsed.name || '';
            stateInput.value = parsed.state || '';
            ratingsInput.value = parsed.ratings || 1;
            descriptionInput.value = parsed.description || '';
            imgUrlInput.value = parsed.imageUrl || '';
            hoursInput.value = parsed.hours || '';
            locationInput.value = parsed.location || '';
            admissionInput.value = JSON.stringify(parsed.admission || []);

            if (selectedAttraction !== null) {
                Object.assign(attractions[selectedAttraction], parsed);
            }
        } catch (e) {
            console.error("Invalid JSON format.");
        }
    }

    

    const toggleJSONPanelButton = document.getElementById("toggleJSONPanelButton");
    toggleJSONPanelButton.addEventListener("click", toggleJSONPanel);

    const updateJSONButton = document.getElementById("updateJSONButton");
    updateJSONButton.addEventListener("click", updateJSONTextarea);

    const applyJSONButton = document.getElementById("applyJSONButton");
    applyJSONButton.addEventListener("click", applyJSONToForm);

    function displayAttractions() {
        attractionList.innerHTML = '';
        attractions.forEach((attraction, index) => {
            const li = document.createElement('li');
            li.textContent = attraction.name;
            li.addEventListener('click', function () {
                if (selectedAttraction === index) {
                    selectedAttraction = null;
                    nameInput.value = '';
                    stateInput.value = '';
                    ratingsInput.value = '';
                    descriptionInput.value = '';
                    hoursInput.value = '';
                    locationInput.value = '';
                    admissionInput.value = '';
                    imgUrlInput.value = '';
                    updatePreviewImage('');
                    this.style.fontWeight = 'normal';
                    updateButton.style.display = 'none';
                    previewButton.style.display = 'none';
                    previewArea.innerHTML = ''
                } else {
                    if (selectedAttraction !== null) {
                        attractionList.children[selectedAttraction].style.fontWeight = 'normal';
                    }
                    selectedAttraction = index;
                    this.style.fontWeight = 'bold';
                    nameInput.value = attraction.name;
                    stateInput.value = attraction.state;
                    ratingsInput.value = attraction.ratings;
                    descriptionInput.value = attraction.description;
                    hoursInput.value = attraction.hours;
                    locationInput.value = attraction.location;
                    admissionInput.value = JSON.stringify(attraction.admission || []);
                    imgUrlInput.value = attraction.imageUrl;
                    updatePreviewImage(attraction.imageUrl);
                    updateButton.style.display = 'block';
                    previewArea.innerHTML = ''
                    previewButton.style.display = 'block';
                }
            });
            attractionList.appendChild(li);
        });
    }

    addButton.addEventListener("click", function () {
        if (!validateForm()) return;
        const name = nameInput.value;
        const state = stateInput.value;
        const ratings = Math.min(5, Math.max(1, parseInt(ratingsInput.value)));
        const description = descriptionInput.value;
        const hours = hoursInput.value;
        const location = locationInput.value;
        const admission = JSON.parse(admissionInput.value);
        const imageUrl = imgUrlInput.value;

        attractions.push({ name, state, ratings, description, location, hours, admission, imageUrl });
        saveAttractions();
        displayAttractions();
    });

    updateButton.addEventListener("click", function () {
        if (!validateForm()) return;
        if (selectedAttraction !== null) {
            attractions[selectedAttraction].name = nameInput.value;
            attractions[selectedAttraction].state = stateInput.value;
            attractions[selectedAttraction].ratings = Math.min(5, Math.max(1, parseInt(ratingsInput.value)));
            attractions[selectedAttraction].description = descriptionInput.value;
            attractions[selectedAttraction].hours = hoursInput.value;
            attractions[selectedAttraction].location = locationInput.value;
            attractions[selectedAttraction].admission = JSON.parse(admissionInput.value);
            attractions[selectedAttraction].imageUrl = imgUrlInput.value;

            saveAttractions();
            displayAttractions();
            updateButton.style.display = 'none';
        }
    });

    removeButton.addEventListener("click", function () {
        if (selectedAttraction !== null) {
            attractions.splice(selectedAttraction, 1);
            selectedAttraction = null;
            displayAttractions();
            saveAttractions();
        }
    });

    ratingsInput.addEventListener("input", validateRatings);

    nameInput.addEventListener("input", togglePreviewButton);
    stateInput.addEventListener("input", togglePreviewButton);
    ratingsInput.addEventListener("input", togglePreviewButton);
    descriptionInput.addEventListener("input", togglePreviewButton);
    locationInput.addEventListener("input", togglePreviewButton);
    hoursInput.addEventListener("input", togglePreviewButton);
    admissionInput.addEventListener("input", togglePreviewButton);
    imgUrlInput.addEventListener("input", togglePreviewButton);

    function showPreview() {
        const attractionDiv = document.createElement('div');
        attractionDiv.className = 'attraction';

        const img = document.createElement('img');
        img.src = imgUrlInput.value;
        img.alt = nameInput.value;
        img.style.width = "100%"

        const h3 = document.createElement('h3');
        h3.textContent = nameInput.value;

        const p = document.createElement('p');
        p.textContent = descriptionInput.value;

        const stateElement = document.createElement('p');
        stateElement.textContent = `State: ${stateInput.value}`;

        const hoursElement = document.createElement('p');
        hoursElement.textContent = `⏰ Hours: ${hoursInput.value}`;

        const locationElement = document.createElement('p');
        locationElement.textContent = `📍 Location: ${locationInput.value}`;

        const admissionUl = document.createElement('ul');
        let admissionElement = document.createElement('p');
        admissionElement.textContent = '💲 Admission:';
        try {
            const admissionParsed = JSON.parse(admissionInput.value);
            if (Array.isArray(admissionParsed)) {
                admissionParsed.forEach((item) => {
                    const li = document.createElement('li');
                    li.textContent = `${item.label}: ${item.price}`;
                    admissionUl.appendChild(li);
                });
            } else {
                admissionElement.textContent += ' Invalid JSON';
            }
        } catch (e) {
            admissionElement.textContent += ' Invalid JSON';
        };

        const ratingsElement = document.createElement('p');
        let stars = '';
        for (let i = 0; i < parseInt(ratingsInput.value); i++) {
            stars += '⭐';
        }
        ratingsElement.textContent = `Ratings: ${stars}`;

        let readMoreButton = document.createElement('a');
        readMoreButton.innerHTML = 'Read More';
        readMoreButton.className = 'read-more-button';
        readMoreButton.href = '#';

        attractionDiv.appendChild(img);
        attractionDiv.appendChild(h3);
        attractionDiv.appendChild(p);
        attractionDiv.appendChild(stateElement);
        attractionDiv.appendChild(locationElement);
        attractionDiv.appendChild(hoursElement);
        attractionDiv.appendChild(admissionElement);
        attractionDiv.appendChild(admissionUl)
        attractionDiv.appendChild(ratingsElement);
        attractionDiv.appendChild(readMoreButton);

        previewArea.innerHTML = '';
        previewArea.appendChild(attractionDiv);
        previewArea.style.display = 'block';
    }
    // ???
    previewButton.addEventListener("click", function () {
        if (validateForm()) {
            showPreview();
        }
    });


    displayAttractions();
    updateButton.style.display = 'none';
    updatePreviewImage('');
}


function highlightText(text, searchTerm) {
    const re = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(re, '<strong>$1</strong>');
}