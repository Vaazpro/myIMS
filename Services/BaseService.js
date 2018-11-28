//import { AsyncStorage } from "react-native"
import {SecureStore} from 'expo';

class BaseService {

    apiURL = 'http://ims-demoipvc.sparkleit.pt/api/v1/'
    tokenKey = 'access_token'

    constructor(){
        this.state = {
            obj: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            }
        }
    }

    postAPI = (url, body, callback) =>{
        this.state.obj.method = "POST"
        this.state.obj.body = JSON.stringify(body)

        this.retrieveToken().then((token) => {
            if(token !== null){
                this.state.obj.headers.Authorization = token.token_Type + " " + token.access_token
            }

            fetch(this.apiURL+url, this.state.obj)
                .then(function(response){
                    return response.json()
                })
                .then(function(json){
                    callback({success:true, data:json})
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message)
                    throw error
                });
        }).catch((error) => {
            callback({success:false, data:error})
        }); 
    }
    getAPI = (url, callback) =>{

        this.state.obj.method = "GET"
        this.state.obj.body = undefined

        this.retrieveToken().then((token) => {
            if(token !== null){
                this.state.obj.headers.Authorization = token.token_Type + " " + token.access_token
            }

            fetch(this.apiURL+url, this.state.obj)
                .then(function(response){
                    return response.json()
                })
                .then(function(json){
                    callback({success:true, data:json})
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message)
                    throw error
                });
        }).catch((error) => {
            callback({success:false, data:error})
        }); 
    }


    storeToken = async (token) => {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            //var jsonOfItem = await AsyncStorage.setItem(this.tokenKey, JSON.stringify(token));
            await SecureStore.setItemAsync(this.tokenKey, JSON.stringify(token));
        } catch (error) {
          console.log(error.message);
        }
      }

      async retrieveToken() {
        try {
          //const retrievedItem = await AsyncStorage.getItem(this.tokenKey);
          const retrievedItem = await SecureStore.getItemAsync(this.tokenKey);
          const item = JSON.parse(retrievedItem);
          return item;
        } catch (error) {
          console.log(error.message);
        }
        return
      }

}

export default BaseService