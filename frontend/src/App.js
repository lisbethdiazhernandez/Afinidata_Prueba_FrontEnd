import { render } from '@testing-library/react';
import React from 'react';
import './App.css'; 


class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        todoList:[],
        activeItem:{
          id:null, 
          name:'',
          state:false,
        },
        editing:false,
      }
      this.fetchTasks = this.fetchTasks.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)


      this.startEdit = this.startEdit.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
      this.strikeUnstrike = this.strikeUnstrike.bind(this)
  };

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/todo/todo-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList:data
      })
      )
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log('Name:', name)
    console.log('Value:', value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        name:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM:', this.state.activeItem)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/todo/todo-create/'

    if(this.state.editing == true){
      url = `http://127.0.0.1:8000/todo/todo-update/${ this.state.activeItem.id}/`
      this.setState({
        editing:false
      })
    }



    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response)  => {
        this.fetchTasks()
        this.setState({
           activeItem:{
           id:null, 
          name:'',
          state:false,
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(task){
    this.setState({
      activeItem:task,
      editing:true,
    })
  }


  deleteItem(task){
    var csrftoken = this.getCookie('csrftoken')

    fetch(`http://127.0.0.1:8000/todo/todo-delete/${task.id}/`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
    }).then((response) =>{

      this.fetchTasks()
    })
  }


  strikeUnstrike(task){
    
    task.state = !task.state
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/todo/todo-update/${task.id}/`

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({ 'name':task.name,'state': task.state })
      }).then(() => {
        this.fetchTasks()
      })

    console.log('TASK:', task.state)
  }


  render(){
    var tasks = this.state.todoList
    var self = this
    return(
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={this.handleChange} className="form-control" id="name" value={this.state.activeItem.name} type="text" name="name" placeholder="Add task.." />
                         </div>

                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" value="+ Add Task"/>
                          </div>
                      </div>
                </form>
             
              </div>

              <div  id="list-wrapper">         
                    {tasks.map(function(task, index){
                      return(
                          <div key={index} className="task-wrapper flex-wrapper">

                            <div onClick={() => self.strikeUnstrike(task)} style={{flex:7}}>

                                {task.state == false ? (
                                    <span className="task-wrapper flex-wrapper">✖︎{task.name}</span>

                                  ) : (

                                    <strike className="task2-wrapper flex-wrapper">✔︎{task.name}</strike>
                                  )}
  
                            </div>
                            <div style={{flex:1}}>
                                <button onClick={() => self.deleteItem(task)} className="btn btn-sm btn-outline-dark delete">Delete</button>
                            </div>

                          </div>
                        )
                    })}
              </div>
          </div>
          
        </div>
      )
  }
}



export default App;