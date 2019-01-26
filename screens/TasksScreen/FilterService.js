import BaseService from '../../Services/BaseService'

class FilterService extends BaseService {

        constructor(){
            super();
        }

        //receber todos os projetos
        getAllProjects = (callback, callbackError) => {
            this.getAPI('project/projectsbyuserid', function(projects){
                callback(projects)
            }, callbackError)
        }

        getAllReleases = (callback, callbackError) => {
            this.getAPI('release/getreleasesbyprojects?showUserStories=true', function(releases){
                callback(releases)
            }, callbackError)
        }

        getAllTaskStates = (callback, callbackError) => {
            this.getAPI('mytask/find?showUserStories=true&limit=5', function(states){
                callback(states)
            }, callbackError)
        }

        getAllEmployees = (callback, callbackError) => {
            this.getAPI('employee/getemployees', function(employees){
                callback(employees)
            }, callbackError)
        }

        getTechnicianType = (callback, callbackError) => {
            this.getAPI('userfilter', function(techType){
                callback(techType)
            }, callbackError)
        }

        getAllTeams = (callback, callbackError) => {
            this.getAPI('team/getteams', function(teams){
                callback(teams)
            }, callbackError)
        }
    }
export default FilterService