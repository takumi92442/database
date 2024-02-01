import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLogin, postLogin, getTask, postTask } from "./api.js";
import { delete_task } from "./api.js";
import { format } from 'date-fns';


export function List(props) {
  const [textA, settextA] = useState("");
  const [filterA, setfilterA] = useState("");
  const [limitDate, setLimitDate] = useState(new Date());
  const [arry, setArry] = useState([]);
  const [isTaskEmpty, setIsTaskEmpty] = useState(false);
  const [data, setData] = useState([]);
  const {LoginID} = props

  // React コンポーネント内での呼び出し
useEffect(() => {
  const get = async () => {
    try {
      const fetchData = await getTask();  // LoginID を引数に渡す
      setData(fetchData);
      console.log(fetchData);
    } catch (error) {
      console.error("データの取得に失敗しました", error);
    }
  };
  get();
},[]);

  

  const convertToPostgresDate = () => {
    // Date オブジェクトを ISO 8601 形式に変換
    const isoFormattedDate = format(limitDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    return (isoFormattedDate);
  };


  const Switch = async () => {
    const time = convertToPostgresDate();
    console.log({'time':time})
    try {
      const newTask = {
        LoginID: LoginID,
        Task: textA,
        LimitDate: time
      };
      console.log(newTask)
      const response = await postTask(newTask);
      console.log(response); // サーバーからのレスポンスを出力
  
      // データの再取得
      const fetchData = await getTask();
      setData(fetchData); // データをセット
  
    } catch (error) {
      console.error("データの送信に失敗しました", error);
    }
  };

  

  

  const handleDelete = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);

      await deleteDoc(doc(db, 'data', taskId));

      setArry((prevArry) => prevArry.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("データの削除に失敗しました", error);
    }
  };



  return (
    <>
    {console.log(data)}
	  <div className="form">
      <input
        type="text"
        placeholder="タスクを入力してください"
        value={textA}
        onChange={(e) => {
          settextA(e.target.value);
          setIsTaskEmpty(false); 
        }}
      />
      {isTaskEmpty && <span style={{ color: 'red' }}>*入力してください</span>}
      <DatePicker
        selected={limitDate}
        onChange={(date) => setLimitDate(date)}
      />
	締切日を入力
      <button onClick={Switch}>挿入</button>     
    <div>
      <ul>
      {data.map((item) =>{
        return (
        <li key={item.ID}
        >
          { console.log(item) }
          <div style={{display:"flex" , flexDirection:"row"}}>{item.Task} {item.LimitDate}
          <button onClick={() => delete_task(String(item.ID))}>削除</button>
          </div>
        </li>)
      })}
      </ul>
    </div>
	  </div>
    </>
  );
}
