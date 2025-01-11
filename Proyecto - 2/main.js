let brand = 'toyota',
    speed = 200,
    stock = 3,
    models = ['allion', 'vitz', 'corolla'];

const phrase = `We have ${brand} branch and it maximum speed is ${speed}, in stock we have ${stock} of the following models:  <br/> `;

const cars = document.querySelector('.cars');

const p = document.createElement('p');

p.innerHTML   = phrase;

models.forEach( model => {
    p.innerHTML   += `- ${model} <br/> `
})

cars.appendChild(p);


