const loadPhones = async (name, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${name}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  // console.log(dataLimit);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = ``;

  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  const notFound = document.getElementById("not-found-messege");
  if (phones.length === 0) {
    notFound.classList.remove("hidden");
  } else {
    notFound.classList.add("hidden");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("phone");
    phoneDiv.innerHTML = `
        <div class="">
                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                
                <img class="rounded-t-lg mx-auto p-4" src="${phone.image}" alt=""/>
            
            <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">${phone.phone_name}</h5>
                <p class="text-gray-700 text-base mb-4">
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details</button>
            </div>
            </div>
        </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // searchField.value = "";
  loadPhones(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
  }
})

const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
})

const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found!'}</p>
  `
}

loadPhones('apple');