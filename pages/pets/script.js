const wrapper = document.querySelector('.content-wrap');
const popup = document.querySelector('.overlay-modal');
let pets = [];

fetch('../../assets/scripts/pets.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      let set = new Set();
      while (set.size < 8) {
        set.add(Math.floor(Math.random() * 8));
      }
      arr.push(Array.from(set));
    }
    arr = arr.flat();
    for (let i = 0; i < arr.length; i++) {
      pets.push(data[arr[i]]);
    }
    createPets(pets.slice(0, 8));
  });


function createPets(pets) {
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
  pets.forEach(petItem => {
    let { name, img, type, breed, description, age, inoculations, diseases, parasites } = petItem;
    let pet = document.createElement('div');
    pet.classList.add('pet');
    pet.classList.add('swiper-slide');
    pet.innerHTML = `
        <img src="${img}" alt="cat" class="pet__photo" width="270" height="270">
        <p class="pet__name">${name}</p>
        <a href="" class="btn btn_outline">Learn more</a>
      `;
    wrapper.appendChild(pet);
    pet.addEventListener('click', (event) => {
      event.preventDefault();

      let petName = pet.querySelector('.pet__name').innerText;

      if (petName === name) {
        popup.innerHTML = `
              <div class="modal">
                <button class="btn-modal-close"></button>
                <div class="modal__img">
                  <img src="${img}" alt="Jennifer">
                </div>
                <div class="modal__content">
                  <h3 class="modal__title">${name}</h3>
                  <p class="modal__subtitle">${type} - ${breed}</p>
                  <p class="modal__description">
                    ${description}
                  </p>
                  <ul class="modal__list">
                    <li class="modal__item"><b>Age:</b> ${age}</li>
                    <li class="modal__item"><b>Inoculations:</b> ${inoculations}</li>
                    <li class="modal__item"><b>Diseases:</b> ${diseases}</li>
                    <li class="modal__item"><b>Parasites:</b> ${parasites}</li>
                  </ul>
                </div>
              </div>
            `;
      }

      popup.style.display = 'flex';
      popup.style.top = `${scrollY}px`;
      document.body.style.overflow = 'hidden';
    })
  })
}

popup.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-modal-close') || event.target.classList.contains('overlay-modal')) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
})

const btnRight = document.querySelector('.next');
const btnLeft = document.querySelector('.back');
const btnStart = document.querySelector('.start');
const btnEnd = document.querySelector('.end');
let btnClickCount = 0;
const pageNumber = document.querySelector('.page-number');

btnRight.addEventListener('click', () => {
  btnClickCount++;
  pageNumber.innerText = btnClickCount + 1;
  if (btnClickCount > 0) {
    btnLeft.classList.remove('disabled');
    btnStart.classList.remove('disabled');
  };
  switch (btnClickCount) {
    case 0:
      createPets(pets.slice(0, 8));
      break;
    case 1:
      createPets(pets.slice(8, 16));
      break;
    case 2:
      createPets(pets.slice(16, 24));
      break;
    case 3:
      createPets(pets.slice(24, 32));
      break;
    case 4:
      createPets(pets.slice(32, 40));
      break;
    case 5:
      createPets(pets.slice(40));
      btnRight.classList.add('disabled');
      btnEnd.classList.add('disabled');
      break;
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})
btnLeft.addEventListener('click', () => {
  btnClickCount--;
  pageNumber.innerText = btnClickCount + 1;
  if (btnClickCount < 5) {
    btnRight.classList.remove('disabled');
    btnEnd.classList.remove('disabled');
  }
  switch (btnClickCount) {
    case 0:
      createPets(pets.slice(0, 8));
      btnLeft.classList.add('disabled');
      btnStart.classList.add('disabled');
      break;
    case 1:
      createPets(pets.slice(8, 16));
      break;
    case 2:
      createPets(pets.slice(16, 24));
      break;
    case 3:
      createPets(pets.slice(24, 32));
      break;
    case 4:
      createPets(pets.slice(32, 40));
      break;
    case 5:
      createPets(pets.slice(40));
      break;
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})
btnStart.addEventListener('click', () => {
  createPets(pets.slice(0, 8));
  pageNumber.innerText = 1;
  btnLeft.classList.add('disabled');
  btnStart.classList.add('disabled');
  btnRight.classList.remove('disabled');
  btnEnd.classList.remove('disabled');
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})
btnEnd.addEventListener('click', () => {
  pageNumber.innerText = 6;
  createPets(pets.slice(40));
  btnRight.classList.add('disabled');
  btnEnd.classList.add('disabled');
  btnLeft.classList.remove('disabled');
  btnStart.classList.remove('disabled');
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})