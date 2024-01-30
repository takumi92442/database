import { useState, useEffect } from "react";

export const Login = () =>{
	const [id,setID] = useState("")
	const [password,setPassword] = useState("")

	const EnterId = (props) => {
		setID(props)
	}

	const EnterPassword = (props) =>{
		setPassword(props)
	}

	return(
		<>
		<h1>ログイン画面</h1>
		<input
		type="text" 
		 placeholder="idを入力"
		 onChange={(e) =>{EnterId(e.target.value)}}
		 ></input>
		<br></br>
		 <input
		 type="text"
		 placeholder="パスワードを入力"
		 onChange={(e) =>{EnterPassword(e.target.value)}}
		 ></input>
		{/* <button onClick={}
		 >ログイン</button> */}

		 {console.log(id,password)}
		</>
	)
}

