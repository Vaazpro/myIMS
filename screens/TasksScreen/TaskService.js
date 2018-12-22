import BaseService from '../../Services/BaseService'

class TaskService extends BaseService {

        constructor(){
            super();
        }
        
        getMyTasks = (callback, callbackError) =>{
            this.getAPI('mytask/find?showUserStories=true&limit=5&all=false', function(tasks){
                callback(tasks)
            }, callbackError)
        }

        updateTask = (task, newState, callback, callbackError ) => {
            var body ={
                id: task.id,
                newI: 0,
                oldI: 0,
                rowVersion: task.rowVersion,
                state: newState,
                type: "USERSTORIE"
            }
            this.putAPI('mytask/'+ task.id, body, function(data){
                callback(data)
            },function(error){
                callbackError(error)
            })
        }
    }
export default TaskService