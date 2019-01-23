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
        
        getFilteredMyTasks = (filters, callback, callbackError) =>{
           var url = "mytask/find?showUserStories=true&limit=5"

            if(filters.projetos.length > 0){
                filters.projetos.forEach(projeto => {
                    url += ("&projects=" + projeto) 
                });
            }
            if(filters.entregas.length > 0){
                filters.entregas.forEach(entrega => {
                    url += ("&releases=" + entrega) 
                });
            }
            if(filters.datas.length > 0){
                url += ("&start=" + data[0] + "&end=" + data[1])
            }
            if(filters.tipos.length > 0){
                filters.tipos.forEach(tipo => {
                    url += ("&type=" + tipo) 
                });
            }
            if(filters.estados.length > 0){
                filters.estados.forEach(estado => {
                    url += ("&state=" + estado) 
                });
            }
            if(filters.recursos.length > 0){
                filters.recursos.forEach(recurso => {
                    url += ("&people=" + recurso) 
                });
            }
            if(filters.tectipos.length > 0){
                filters.tectipos.forEach(tectipo => {
                    url += ("&technicianType=" + tectipo) 
                });
            }
            if(filters.equipas.length > 0){
                filters.equipas.forEach(equipa => {
                    url += ("&teams=" + equipa) 
                });
            }

            this.getAPI(url, function(tasks){
                callback(tasks)
            }, callbackError)
        }
    }

export default TaskService