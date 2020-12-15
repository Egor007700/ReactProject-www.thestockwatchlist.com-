import {post , put , get , del} from './index';

const signupPath = 'api/register';
const signinPath = 'api/login';
const getsymbolPath = 'api/getsymbollist'
const getsectorPath = 'api/getsector'
const savewatchlistPath = 'api/importwatchlist'
const deletewatchlistPath = 'api/deletewatchlist'
const updatewatchlistPath = 'api/updatewatchlist'
const getwatchlistPath = 'api/getwatchlist'
const changeviewstatusPath = 'api/changeviewstatus'
const globalwatchlistPath = 'api/globalwatchlist'
const getcurrentstockpricePath = 'api/currentprice'
const savewatchlisttemplatePath = 'api/importwatchlisttemplate'
const getwatchlisttemplatePath = 'api/getwatchlisttemplate'
const updatewatchlisttemplatePath = 'api/updatewatchlisttemplate'

export function signup(data){
    return new Promise((resolve,reject) =>
        post(signupPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function signin(data){
    return new Promise((resolve,reject) =>
        post(signinPath, data, false).then((resp) => {
            resolve(resp);
       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getsymbol(data){
    return new Promise((resolve,reject) =>
        post(getsymbolPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getsector(data){
    return new Promise((resolve,reject) =>
        post(getsectorPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getcurrentstockprice(data){
    return new Promise((resolve,reject) =>
        post(getcurrentstockpricePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function saveWatchlist(data){
    return new Promise((resolve,reject) =>
        post(savewatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function updateWatchlist(data){
    return new Promise((resolve,reject) =>
        post(updatewatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function deleteWatchlist(data){
    return new Promise((resolve,reject) =>
        post(deletewatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getWatchlist(data){
    return new Promise((resolve,reject) =>
        post(getwatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function changeViewStatus(data){
    return new Promise((resolve,reject) =>
        post(changeviewstatusPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function globalWatchlist(data){
    return new Promise((resolve,reject) =>
        post(globalwatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function savewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(savewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getwatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(getwatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function updatewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(updatewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}