import BaseService from '../../Services/BaseService'

class ProfileService extends BaseService {

        constructor(){
            super();
        }
        
       
        getProfile = (callback) =>{       
            //var profile = await this.retrieveItem(this.getProfileKey())
            let self = this
            this.retrieveItem(this.getProfileKey())
            .then(function(profile){
                self.getAPI("Employee/getbyuserid/"+ profile.id, 
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                })
            })
        }

        getAccount = (callback) => {
            
            this.retrieveItem(this.getProfileKey())
            .then(function(account){
                callback(account)
            })
        }

    }
export default ProfileService