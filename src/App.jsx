import { useState } from 'react'
import './App.css'
import MyForm from './MyForm'
import S3Cognito from './S3Cognito'
import Form2 from './Form2'

function App() {

  return (
    <div style={{width:"100vw",display:'flex',justifyContent:'center'}}>
     {/* <MyForm/> */}
     {/* <S3Cognito/> */}
     <Form2/>
    </div>
  )
}

export default App
