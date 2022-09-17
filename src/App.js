import "./App.css";
import { TbArrowBarDown } from "react-icons/tb";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

const App = () => {
    var regex = /^[A-Za-z0-9 ]+$/



    const [todo, setTodo] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const getCount = () => {
        let count = allTodos.filter((item) => item.isChecked === true).length;
        return count;
    };

    const addTodo = (e) => {
        e.preventDefault();

        const todoItem = {
            id: new Date().getTime(),
            text: todo,
            isChecked: false,
        };
        if (todo.length > 100) { return }
        let isValid = regex.test(todo);
        if (!isValid) { return }

        let isOld = false;

        for (let i = 0; i < allTodos.length; i++) {
            if (todo === allTodos[i].text) {
                isOld = true;
                break;
            }
        }

        if (isOld) {
            alert("We can not add Duplicate Text");
        } else {
            setAllTodos([...allTodos].concat(todoItem).reverse());
            setTodo("");
        }

        console.log(allTodos);
    };

    const getAllTodos = () => {
        let stored = JSON.parse(localStorage.getItem("todo"));

        if (stored) {
            setAllTodos(stored);
        }
    };

    const toggleChecked = (id) => {
        let updatedTodos = [...allTodos].map((todo) => {
            if (todo.id === id) {
                todo.isChecked = !todo.isChecked;
            }

            return todo;
        });

        setAllTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        window.confirm("Confirm to delete this task");
        const filteredTodo = allTodos.filter((todo) => todo.id !== id);
        setAllTodos(filteredTodo);
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(allTodos));
    }, [allTodos]);

    return (
        <div className="App">
            <div className="App_todo">
               <div className="title">
                <h2>Things to do</h2>
               </div>


                <div className="App_todo_list">
                    {allTodos.map((todo) => (
                        <ListItem
                            key={todo.id}
                            deleteTodo={() => deleteTodo(todo.id)}
                            text={todo.text}
                            isChecked={todo.isChecked}
                            toggleChecked={() => toggleChecked(todo.id)}
                        />
                    ))}

                    {allTodos.length === 0 && (
                        <p className="empty">There are no Todo's</p>
                    )}
                </div>
                <div className="done">
                <h1>Done:{getCount()}</h1>
                </div>
                
                <form className="App_input_wrapper" onSubmit={addTodo}>

                <input
                    type={"text"}
                    className="App_input"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <div className="App_input_button" onClick={addTodo}>
                    <button className="add-btn">Add Task</button>
                </div>
            </form>
            </div>
            
        </div>
    );
};

export default App;
