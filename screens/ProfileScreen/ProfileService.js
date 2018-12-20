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

        getAttendanceByEmployeeId = (employee, admissionDate, callback) => {
            console.log(admissionDate)
            console.log(new Date().toISOString())
            console.log(employee.id)
            console.log(employee.userId)
            let date = new Date()
            date.setHours(23,59,59,999)
            this.getAPI("attendance/findbycriteria?dateFrom="+ admissionDate +"&dateTo="+ date.toISOString() +"&employeeId=" + employee.id + "&userId=" + employee.userId,
                function(data){
                    callback(data)
                },
                function(error){
                    console.log(error)
                }
            )
        }

        updateAttendanceByProfileId = (profileId, callback) => {
            let date = new Date().toISOString()
            let body = {
                "presences": [
                    {
                    "hour": date,
                    }
                ],
                "absences": [],
                "date": date,
                "employeeId": profileId
            };

            this.postAPI("absence/add", body, 
            function(data){
                callback(data)
            },
            function(error){
                alert(error)
            })
        }

        getAbsenceByEmployeeId = (employeeId, admissionDate, callback) => {
            this.getAPI("absence/findbycriteria?dateFrom="+ admissionDate +"&dateTo="+ new Date().toISOString() + "&employeeId=" + employeeId,
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