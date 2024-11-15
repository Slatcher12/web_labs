    const destinations = [
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
}

function filterDestinations(searchTerm) {
    return destinations.filter(destination =>
        destination.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
        destination.description.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
}

function calculateTotalPrice() {
    const totalPrice = selected_destinations.reduce((sum, destination) => sum + destination.price, 0);
    document.getElementById('total_price').textContent = `${totalPrice.toString()} $`;
}

function sortByCategory(sortBy) {
    if (sortBy === 'Price') {
        return selected_destinations.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Name') {
        return selected_destinations.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
}

//Event listeners
document.querySelector('.search-menu form').addEventListener('submit', function(event) {
    event.preventDefault();
    let filteredDestinations;
    const searchTerm = event.target.querySelector('input').value;
    if (searchTerm !== '') {
        filteredDestinations = filterDestinations(searchTerm);
        selected_destinations = filteredDestinations;
    }
    else {
        selected_destinations = destinations;
        filteredDestinations = destinations;
    }

    const selected_value = document.getElementById('sort').value
    if (selected_value !== 'Choose one...') {
        addDestinationsToPage(sortByCategory(selected_value))
    }
    else {
        addDestinationsToPage(filteredDestinations);
    }
});

document.querySelector('.clear').addEventListener('click', function(event) {
    event.preventDefault()
    document.querySelector('.search-menu input').value = '';
    selected_destinations = destinations;


    const selected_value = document.getElementById('sort').value
    if (selected_value !== 'Choose one...') {
        addDestinationsToPage(sortByCategory(selected_value))
    }
    else {
        addDestinationsToPage(destinations);
    }

});

document.getElementById('sort').addEventListener('change', function(event) {
    const sortBy = event.target.value;
    addDestinationsToPage(sortByCategory(sortBy));
});

document.querySelector('.item-count-button').addEventListener('click', function(event) {
    event.preventDefault();
    calculateTotalPrice();
});

//initial load
addDestinationsToPage(selected_destinations);