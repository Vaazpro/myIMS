import { AsyncStorage } from "react-native"

class BaseService {

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

apiURL = 'http://ims-demoipvc.sparkleit.pt/api/v1/'

tokenKey = 'access_token'

    postAPI = async (url, body) =>{
        this.state.obj.body = JSON.stringify(body)
        this.state.obj.method = 'POST'
        //console.log(this.state.obj)
        var token = await this.retrieveToken()
        console.log(token)
        if(token !== null){
            this.state.obj.headers.Authorization = token.token_Type + " " + token.access_token
        }
       return fetch(this.apiURL+url, this.state.obj)
       .then(function(response){
           //console.log(response)
            return response.json()
        })
        .then(function(json){
            return json
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
            // ADD THIS THROW error
                throw error
            });
        }

    getAPI = (url, body) =>{
        this.state.obj.body = JSON.stringify(body)
        this.state.obj.method = 'GET'
        var token = this.retrieveToken()

        if(token !== null){
            this.obj.headers.Authorization = token.token_Type + " " + token.access_token
        }
        console.log(this.state.obj)
       return (fetch(this.apiURL+url, this.state.obj))
        .then(function(response){
            console.log(response)
            return response.json()
        })
        .then(function(json){
            return json
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
            // ADD THIS THROW error
                throw error
        });
    }

    storeToken = async (token) => {
        try {
            console.log("TOKEN ----> " + token)
          await AsyncStorage.setItem(this.tokenKey, token);
        } catch (error) {
            console.log(error.message)
          // Error saving data
        }
      }

    retrieveToken = async () => {
        try {
          return await AsyncStorage.getItem(this.tokenKey);
         } catch (error) {
           return null
         }
      }

}

export default BaseService