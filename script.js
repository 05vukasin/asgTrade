document.addEventListener('DOMContentLoaded', () => {
    fetch('baza.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const shopSection = document.getElementById('shop');

            products.forEach((product, index) => {
                // Kreiranje kartice
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-index', index);

                // Dodavanje slike
                const img = document.createElement('img');
                img.src = product.image ? product.image : 'https://via.placeholder.com/300x200';
                img.alt = product.title || "Product Image";
                card.appendChild(img);

                // Dodavanje naslova
                const title = document.createElement('h2');
                title.textContent = product.title;
                card.appendChild(title);

                // Dodavanje opisa
                /*const description = document.createElement('p');
                description.textContent = product.description;
                card.appendChild(description);*/

                // Dodavanje cene
                const price = document.createElement('p');
                price.textContent = `${product.price} RSD`;
                card.appendChild(price);

                // Dodavanje oznake "Sold Out" ako je proizvod rasprodat
                if (product.soldOut) {
                    const soldOutLabel = document.createElement('h1');
                    soldOutLabel.classList.add('sold-out');
                    soldOutLabel.id = 'soldOut';
                    soldOutLabel.textContent = 'Sold Out';
                    card.appendChild(soldOutLabel);
                } else {
                    // Dodavanje dugmeta
                    const btnContainer = document.createElement('div');
                    btnContainer.classList.add('proizvod-btn');

                    const button = document.createElement('button');
                    button.textContent = 'Buy Now';
                    btnContainer.appendChild(button);
                    card.appendChild(btnContainer);

                    // Dodavanje event listener-a za klik na karticu
                    card.addEventListener('click', () => {
                        localStorage.setItem('selectedProduct', JSON.stringify(product));
                        window.location.href = 'proizvod.html';
                    });
                }

                // Dodavanje kartice u sekciju
                shopSection.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching the products:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
        document.getElementById('naslov').textContent = product.title;
        document.getElementById('cena').textContent = `${product.price} RSD`;
        document.getElementById('opis').textContent = product.description;

        // Prikazivanje ili sakrivanje "Sold Out" oznake
        if (product.soldOut) {
            document.getElementById('soldOut').style.display = 'block';
        } else {
            document.getElementById('soldOut').style.display = 'none';
        }

        // Učitaj slike za slajder
        const slajderDiv = document.getElementById('slajder');
        slajderDiv.innerHTML = ''; // Čistimo sadržaj slajdera

        product.slajder.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = product.title || 'Proizvod';
            if (index === 0) {
                img.classList.add('active'); // Prva slika je aktivna
            }
            slajderDiv.appendChild(img);
        });

        // Dodavanje funkcionalnosti za slajder
        let currentIndex = 0;
        const images = slajderDiv.querySelectorAll('img');

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000); // Promena slike svakih 3 sekunde
    } else {
        console.error('No product data found in localStorage');
    }
});

function openPopup() {
    const modal = document.getElementById('popup');
    modal.style.display = 'block';
    document.body.classList.add('modal-open'); // Dodavanje klase modal-open na body
}

function closePopup() {
    const modal = document.getElementById('popup');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Uklanjanje klase modal-open sa body
}

window.onclick = function(event) {
    const modal = document.getElementById('popup');
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Uklanjanje klase modal-open sa body
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Selektovanje dugmadi za veličinu
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // Selektovanje dugmadi za boje
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
});


//NAVBAR---------------------------------------------//

document.getElementById('menuToggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

document.getElementById('closeMenu').addEventListener('click', () => {
    closeMenu();
});

document.addEventListener('click', (event) => {
    const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenuBtn = document.getElementById('closeMenu');
    const isClickInsideMenu = menu.contains(event.target);
    const isClickInsideToggle = menuToggle.contains(event.target);
    const isClickInsideClose = closeMenuBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickInsideToggle && !isClickInsideClose && menu.classList.contains('open')) {
        closeMenu();
    }
});

function openMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'flex';
    menu.style.right = '-250px'; // Postavljanje početnog stanja izvan ekrana
    requestAnimationFrame(() => {
        menu.classList.remove('closed');
        menu.classList.add('open');
        menu.style.right = '0'; // Postavljanje krajnjeg stanja za animaciju
    });
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('open');
    menu.classList.add('closed');
    menu.style.right = '-250px'; // Postavljanje krajnjeg stanja za animaciju
    setTimeout(() => {
        menu.style.display = 'none';
    }, 500); // Usklađeno sa trajanjem tranzicije
}



//PORUDZBINE ----------------------------//




document.addEventListener('DOMContentLoaded', () => {
    // Inicijalizacija EmailJS
    emailjs.init('Ee0Kc-qnbQuxx1sme');

    // Dodavanje event listenera za dugme "Buy Now"
    const buyNowButton = document.getElementById('popup-buy-now');
    buyNowButton.addEventListener('click', sendEmail);
});

function sendEmail(event) {
    event.preventDefault(); // Sprečavanje podrazumevanog ponašanja dugmeta

    const productTitle = document.getElementById('naslov').textContent;
    const productPrice = document.getElementById('cena').textContent;
    const sizeButtons = document.querySelectorAll('.size-btn');
    let selectedSize = '';
    sizeButtons.forEach(button => {
        if (button.classList.contains('selected')) {
            selectedSize = button.textContent;
        }
    });

    const name = document.getElementById('popup-name').value;
    const phone = document.getElementById('popup-phone').value;
    const email = document.getElementById('popup-email').value;
    const address = document.getElementById('popup-address').value;

    // Provera da li su svi podaci popunjeni
    let missingFields = [];
    if (!productTitle) missingFields.push('Product Title');
    if (!productPrice) missingFields.push('Product Price');
    if (!selectedSize) missingFields.push('Velicina');
    if (!name) missingFields.push('Ime');
    if (!phone) missingFields.push('Telefon');
    if (!email) missingFields.push('Email');
    if (!address) missingFields.push('Addresa');

    if (missingFields.length > 0) {
        alert('Nedostaje: ' + missingFields.join(', '));
        return;
    }

    const templateParams = {
        product_title: productTitle,
        product_price: productPrice,
        selected_size: selectedSize,
        name: name,
        phone: phone,
        email: email,
        address: address
    };

    emailjs.send("service_y9h54vf","template_phihcqu", templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Vaša porudžbina je poslata.');
        }, (error) => {
            console.error('FAILED...', error);
            alert('Greška pri slanju porudžbine.');
        });
}
