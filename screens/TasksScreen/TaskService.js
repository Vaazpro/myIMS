import BaseService from '../../Services/BaseService'

class TaskService extends BaseService {

        constructor(){
            super();
        }
        
        getMyTasks = (callback, callbackError) =>{
            this.getAPI('MyTask/find?showUserStories=true&limit=5&all=false', function(tasks){
                callback(tasks)
            }, callbackError)
        }
    }
export default TaskService