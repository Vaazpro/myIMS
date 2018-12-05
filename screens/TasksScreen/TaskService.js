import BaseService from '../../Services/BaseService'

class TaskService extends BaseService {

        constructor(){
            super();
        }
        
        getMyTasks = (callback, callbackError) =>{
            this.getAPI("mytask/find", function(tasks){
                callback(tasks)
            }, callbackError)
        }
    }
export default TaskService