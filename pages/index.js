import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc
  } from "firebase/firestore"
import {db} from "../firebase"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)


  //add item to database
  const addItem = async () => {
    
    if (value !== "") {
      await addDoc(collection(db, "money-public"), {
        value,
        description
      })
      setItems([...items, [value, description, Date()]]);
      setValue("");
      setDescription("");
    } else {
      console.log("please enter a value 🙃")
    }
  }

  //read item from database
  useEffect(() => {
    const q = query(collection(db, "money-public"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      var totalAm = 0;
      querySnapshot.forEach((doc) => {
        itemsArr.push([doc.data().value, doc.data().description, doc.id])
        totalAm += Number(doc.data().value);
      });
      setItems(itemsArr);
      setTotal(totalAm);
    })
  }, [])

  //delete item from database
  async function deleteItem(id) {
    await deleteDoc(doc(db, "money-public", id));
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >

      <div id='new-purchas' className='flex flex-col items-center'>
      <h1 className='text-4xl mb-5'>Ausgaben</h1>
      <input value={value} placeholder="Betrag in €" className='text-2xl rounded-lg p-1 h-12 focus:outline-none my-2' onChange={e => { setValue(e.currentTarget.value)}}/>
      <input value={description} placeholder='Ausgabe' className='text-2xl rounded-lg p-1 h-12 focus:outline-none my-2' onChange={e => { setDescription(e.currentTarget.value)}}/>
      <button className='bg-green-800 text-white text-xl p-3 mt-5 rounded-lg' onClick={() => {(addItem())}}>Hinzufügen</button>
      </div>
      <div id='recent-purchases' className='mt-24'>
        <h1 className='text-3xl mb-3'>Ausgaben {total} €</h1>
        <ul className='text-xl'>
          {items.map((item) => (
            <li key={item[2]}>
              <div className='flex justify-between items-center justify align-center'>
                <div><p>${item[0]} - {item[1]}</p></div>
                <div><button className='text-3xl' onClick={() => deleteItem(item[2])}>x</button></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
     
    </main>
  )
}
