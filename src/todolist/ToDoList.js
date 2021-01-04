import React, { Component } from 'react';
// import './css/todolist.sass';


import { faCheckCircle, faUndoAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Table from './Table'
import TableTr from './TableTr'
import Form from './Form'




class ToDoList extends Component {
  state = {
    text: '',
    checkbox: false,
    date: '',
    tasks: [{
      name: 'zrobić zakupy',
      date: '01.02.2019',
      dateDone: '',
      important: true
    }],
    tasksDone: [{
      name: 'wyprasować koszule',
      date: '05.05.2020',
      dateDone: '06.06.2020',
      important: false
    }],
    error: "",

  }


  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ?
      target.checked : target.value;
    const name = target.type
    this.setState({ [name]: value })
  }
  //DATE
  dateConvert = () => {
    let date = this.state.date;
    if (date === '') return date = 'kiedykolwiek'
    const dateString = new Date(date);
    let day = dateString.getDate();
    let month = dateString.getMonth() + 1;
    let year = dateString.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return date = day + '.' + month + '.' + year;
  }

  addTask = () => {
    const text = this.state.text;
    const checkbox = this.state.checkbox;
    const date = this.dateConvert();
    if (text.trim() === '') return this.setState({ error: 'nie podano nazwy zadania' })
    let tasks = [...this.state.tasks]
    const task = { name: text, date: date, important: checkbox }
    tasks.push(task)
    this.setState({ tasks, text: '', checkbox: false, error: '' })
  }
  removeTask = (array, e) => {
    let tasks;
    if (array === 'tasks') tasks = [...this.state.tasks];
    else if (array === 'tasksDone') tasks = [...this.state.tasksDone];
    const index = e.target.id;
    tasks.splice(index, 1)
    this.setState({ [array]: tasks })
  }
  checkedTask = (e) => {
    let date = new Date();
    date = date.toLocaleString().substring(0, 10);

    let tasks = [...this.state.tasks];
    const index = e.target.id;
    const item = tasks.splice(index, 1)
    let tasksDone = [...this.state.tasksDone];
    item[0].dateDone = date;
    tasksDone.push(item[0])
    this.setState({ tasksDone, tasks })
  }

  undoTask = (e) => {
    let tasksDone = [...this.state.tasksDone];
    const index = e.target.id;
    const item = tasksDone.splice(index, 1)
    let tasks = [...this.state.tasks];
    tasks.push(item[0])
    this.setState({ tasks, tasksDone })
  }

  render() {
    //FIRST TABLE
    let tasks = [...this.state.tasks];
    tasks = tasks.map((task, index) =>
      <TableTr
        key={index}
        id={index}
        important={task.important}
        name={task.name}
        date={task.date}
        onClickRemove={(e) => this.removeTask('tasks', e)}
        onClickFn2={this.checkedTask}
        icon1={faTrash}
        icon2={faCheckCircle}
        icon2Color="lightgreen"
      />
    )
    //SECOND TABLE
    let tasksDone = [...this.state.tasksDone]
    tasksDone = tasksDone.map((task, index) =>
      <TableTr
        key={index}
        id={index}
        important={task.important}
        name={task.name}
        date={task.dateDone}
        onClickRemove={(e) => this.removeTask('tasksDone', e)}
        onClickFn2={this.undoTask}
        icon1={faTrash}
        icon2={faUndoAlt}
      />
    )
    //RETURN
    return (
      <div className="containerToDo">
        <Form
          inputText={this.state.text}
          inputDate={this.state.date}
          inputCheckbox={this.state.checkbox}
          onChange={this.handleChange}
          onClick={this.addTask}
          error={this.state.error}
        />
        <div className="tasks">
          <h3>Lista zadań</h3>
          <Table
            cols={['zadanie', 'do kiedy', 'usuń', 'zrobione']}
            tasks={tasks}
            styles={[{ width: '40px' }, { width: '70px' }]}
          />
        </div>
        <div className="tasks">
          <h3>Zadania zrobione</h3>
          <Table
            cols={['zadanie', 'wykonano', 'usuń', 'cofnij']}
            tasks={tasksDone}
            styles={[{ width: '40px' }, { width: '50px' }]}
          />
        </div>
      </div>
    );
  }
}

export default ToDoList;