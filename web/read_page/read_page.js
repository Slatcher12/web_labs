let selected_order_by = '';
let selected_search_term = '';
let selected_destinations = [];
let edited_destination_id = null;


function getDestinations() {
    let url = `http://127.0.0.1:8000/destinations?`;
    if (selected_search_term !== '') {
        url += `&search=${selected_search_term}`;
    }
    if (selected_order_by !== '') {
        url += `&order_by=${selected_order_by}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            selected_destinations = data;
            addDestinationsToPage(selected_destinations)
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function postDestination(destination) {
    fetch('http://127.0.0.1:8000/destinations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(destination)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            getDestinations();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function deleteDestination(destinationId) {
    fetch(`http://127.0.0.1:8000/destinations/${destinationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            console.log('Destination deleted');
            getDestinations(); // Refresh the list of destinations
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function fetchUpdateDestination(destinationId, updatedDestination) {
    fetch(`http://127.0.0.1:8000/destinations/${destinationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDestination)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            getDestinations(); // Refresh the list of destinations
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function getTotalPrice() {
    const destinationIds = selected_destinations.map(destination => destination.destination_id);
    const url = `http://127.0.0.1:8000/destinations/sum_total?destination_ids=${destinationIds.join('&destination_ids=')}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('total_price').textContent = `${data.total_price} $`;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const interval = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (interval > 1) {
        return `updated ${interval} hours ${minutes} minutes ago`;
    } else if (interval === 1) {
        return `updated 1 hour ${minutes} minutes ago`;
    } else {
        return `updated ${minutes} minutes ago`;
    }
}

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

        clone.querySelector('.avatar').style.backgroundImage = `url(${destination.picture})`;
        clone.querySelector('.name').textContent = destination.name;
        clone.querySelector('.description').textContent = destination.description;
        clone.querySelector('.updated-at').textContent = timeSince(destination.updated_at);
        clone.querySelector('.price').textContent = `${destination.price}$`;
        itemsWrapper.appendChild(clone);
    });

    addRemoveEventListeners();
    addEditEventListeners();
}


function removeDestination(destinationName) {
    const destinationToDelete = selected_destinations.find(destination => destination.name === destinationName);
    if (destinationToDelete) {
        deleteDestination(destinationToDelete['destination_id']);
    }
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
        inputs[2].value = destination.picture
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
    selected_search_term = document.querySelector('.search-menu input').value.trim();
    selected_order_by = document.getElementById('sort').value;
    if (selected_order_by === 'Choose one...') {
        selected_order_by = "";
    }
}

function createDestination() {
    const inputsData = document.querySelectorAll('.create-form input');
    const textareaData = document.querySelector('.create-form textarea').value;
    const inputValues = Array.from(inputsData).map(input => input.value);

    if (inputValues.some(value => value.trim() === '') || textareaData.trim() === '') {
        document.querySelector('.error').innerHTML = 'All fields must be filled out';
        return null;
    }

    if (selected_destinations.some(destination => destination.name === inputValues[0]) && edited_destination_id === null) {
        document.querySelector('.error').innerHTML = 'name should be unique';
        return null;
    }

    document.querySelector('.error').innerHTML = '';

    const currentDate = new Date();
    const isoDate = currentDate.toISOString()

     return {
        "name": inputValues[0],
        "description": textareaData,
        "updated_at": isoDate,
        "picture": inputValues[2],
        "price": Number(inputValues[1])
    }
}

// Event listeners
document.querySelector('.search-menu form').addEventListener('submit', function(event) {
    event.preventDefault();
    updatedDestinationsDisplay();
    getDestinations();
});

document.querySelector('.clear').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.search-menu input').value = '';
    selected_search_term = ''
    getDestinations();
    updatedDestinationsDisplay();
});

document.getElementById('sort').addEventListener('change', function(event) {
    event.preventDefault()
    updatedDestinationsDisplay();
    getDestinations();
});

document.querySelector('.item-count-button').addEventListener('click', function(event) {
    event.preventDefault();
    getTotalPrice();
});

document.querySelector('.create-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newDestination = createDestination();
    if (newDestination === null) {
        return;
    }

    if (edited_destination_id !== null) {
        fetchUpdateDestination(selected_destinations[edited_destination_id]['destination_id'], newDestination)
        edited_destination_id = null
    }
    else {
        postDestination(newDestination);
    }

    addDestinationsToPage(selected_destinations);
    document.querySelector('.overlay').classList.remove('target');
    updatedDestinationsDisplay();

    // Reset the form inputs and textarea
    document.querySelector('.create-form').reset();

});

document.querySelector('.create-button').addEventListener('click', function(event) {
    event.preventDefault()
    document.querySelector('.overlay').classList.toggle('target');

    const inputs = document.querySelectorAll('.create-form input');
    const textarea = document.querySelector('.create-form textarea');

    inputs[0].value = '';
    inputs[1].value = '';
    textarea.value = '';
    edited_destination_id = null;
});

document.querySelector('.close').addEventListener('click', function(event) {
    event.preventDefault()
    document.querySelector('.overlay').classList.remove('target');
});

// Initial load
getDestinations()