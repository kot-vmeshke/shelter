function menu() {
  const btn = document.querySelector('.header__nav-btn');
  const nav = document.querySelector('.header__nav');
  const overlay = document.querySelector('.overlay');

  btn.addEventListener('click', () => {
    if (btn.classList.contains('js-opened')) {
      nav.style.transform = '';
      btn.style.transform = '';
      btn.classList.remove('js-opened');
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      btn.classList.add('js-opened');
      btn.style.transform = 'rotate(90deg)';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      nav.style.transform = 'translate(0, 0)';
    }
  })

  overlay.addEventListener('click', () => {
    btn.style.transform = '';
    nav.style.transform = '';
    nav.style.display = '';
    btn.classList.remove('js-opened');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  })
}
function showPopup() {

  const popup = document.querySelector('.overlay-modal');
  const pets = document.querySelectorAll('.pet');

  fetch('../../assets/scripts/pets.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach(petItem => {
        let { name, img, type, breed, description, age, inoculations, diseases, parasites } = petItem;
        pets.forEach(pet => {
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
      })
    });

  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-modal-close') || event.target.classList.contains('overlay-modal')) {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }
  })
}

//showPopup();
menu();