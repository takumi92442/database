import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getLogin, postLogin } from "./api.js";

export const Login = (props) => {
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const {LoginID,setLoginID} = props

  const EnterId = (props) => {
    setID(props);
    setErrorMessage(""); // IDが変更されたらエラーメッセージをリセット
  };

  const EnterPassword = (props) => {
    setPassword(props);
    setLoginID(props);
  }

  const ChangeScreen = () => {
    console.log(LoginID);
    navigate('/list');
  }

  const Switch = async () => {
    try {
      // data内のLoginIDとPasswordの組み合わせが存在するかチェック
      if (data.some(existingLogin => existingLogin.LoginID === id && existingLogin.Password === password)) {
        // ログイン成功時の処理
        console.log("ログイン成功");
        setLoginID(id);
		    ChangeScreen();
      } else {
        setErrorMessage("IDまたはパスワードが正しくありません");
      }

    } catch (error) {
      console.error("データの取得に失敗しました", error);
    }
  };

  const Register = async () => {
    try {
      // data内のLoginIDと重複チェック
      if (data.some(existingLogin => existingLogin.LoginID === id)) {
        setErrorMessage("既に存在するIDです");
        return;
      }

      const newLogin = {
        LoginID: id,
        Password: password,
      };

      // サーバーに新しいパブリッシャーを作成するためのリクエストを送信
      const response = await postLogin(newLogin);
      const getles= await getLogin()
      setData(getles)
      console.log(response); // サーバーからのレスポンスをログに出力

    } catch (error) {
      console.error("データの送信に失敗しました", error);
    }
  };

  useEffect(() => {
    const get = async () => {
      try {
        const fetchData = await getLogin();
        setData(fetchData);
        console.log(fetchData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };
    get();
  }, []);

  return (
    <>
      {console.log(data)}
      <h1>ログイン画面</h1>
      <div>登録してない場合はidとpasswordを入力し、登録ボタンを押してからログインしてください</div>
      <input
        type="text"
        placeholder="IDを入力"
        onChange={(e) => { EnterId(e.target.value) }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="パスワードを入力"
        onChange={(e) => { EnterPassword(e.target.value) }}
      ></input>
      <button onClick={() => { Switch() }}>ログイン</button>
      <button onClick={() => { Register() }}>登録</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  )
}
