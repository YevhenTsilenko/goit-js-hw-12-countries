import * as PNotifyMobile from '@pnotify/mobile/';
import * as PNotifyCountdown from '@pnotify/countdown';
import { defaultModules } from '@pnotify/core';

defaultModules.set(PNotifyMobile, {});

export default {
    found: {
        type: 'success',
        title: 'Country found',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    foundMany: {
        type: 'notice',
        title: 'Countries found on your request',
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },

    notFound: {
        type: 'error',
        title: 'Cant find a country',
        text: 'No matches found',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    
};