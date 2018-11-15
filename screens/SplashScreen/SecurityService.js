import BaseService from '../../Services/BaseService'

class SecurityService extends BaseService{

        constructor(){
            super();
        }

        login = () =>{
            //this.obj.body = body
           this.postAPI("Account/token", {"email" : "Administrator", "password" : "Adm!123", "isLocalAccount" : true}) 
           .then((data) => {
                /* console.log(data)
                console.warn(data) */
                this.storeToken(data);
                this.getAPI("Account/profile")
                .then(function(profile){
                    console.log(profile)
                })
                .catch(function(error){

                })
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
            })
        }
    }
export default SecurityService