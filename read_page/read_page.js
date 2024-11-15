let destinations = [
  {
    "name": "Kolomyia",
    "description": "Kolomyia, formerly known as Kolomea (Ukrainian: Коломия), is a city located on the Prut River in Ivano-Frankivsk Oblast (province), in western Ukraine",
    "last_updated": "Last updated 3 minutes ago",
    "img": "../assets/kolomyia.jpg",
    "price": 120
  },
  {
    "name": "Kolodruby",
    "description": "Коло́друби — село у Стрийському районі Львівської області. Належить до Миколаївської міської ради. Нараховує близько 260 дворів. В селі проживає 1 034 особи.",
    "last_updated": "Last updated 5 minutes ago",
    "img": "../assets/kolodruby.jpg",
    "price": 150
  },
  {
    "name": "Kostopil",
    "description": "Косто́піль — місто в Україні, Рівненського району, Рівненської області. Центр Костопільської громади. Населення становить 37 988 осіб (2022). Засноване 1783 року. Статус міста з 1923 року.",
    "last_updated": "Last updated 8 minutes ago",
    "img": "../assets/kostopil.jpg",
    "price": 200
  },
  {
    "name": "Lviv",
    "description": "Lviv emerged as the centre of the historical regions of Red Ruthenia and Galicia in the 14th century, superseding Halych, Chełm, Belz, and Przemyśl. It was the capital of the Kingdom of Galicia–Volhynia from 1272 to 1349",
    "last_updated": "Last updated 10 minutes ago",
    "img": "../assets/lviv.jpg",
    "price": 130
  },
  {
    "name": "Kyiv",
    "description": "Kyiv is the capital and most populous city of Ukraine. It is in north-central Ukraine along the Dnieper River. As of 1 January 2022, its population was 2,952,301, making Kyiv the seventh-most populous city in Europe.",
    "last_updated": "Last updated 12 minutes ago",
    "img": "../assets/kyiv.jpg",
    "price": 180
  }
]

let selected_destinations = [...destinations];
let edited_destination_id = null;

const addDestinationsToPage = (array) => {
    const itemsWrapper = document.getElementById('ItemsWrappper');
    const template = document.querySelector('.item-template');

    let child = itemsWrapper.firstChild;
    while (child) {
        const nextSibling = child.nextSibling;
        if (child.nodeType === 1 && child.tagName.toLowerCase() === 'div') {
            itemsWrapper.removeChild(child);
        }
        child = nextSibling;
    }
    array.forEach(destination => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.avatar').style.backgroundImage = `url(${destination.img})`;
        clone.querySelector('.name').textContent = destination.name;
        clone.querySelector('.description').textContent = destination.description;
        clone.querySelector('.updated-at').textContent = destination.last_updated;
        clone.querySelector('.price').textContent = `${destination.price}$`;
        itemsWrapper.appendChild(clone);
    });

    addRemoveEventListeners();
    addEditEventListeners();
}

function filterDestinations(searchTerm) {
    return selected_destinations.filter(destination =>
        destination.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
        destination.description.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
}

function calculateTotalPrice() {
    const totalPrice = selected_destinations.reduce((sum, destination) => sum + destination.price, 0);
    document.getElementById('total_price').textContent = `${totalPrice.toString()} $`;
}

function sortByCategory(sortBy, destinationsArray) {
    if (sortBy === 'Price') {
        return destinationsArray.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Name') {
        return destinationsArray.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    return destinationsArray;
}

function removeDestination(destinationName) {
    selected_destinations = selected_destinations.filter(destination => destination.name !== destinationName);
    updatedDestinationsDisplay();
}

function editDestination(destinationName) {
    document.querySelector('.overlay').classList.toggle('target');

    const destination = selected_destinations.find(doc => doc.name === destinationName);
    edited_destination_id = selected_destinations.findIndex(doc => doc.name === destinationName);
    if (destination) {
        const inputs = document.querySelectorAll('.create-form input');
        const textarea = document.querySelector('.create-form textarea');

        inputs[0].value = destination.name;
        inputs[1].value = destination.price;
        textarea.value = destination.description;
    } else {
        console.error('destination not found');
    }
}

function addRemoveEventListeners() {
    document.querySelectorAll('.remove-destination').forEach(button => {
        button.addEventListener('click', function(event) {
            const destinationName = event.target.closest('.item').querySelector('.name').textContent;
            removeDestination(destinationName);
        });
    });
}

function addEditEventListeners() {
    document.querySelectorAll('.edit-destination').forEach(button => {
        button.addEventListener('click', function(event) {
            const destinationName = event.target.closest('.item').querySelector('.name').textContent;
            editDestination(destinationName);
        });
    });
}

function updatedDestinationsDisplay() {
    const searchTerm = document.querySelector('.search-menu input').value.trim();
    const selectedValue = document.getElementById('sort').value;
    let filteredDestinations;
    if (searchTerm === '') {
        filteredDestinations = destinations;
    }
    else {
        filteredDestinations = searchTerm ? filterDestinations(searchTerm) : selected_destinations;

    }

    let destinationsToDisplay = selectedValue !== 'Choose one...' ? sortByCategory(selectedValue, filteredDestinations) : filteredDestinations;
    selected_destinations = destinationsToDisplay;
    addDestinationsToPage(destinationsToDisplay);
}

function createDestination() {
    const inputsData = document.querySelectorAll('.create-form input');
    const textareaData = document.querySelector('.create-form textarea').value;
    const inputValues = Array.from(inputsData).map(input => input.value);
    inputValues[2] = inputsData[2].files[0];

    if (selected_destinations.some(destination => destination.name === inputValues[0])) {
        document.querySelector('.error').innerHTML = 'name should be unique';
        return null;
    }

    if (inputValues[2]) {
        inputValues[2] = URL.createObjectURL(inputValues[2]);
        document.querySelector('.error').innerHTML = '';
    }
    else {
        document.querySelector('.error').innerHTML = 'u should add image';
        return null;
    }




     return {
        "name": inputValues[0],
        "description": textareaData,
        "last_updated": "Last updated now",
        "img": inputValues[2],
        "price": Number(inputValues[1])
    }
}

// Event listeners
document.querySelector('.search-menu form').addEventListener('submit', function(event) {
    event.preventDefault();
    updatedDestinationsDisplay();
});

document.querySelector('.clear').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.search-menu input').value = '';
    selected_destinations = destinations;
    updatedDestinationsDisplay();
});

document.getElementById('sort').addEventListener('change', function(event) {
    updatedDestinationsDisplay();
});

document.querySelector('.item-count-button').addEventListener('click', function(event) {
    event.preventDefault();
    calculateTotalPrice();
});

document.querySelector('.create-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newDestination = createDestination();

    if (newDestination === null) {
        return;
    }

    if (edited_destination_id === null) {
        destinations = [newDestination, ...destinations];
        selected_destinations = [newDestination, ...selected_destinations];
    }
    else {
        newDestination.img = selected_destinations[edited_destination_id].img;
        selected_destinations[edited_destination_id] = newDestination;
        edited_destination_id = null;
    }

    addDestinationsToPage(selected_destinations);
    document.querySelector('.overlay').classList.remove('target');
    updatedDestinationsDisplay();

    // Reset the form inputs and textarea
    document.querySelector('.create-form').reset();

});

document.querySelector('.create-button').addEventListener('click', function(event) {
    document.querySelector('.overlay').classList.toggle('target');

    const inputs = document.querySelectorAll('.create-form input');
    const textarea = document.querySelector('.create-form textarea');

    inputs[0].value = '';
    inputs[1].value = '';
    textarea.value = '';
    edited_destination_id = null;
});

document.querySelector('.close').addEventListener('click', function(event) {
    document.querySelector('.overlay').classList.remove('target');
});

// Initial load
addDestinationsToPage(selected_destinations);