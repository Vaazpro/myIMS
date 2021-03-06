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
                //console.log(error)
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
        this.getAPI("Team/getteamsbyotheremployeeid/" + profileId,
            function(data){
                callback(data)
            },
            function(error){
                //console.log(error)
            }
        )
    }

    //Para buscar as datas do Plano de férias
    getVacationsPlan = (profileId, callback) => {
        this.getAPI("VacationsPlan/byemployee/" + profileId,
            function(data){
                callback(data)
            },
            function(error){
                //console.log(error)
            }
        )
    }

    getVacations = (employeeID, startDate, endDate, planID, callback) => {
        this.getAPI('Vacation/findbycriteria?state=STATE&dateFrom=' + startDate + '&dateTo=' + endDate + '&employeeId=' +
            employeeID + '&vacationsPlanId=' + planID,
            function(data){
                callback(data)
            },
            function(error){
                //console.log(error)
            }
        )
    }

    getAttendanceByEmployeeId = (employee, admissionDate, callback) => {
        let date = new Date()
        date.setHours(23,59,59,999)
        this.getAPI("attendance/findbycriteria?dateFrom="+ admissionDate +"&dateTo="+ date.toISOString() +"&employeeId=" + employee.id + "&userId=" + employee.userId,
            function(data){
                callback(data)
            },
            function(error){
                //console.log(error)
            }
        )
    }

    getEmployeeFunction = (employeeID, callback, callbackError) =>{
        this.getAPI("Function/functionsbyemployee/"+employeeID,
        function(data){
            callback(data)
        },
        function(err){
            callbackError(err)
        })
    }

    postVacationRequest = (plan, dateFrom, dateTo, employeeID, callback) => {
        let rightPlan = null

        plan.forEach(element => {
            var dateStart = new Date(element.dateStart)
            var dateEnd = new Date(element.dateEnd)

            if(dateStart.getTime() <= new Date(dateFrom).getTime() && dateEnd.getTime() >= new Date(dateTo).getTime()){
                rightPlan = element
            }
        })

        let body = {
            allDay: true,
            dateFrom: dateFrom,
            dateTo: dateTo,
            employeeId: employeeID,
            max: rightPlan.dateEnd,
            min: rightPlan.dateStart,
            notes: "-",
            vacationsPlanId: rightPlan.id
        }
        this.postAPI("vacation", body,
        function(data){
            callback(data)
        },
        function(error){
            console.log(error)
        })
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
            callback(error)
        })
    }

    getAbsenceByEmployeeId = (employeeId, admissionDate, callback) => {
        this.getAPI("absence/findbycriteria?dateFrom="+ admissionDate +"&dateTo="+ new Date().toISOString() + "&employeeId=" + employeeId,
            function(data){
                callback(data)
            },
            function(error){
                //console.log(error)
            }
        )
    }
}

export default ProfileService