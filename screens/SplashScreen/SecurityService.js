import BaseService from '../../Services/BaseService'

class SecurityService extends BaseService{

        constructor(){
            super();
        }

        login = () =>{
            //this.obj.body = body
        let self = this
        this.postAPI("Account/token", {"email" : "Administrator", "password" : "Adm!123", "isLocalAccount" : true}, function(response){
            if(response.success)
            {
                self.storeToken(response.data)
                self.getAPI("account/profile", function(profile){
                    console.log(profile)
                })
            }
            else
            {
                throw response.data
            }
        }) 
        }
    }
export default SecurityService