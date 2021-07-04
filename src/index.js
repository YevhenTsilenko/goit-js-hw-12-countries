import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countryCardTamplate from './templates/countryDescription.hbs';
import countryListTamplate from './templates/countryList.hbs';
import pnotify from './js/pnotify';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
const debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');


const refs = {
    input: document.querySelector('.text_input'),
    tplContainer: document.querySelector('.template_container'),
}


refs.input.addEventListener('input', debounce(onSearch, 500));


function onClick (e) {
   if(e.target.classList.contains('each_country_name')) {
    refs.input.value = e.target.textContent;
   }
   onSearch();
   refs.tplContainer.removeEventListener('click', onClick);
}



function onSearch (event) {
    refs.tplContainer.addEventListener('click', onClick);
    const searchQuery = refs.input.value.trim();
    refs.tplContainer.innerHTML = '';
    
    fetchCountries(searchQuery)
        .then(country => {
            
            if (country.status === 404) {
                error(error(pnotify.notFound));
                refs.tplContainer.innerHTML = '';
            }
            if(country.length > 10) {
                error(pnotify.foundMany);
                refs.tplContainer.innerHTML = '';
            }
               
            if(country.length > 1 && country.length <= 10) {
                renderCountryList(country);
            }
            
            if(country.length === 1) {
                renderCountryCard(country);
            } 
        });
}

function renderCountryCard(country) {
    const cardMarkup = countryCardTamplate(country);
    refs.tplContainer.innerHTML = cardMarkup;
}

function renderCountryList(country) {
    const listMarkup = countryListTamplate(country);
    refs.tplContainer.innerHTML = listMarkup;
}