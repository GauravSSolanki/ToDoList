import React, { useState } from "react";
import "./ToDolist.css";

// import { MdCheckCircleOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function To_DoList() {
  const [isActive, setisActive] = useState(false);
  const [newTitle, setnewTitle] = useState("");
  const [newDes, setnewDes] = useState("");
  const [allTodo, setallTodo] = useState([]);
  const [Comptodo, setComptodo] = useState([]);

  // console.log(allTodo);

  const AddTododata = () => {
    let newTodo = {
      title: newTitle,
      description: newDes,
    };

    // setallTodo((olditem)=>{
    //   return [newTodo, ...olditem] ;
    // })
    let updatetodo = [...allTodo];
    updatetodo.push(newTodo);
    setallTodo(updatetodo);
    setnewTitle("");
    setnewDes("");
  };



  const deleteTododata = (index) => {
      setTimeout(()=>{
      let removetodo = [...allTodo];
      removetodo.splice(index, 1);
      setallTodo(removetodo);
  }, 200);
  }

  function deleteTodoComp(index) {
      let removetodo = [...Comptodo];
      removetodo.splice(index, 1);
      setComptodo(removetodo);
  }

  const compTodo = (index) => {
    let Comp_todo_item = allTodo[index];

    let removetodo = [...allTodo];
    removetodo.splice(index, 1);
    setallTodo(removetodo);

    let comptoitem = [...Comptodo];
    comptoitem.push(Comp_todo_item);
    setComptodo(comptoitem);
  };

  return (
    <div className="Main-Container">
      <div className="ToDolist-cont">
        <div className="ToDolist">
          <h2>To Do List </h2>
          <label className="label"> Enter To Do</label>
          <input
            className="search"
            onChange={(e) => setnewTitle(e.target.value)}
            value={newTitle}
          ></input>
          <label className="label"> Description</label>
          <input
            className="search"
            onChange={(e) => setnewDes(e.target.value)}
            value={newDes}
          ></input>
          <button className="btn" onClick={AddTododata}>
            Add
          </button>
          <div className="change-column">
            <button
              className={`isActive  ${isActive === true && "Active"}`}
              onClick={() => setisActive(true)}
            >
              {" "}
              ToDo
            </button>
            <button
              className={`isActive  ${isActive === false && "Active"}`}
              onClick={() => setisActive(false)}
            >
              {" "}
              Completed
            </button>
          </div>
          <hr />
        </div>

        {isActive && (
          <div className="to-do-element">
            {allTodo.map((item, index) => {
              return (
                <div className="ToDo-list-ELEment" key={index}>
                  <p className="para">{item.title} </p>
                  <p className="para-1">{item.description}</p>
                  <div className="icon-bar">
                    <icon onClick={() => deleteTododata(index)}>
                      <MdDelete className="todolist-icon red" />
                    </icon>
                    <icon onClick={() => compTodo(index)}>
                      <MdDone className="todolist-icon green" />{" "}
                    </icon>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isActive && (
          <div className="to-do-element">
            {Comptodo.map((item, index) => {
              return (
                <div className="ToDo-list-ELEment" key={index}>
                  <p className="para">{item.title} </p>
                  <p className="para-1">{item.description}</p>
                  <div className="icon-bar">
                    <icon onClick={() => deleteTodoComp(index)}>
                      <MdDelete className="todolist-icon red" />
                    </icon>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default To_DoList;
