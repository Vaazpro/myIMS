//import { AsyncStorage } from "react-native"
import {SecureStore} from 'expo';

class BaseService {

    constructor() {
        var _apiURL = 'http://ims-demoipvc.sparkleit.pt/api/v1/';
        var _tokenKey = 'access_token'
        var _profileKey = 'profile_key'
        var _acceptHeader = "application/json"
        var _contentTypeHeader = "application/json"

        //these functions are public but the variables are not
        this.getApiUrl = function() { return _apiURL; }
        this.getTokenKey = function() { return _tokenKey; }
        this.getProfileKey = function() { return _profileKey; }
        this.getAcceptHeader = function() { return _acceptHeader; }
        this.getContentTypeHeader = function() { return _contentTypeHeader; }
    } 


    postAPI = (url, body, callback, callbackError) =>{
        var _headers = {"Accept":this.getAcceptHeader(), "Content-Type":this.getContentTypeHeader()}
        var _obj = { headers:_headers, body:JSON.stringify(body), method: "POST" }
        var _apiUrl = this.getApiUrl()

        this.retrieveItem(this.getTokenKey()).then((token) => {
            if(token !== null){
                _obj.headers.Authorization = token.token_type + " " + token.access_token
            }
            fetch(_apiUrl + url, _obj)
                .then(function(response){ 
                    if(response.ok) 
                        return response.json()
                    throw response
                })
                .then(function(json){
                    callback(json)
                })
                .catch(function(error) {
                    callbackError(error)
                });
        }).catch((error) => {
            callbackError(error)
        }); 
    }

    putAPI = (url, body, callback, callbackError) =>{
        var _headers = {"Accept":this.getAcceptHeader(), "Content-Type":this.getContentTypeHeader()}
        var _obj = { headers:_headers, body:JSON.stringify(body), method: "PUT" }
        var _apiUrl = this.getApiUrl()

        this.retrieveItem(this.getTokenKey()).then((token) => {
            if(token !== null){
                _obj.headers.Authorization = token.token_type + " " + token.access_token
            }
            fetch(_apiUrl + url, _obj)
                .then(function(response){ 
                    if(response.ok) 
                        return response.json()
                    throw response
                })
                .then(function(json){
                    callback(json)
                })
                .catch(function(error) {
                    callbackError(error)
                });
        }).catch((error) => {
            callbackError(error)
        }); 
    }

    getAPI = (url, callback, callbackError) =>{
        var _headers = {"Accept":this.getAcceptHeader()}
        var _obj = { headers:_headers, method: "GET" }
        var _apiUrl = this.getApiUrl()

        this.retrieveItem(this.getTokenKey()).then((token) => {
            if(token !== null){
                _obj.headers.Authorization = token.token_type + " " + token.access_token
            }
            
            fetch(_apiUrl + url, _obj)
                .then(function(response){
                    if(response.ok) 
                        return response.json()
                    throw response
                })
                .then(function(json){
                    callback(json)
                })
                .catch(function(error) {
                    callbackError(error)
                });
        }).catch((error) => {
            callbackError(error)
        }); 
    }


    storeItem = async (key, token) => {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            //var jsonOfItem = await AsyncStorage.setItem(this.tokenKey, JSON.stringify(token));
            await SecureStore.setItemAsync(key, JSON.stringify(token));
        } catch (error) {
          console.log(error.message);
        }
      }

    retrieveItem = async (key) => {
        try {
          //const retrievedItem = await AsyncStorage.getItem(this.tokenKey);
          const retrievedItem = await SecureStore.getItemAsync(key);
          const item = JSON.parse(retrievedItem);
          return item;
        } catch (error) {
          console.log(error.message);
        }
        return
      }

      deleteItem = async (key) => {
        try {
          //const retrievedItem = await AsyncStorage.getItem(this.tokenKey);
          await SecureStore.deleteItemAsync(key);
        } catch (error) {
          console.log(error.message);
        }
        return
      }

}

export default BaseService