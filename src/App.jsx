import { useState, useEffect } from 'react'
import groceryCartImg from './assets/grocery-cart.png'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shoppingList, setshoppingList] = useState([])
  const [isDone,setIsDone] = useState(false);

  const inputOnChanegHandler = (e) => {
    setInputValue(e.target.value);
  }
  const inputEnterHandler = (e) => {
    if(e.key==="Enter"){
      if(e.target.value){

      
      let newList = [...shoppingList];
      const itemIndex = newList.findIndex((item)=> item.name===e.target.value)
      if(itemIndex===-1){
        newList.push({name:e.target.value,quantity:1,completed:false})
      }
      else{
        newList[itemIndex].quantity++;
      }
      
      setshoppingList(newList);
      setInputValue("");
      }
    }
    
  }

  const handleRemoveItem = (name)=>{
      let newList = [...shoppingList].filter((item)=> item.name!==name);
      setshoppingList(newList);
    }

  const handleCheckItem = (status, index)=>{
    let newList = [...shoppingList];
    newList[index].completed=status;
    setshoppingList(newList);
  }

  const handleListIsDone = ()=>{
    if(!shoppingList.length){
      return setIsDone(false);
    }
    let isAllCompleted = true;
    shoppingList.forEach((item)=> {
      if (item.completed === false) isAllCompleted = false;
    });
    setIsDone(isAllCompleted);
  }



useEffect(()=>{
  handleListIsDone();
},[shoppingList])
  return (
    <main className='App'>
      <div>
        <div>
          {isDone && <h4 className="success">You're Done!</h4>}
        
      <div className="header">
        <h1>Shopping List</h1>
        <img src = {groceryCartImg} alt="grocery cart" />
        <input type="text" placeholder='Add an item' className='item-input' 
        onChange={inputOnChanegHandler}
        value={inputValue}
        onKeyDown={inputEnterHandler}
        />
      </div>
      </div>
      <ul>
        {shoppingList.map((item, index)=>(
          <li key={item.name}>
          <div className="container">
            <input type="checkbox" onChange={(e)=>{
              handleCheckItem(e.target.checked,index);
            }} 
            value={item.completed}
            checked={item.completed}
            />
            <p>{item.name}</p> {item.quantity>1 && <p> x{item.quantity}</p>}
          </div>
          <div className="remove-button" onClick={()=> handleRemoveItem(item.name)}>X</div>
        </li>
        ))}
        
      </ul>
      </div>
    </main>
  )
}

export default App
