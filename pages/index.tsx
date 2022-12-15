import Head from 'next/head'
import Image from 'next/image'
import Note, { NoteProps } from '../components/Notes/note'
import styles from '../styles/Home.module.css'
import React, { use, useState } from 'react';
import Footer from '../components/ui/footer';

export default function Home() {
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [updating, setUpdating] = useState(false)
  const [notes, setNotes] = useState<NoteProps[]>([])

  const [activeNoteId,setActiveNoteId] = useState()
  const activeNote = activeNoteId ? notes[activeNoteId] : null 

  const handleChangeActiveNote = (props:NoteProps,Index)=>{
    setActiveNoteId(Index)
    console.log("NoteId: ",activeNoteId)
    setNote(props.note)
    setTitle(props.title)
    setUpdating(true)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setNote( event.target.value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(updating){
      console.log(notes[activeNoteId])
      setNotes([...notes, notes[activeNoteId]={ id: Date.now().toString() , title, note}])
      console.log("updated array", notes)
      setNote("")
      setTitle("")
      return
    }
    setNotes([...notes, { id: Date.now().toString() , title, note}])
    console.log(notes)
    setNote("")
    setTitle("")
  }

  return (
    <div className={styles.container}>
      
      <Head>
        <title>Notes Taking APP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Notes App</a>
        </h1>

        <p className={styles.description}> 
          Get started by writing your note below   
        </p>
        <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-8">
        <input className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder="Add a A title" value={title} onChange={handleTitleChange}/>
        <textarea  className="textarea textarea-info" placeholder="Add a new note" value={note} onChange={handleNoteChange}/>
        <button className="btn btn-outline btn-wide btn-primary" type='submit'>{updating ? "Update A Note" : "Add a Note" }</button>
      </form>
        </div>

        <div className={styles.grid}>
          {notes.map((note, Index)=>{
            return (<div key={note.id} className={styles.grid} onClick={()=>{handleChangeActiveNote(note,Index)}}><Note id={note.id} title={note.title} note={note.note}/> </div>)
          })}
        </div>
      </main>
    <Footer />

    </div>
  )
}
