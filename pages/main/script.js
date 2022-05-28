const wrapper = document.querySelector('.slides-wrap');
const popup = document.querySelector('.overlay-modal');

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
    let pets = [];
    for (let i = 0; i < arr.length; i++) {
      pets.push(data[arr[i]]);
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
  });

//close popup
popup.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-modal-close') || event.target.classList.contains('overlay-modal')) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
})

//slider
const swiper = new Swiper('.slider', {
  navigation: {
    nextEl: '.our-friends__btn_right',
    prevEl: '.our-friends__btn_left',
  },
  slidesPerView: 1,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
    },
    1279: {
      slidesPerView: 3,
      spaceBetween: 90,
      slidesPerGroup: 3,
    },
  },
});

//buttons disabled
const btnRight = document.querySelector('.our-friends__btn_right');
const btnLeft = document.querySelector('.our-friends__btn_left');
let btnClickCount = 0;

btnRight.addEventListener('click', () => {
  btnClickCount++;
  if (btnClickCount > 0) {
    btnLeft.classList.remove('disabled');
  };
  if (btnClickCount === 14) {
    btnRight.classList.add('disabled');
  }
})
btnLeft.addEventListener('click', () => {
  btnClickCount--;
  if (btnClickCount === 0) {
    btnLeft.classList.add('disabled');
  };
  if (btnClickCount < 14) {
    btnRight.classList.remove('disabled');
  }
})

