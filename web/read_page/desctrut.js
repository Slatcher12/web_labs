const person = {
    name: 'Nazar',
    age: '18',
    city: 'Lviv'
};

const { name: firstName, ...rest } = person;

console.log(name);
console.log(rest);

