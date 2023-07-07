import React, { useEffect, useRef } from "react"; //domine directly access cheyyan vendi useref use cheyyunnu...which means input space focus aayi nikkan vendi
import { useState } from "react"; //initially load aavan useeffect koodi add aakkunnu
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  var [todo, setTodo] = useState(""); //data save cheythu edukkan ...type cheyunna data thazhekk kittan and store cheythu vekkan....ivde initial value null aanu bcz datane access cheyyan
  var [todos, setTodos] = useState([]); //this is for storing the all todos in an array....it can be show the todo in the array
  var [editId,setEditId] = useState(0);
  
  var handleSubmit = (e) => {
    e.preventDefault(); //method used for dont refreshing...this function is used for didnt refreshing during updation
  };

  var addTodo = () => {   //datane update cheythu array display aavanulla function
    if(todo!==''){
    setTodos([...todos, { list: todo, id: Date.now(), status: false }]);  //...=>spread operator used for first enter cheytha data lose aavathirikkaan ....it stores the data to todo
    setTodo(""); //input spacil type cheythu addakkiyathinu shesham ath automatically erase aavan
    }

    if(editId){
      let editTodo = todos.find((todo)=>todo.id === editId)
      let updateTodo = todos.map((to)=>to.id === editTodo.id
      ?(to = {id : to.id, list : todo})
      :(to= {id : to.id , list : to.list}))
      setTodos(updateTodo)
      setEditId(0);
      setTodo('')
    }
  };

  var inputRef = useRef("nul"); // input space focus aavan

  useEffect(() => { //eth functions undenkilum useffect kazhinje call cheyyuollu
    inputRef.current.focus();
  });



  var onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  var onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  var onEdit = (id) => {
    let editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  };


  const [ sortOrder, setSortOrder ] = useState(null)
  const handleSort = () => {
    if(sortOrder == null) setSortOrder("asc")
    else if(sortOrder === "asc") setSortOrder("desc")
    else setSortOrder(null)
  }

  const sortedList = (todos = []) => {
    if(sortOrder === "asc") return todos?.sort((a,b) => (a.list).localeCompare(b.list))
    else if(sortOrder === "desc") return todos?.sort((a,b) => (b.list).localeCompare(a.list))
    else return todos
  }
  


  return (
  <div className="color">
    <div className="container">
      <h1>Todo App</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your todo"
          className="input"
          onChange={(event) => setTodo(event.target.value)} //setTodo used for updating the event=>event.target.value means calling the value to handler
          value={todo}  //value is the todo that we given
          ref={inputRef} //passing nadakkunnu
        ></input>
        <button className="button" onClick={addTodo}>
          {editId ? 'EDIT':'ADD'}
        </button>
        <button className="btn2" onClick={handleSort}>Sort</button>
      </form>
      <div className="list">
        <ul>
          {/*<li className='form-control'>First</li>
            <li className='form-control'>Second</li>
            <li className='form-control'>Third</li>*/}
          {sortedList(todos)?.map((to) => (  //map used for displaying data from the array
            <li className="list-items">
              <div className="list-item-list" id={to.status ? "list-item" : ""}>
                {to.list}
              </div>

              <span>
                <IoMdDoneAll
                  className="list-items-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <FiEdit
                  className="list-items-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <MdDelete
                  className="list-items-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Todo;
