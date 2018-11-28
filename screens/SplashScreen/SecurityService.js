import BaseService from '../../Services/BaseService'

class SecurityService extends BaseService {

        constructor(){
            super();
        }
        
        login = (email, password, callback, callbackError) =>{
            let self = this
            this.postAPI("Account/token", {"email" : email, "password" : password, "isLocalAccount" : true}, function(response){
                //store token in localstorage
                self.storeItem(self.getTokenKey(), response)
                self.getAPI("account/profile", function(profile){
                    //store profile in localstorage
                    self.storeItem(self.getProfileKey(), profile)
                    callback(profile)
                }, callbackError)
            }, callbackError)
        }

        logout = (key) => {
            this.deleteItem(this.getTokenKey())
            this.deleteItem(this.getProfileKey())
        }
    }
export default SecurityService