import React, { useState, useEffect } from 'react'

import './styles.css'

import { Card, CardProps } from '../../components/Card'

type ProfileResponse = {
  name: string,
  avatar_url: string
}

type User = {
  name: string,
  avatar: string
}

export function Home() {

  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent])
    setStudentName('')
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/dfarias') 
      const data = await response.json() as ProfileResponse
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData()
  },[])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto do perfil"/>
        </div>
      </header>
      <input
        id='inputName'
        type="text"
        placeholder="Digite o nome"
        value={studentName}
        onChange={e => setStudentName(e.target.value)} />

      <button
        type="button"
        onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map((student, idx) => <Card key={idx} name={student.name} time={student.time} />)
      }

    </div>
  )
}
