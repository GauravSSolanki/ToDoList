import React, { useEffect, useState } from "react";
import "./ToDolist.css";
import axios from "axios";

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

  const AddTododata = async () => {
    try {
      let newTodo = {
        title: newTitle,
        description: newDes,
      };
      // let updatetodo = [...allTodo];
      // updatetodo.push(newTodo);
      // setallTodo(updatetodo);
      const res = await axios.post("http://localhost:4200/", newTodo, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add other headers as needed
        },
      });
      setnewTitle("");
      setnewDes("");
      console.log(res);
      // getdata();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const deleteTododata = async (_id) => {
    try {
      // let removetodo = [...allTodo];
      // removetodo.splice(index, 1);
      // setallTodo(removetodo);
      const res = await axios.delete(`http://localhost:4200/${_id}`);
      console.log(res);
      // getdata();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

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

  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:4200/");
      // console.log(response.data);
      setallTodo(response.data);
      // console.log(allTodo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, [allTodo]);

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
              className={` isActive  ${isActive === false && "Active"}`}
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
                    <icon onClick={() => deleteTododata(item._id)}>
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
