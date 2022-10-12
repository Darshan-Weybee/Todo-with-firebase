import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import Todos from './Todos';
import { db, auth } from "../firebase"
import { collection, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore"
import Profile from './Profile';

function Home() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        onSnapshot(collection(db, "Todos"), (snapshot) => {
            setTodos(snapshot.docs.map(doc => ({ id: doc.id, item: doc.data() })))
        })
   }, [input])

    const clickHandler = e => {
        e.preventDefault();
        addDoc(collection(db, "Todos"), {
            todo: input,
            created: serverTimestamp(),
            uid : user.providerData[0].uid,
            completed : false
        })
        setInput("");
    }

    const HomePageDetail = () => {
        return <div className="App">
            <h2>Todo List App</h2>
            <div className='app-body'>
                <div className='todo-body'>
                    <form>
                        <input type="text" className='input-box' onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") clickHandler(); }} />
                        <button className='add-btn' onClick={clickHandler}>Add Todo</button>
                    </form>
                    <ul className='ul'>
                        {todos.map(todo => {if(user.providerData[0].uid === todo.item.uid) return <Todos key={todo.id} arr={todo} />})}
                    </ul>
                </div>
                <div><Profile user={user}/></div>
            </div>
        </div>
    }

    return (
        <div>
            <HomePageDetail/>
        </div>
    )
}

export default Home