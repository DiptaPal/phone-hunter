const spinner = document.getElementById('spinner');
const loadPhones = async(name, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${name}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data, dataLimit);
    }
    catch(error){
        console.log(error);
    }
}
const displayPhone = (phones, dataLimit) =>{
    const searchResultNumber = document.getElementById('search-result-number');
    const warningInfo = document.getElementById('waring-info');
    const searchInfo = document.getElementById('search-info'); 
    if(dataLimit && phones.length > 20){
        searchResultNumber.innerText = phones.length;
        searchInfo.classList.remove('hidden');
        warningInfo.classList.add('hidden');

        //display 20 phones only
        phones = phones.slice(0,20);
    }
    else{
        searchInfo.classList.add('hidden');
        if(phones.length === 0){
            warningInfo.classList.remove('hidden');
        }
        else{
            warningInfo.classList.add('hidden');
        }
    }
    const phoneContainer = document.getElementById('phone-card');
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('flex', 'justify-center');
        phoneCard.innerHTML = `
        <div class="rounded-lg drop-shadow-2xl bg-white" style="width: 22rem;">
            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light" class="flex justify-center p-6">
                <img class="rounded-t-lg w-fit" src="${phone.image}" alt=""/>
            </a>
            <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">${phone.phone_name}</h5>
                <p class="text-gray-700 text-base mb-4">
                    ${phone.brand}
                 </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class=" inline-block px-6 py-2.5 bg-amber-500 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#phoneModalCenteredScrollabe">View Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard); 
    });
    //stop loader
    spinnerDisplay(false);
}
const searchPhone = () =>{
    processSearch(20);
}

const spinnerDisplay = isDisply =>{
    const spinner = document.getElementById('spinner');
    if(isDisply){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}
const processSearch = (dataLimit) =>{
    //start loader
    spinnerDisplay(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('view-all').addEventListener('click',function(){
    processSearch();
});

document.getElementById('search-field').addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        processSearch(10);
    }
});

const loadPhoneDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) =>{
    const phoneTitle = document.getElementById('phoneModalCenteredScrollabeLabel');
    phoneTitle.innerText = phone.name;
    const table = document.getElementById('table');
    table.innerHTML = '';
    const tbody = document.createElement('tbody');
    tbody.innerHTML = `
        <tr class="border-b border-neutral-400 bg-evenRow">
            <td class="px-6 py-4 font-medium" colspan="2">
                <img src="${phone.image}" class="border w-fit m-auto rounded-2xl">
            </td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white text-center">
            <td class="py-4 font-medium text-3xl underline" colspan="2">Full Specifications</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >Release Date</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.releaseDate}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white text-center">
            <td class="py-4 text-2xl font-extrabold text-gray-900" colspan="2">Performance</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400">Chipset</td>
            <td class="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-900">${phone.mainFeatures.chipSet}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >RAM</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.mainFeatures.memory}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow text-center">
            <td class="py-4 text-2xl font-extrabold text-gray-900" colspan="2">Storage</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >ROM</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.mainFeatures.storage}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow text-center">
            <td class="py-4 text-2xl font-extrabold text-gray-900" colspan="2">Display</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >USB</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.mainFeatures.displaySize}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow text-center">
            <td class="py-4 text-2xl font-extrabold text-gray-900" colspan="2">Connectivity</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >WLAN</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.others?.WLAN ? phone.others.WLAN : "Not found"}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >Bluetooth</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.others?.Bluetooth ? phone.others.Bluetooth : "Not found"}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >GPS</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.others?.GPS ? phone.others.GPS : "Not found"}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >NFC</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.others?.NFC ? phone.others.NFC : "Not found"}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >Radio</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.others?.Radio ? phone.others.Radio : "Not found"}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow text-center">
            <td class="py-4 text-2xl font-extrabold text-gray-900" colspan="2">Others</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-white">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >Sensors</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.mainFeatures?.sensors ? phone.mainFeatures.sensors.join(", ") : "Not found"}</td>
        </tr>
        <tr class="border-b border-neutral-400 bg-evenRow">
            <td class="px-6 py-4 text-base font-semibold text-gray-900 border-r border-neutral-400" >Manufactured By</td>
            <td class="px-6 py-4 text-base font-semibold text-gray-900">${phone.brand}</td>
        </tr>
    `
    table.appendChild(tbody);
}
loadPhones('apple',20);