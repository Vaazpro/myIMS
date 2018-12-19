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

        getTeamsByEmployeeId = (profileId,callback) => {
            //console.log(profileId)
            this.getAPI("Team/getteamsbyotheremployeeid/" + profileId,
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                }
            )
        }

        //Caso precisemos de saber o Plano de férias
       /*  getVacationsPlanByEmployeeId = (profileId, callback) => {
            this.getAPI("VacationsPlan/byemployee/" + profileId,
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                }
            )
        }
 */
        getVacations = (callback) => {
            this.getAPI("Vacation/findbycriteria?EmployeeId=f9ec4139-89c7-4656-afcc-c0fcabf90cb9",
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                }
            )
        }

        getAttendanceByEmployeeId = (employeeId, admissionDate, callback) => {
            console.log("DATE: " + new Date().toISOString())
            this.getAPI("attendance/findbycriteria?dateFrom="+ admissionDate +"&dateTo="+ new Date().toISOString() +"&employeeId=" + employeeId,
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                }
            )
        }

        getAbsenceByEmployeeId = (employeeId, callback) => {
            this.getAPI("Absence/findbycriteria?EmployeeId=" + employeeId,
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                }
            )
        }
    }
export default ProfileService