import './App.css';
import Title from './title';
import AddTodo from './add-todo';
import DisplayTodo from './displayTodo';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./fb-config";
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(()=> {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) =>{
      let todosArray = [];
      querySnapshot.forEach((doc)=>{
        todosArray.push({...doc.data(), id: doc.id});
      });
      setTodos(todosArray);
    });
    return ()=> unsub();
  }, []);

  const handleEdit = async(todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), {title:title});
  };
  const toggleComplete = async(todo) => {
    await updateDoc(doc(db, "todos", todo.id),{completed: !todo.completed});
  };
  const handleDelete = async(id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col md={6}>
            <div>
              <Title/>
            </div>
            <div>
              <AddTodo/>
            </div>
            <div className='todo_container'>
              {todos.map((todo)=>(
                <DisplayTodo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}/>
              ))}
            </div>  
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
