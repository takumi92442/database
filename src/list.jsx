import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPublishers,postPublisher} from "./api.js";


export function List() {
  const [textA, settextA] = useState("");
  const [filterA, setfilterA] = useState("");
  const [limitDate, setLimitDate] = useState(new Date());
  const [arry, setArry] = useState([]);
  const [isTaskEmpty, setIsTaskEmpty] = useState(false);
  const [data, setData] = useState([]); // 新しく追加

  useEffect(() => {
    const get = async () => {
      try {
        const fetchData = await getPublishers();
        setData(fetchData); // データをセット
        console.log(fetchData)
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };
    get();
  }, []);

  // const Switch = async () => {
  //   // {loginData} = props
  //   if (!textA.trim()) {
  //     setIsTaskEmpty(true);
  //     return;
  //   }

  //   try {
  //     // await addDoc(collection(db, "data"), {
  //     //   text: textA,
  //     //   timestamp: serverTimestamp(),
  //     //   limitDate: limitDate,
  //     // });
  //     const login = {
  //       ID : 789,
  //       RoginID : '123',
  //       Password: '456'
  //     }
  //     console.log(login)
  //     await postPublisher(login)

  //     // const data = await getDocs(collection(db, 'data'));
  //     // const dataI = data.docs.map((e) => ({ id: e.id, ...e.data() }));
  //     // const sortedData = dataI.sort((a, b) => a.timestamp - b.timestamp);

  //     // console.log(sortedData);
  //     // setArry(sortedData);

  //     // settextA("");
  //     // setLimitDate(new Date());
  //     // setIsTaskEmpty(false); 
  //   } catch (error) {
  //     console.error("データの追加に失敗しました", error);
  //   }
  // };

  const Switch = async () => {
    try {
      const newPublisher = {
        LoginID: '新しいID',
        Password: '新しいパスワード',
      };
  
      const response = await postPublisher(newPublisher);
      console.log(response); // サーバーからのレスポンスを出力
  
      // データの再取得
      const fetchData = await getPublishers();
      setData(fetchData); // データをセット
  
    } catch (error) {
      console.error("データの送信に失敗しました", error);
    }
  };
  
  const buttonCleckd = async () => {
    const data = {
      LoginID: 'test',
      Password: 'testP',
    };
    const response = await postPublisher(data);
  if (response.error) {
    console.error("データの送信に失敗しました", response.error);
}  else {
    console.log("データの送信に成功しました");
}
  }

  

  const handleDelete = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);

      await deleteDoc(doc(db, 'data', taskId));

      setArry((prevArry) => prevArry.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("データの削除に失敗しました", error);
    }
  };

  const filteredArry = arry.filter((task) => {
    if (filterA.trim() !== "") {
      return task.text.includes(filterA);
    }
    return true;
  });

  console.log(arry);

  const mappedArry = filteredArry.map((task) => (
	<div key={task.id} className="graph">
    <li >
      {task.text}
      <br />
	  入力日 :
      {new Date(task.timestamp.seconds * 1000).toLocaleString()}
      <br />
      締切日: {task.limitDate ? new Date(task.limitDate.seconds * 1000).toLocaleDateString() : 'N/A'}
      <button className="delete" onClick={() => handleDelete(task.id)}>削除</button>
    </li>
	</div>
  ));

  return (
    <>
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
      <p>フィルター</p>
      <input
        type="text"
		className="filtter"
        placeholder="絞りたいワードを入力"
        value={filterA}
        onChange={(e) => setfilterA(e.target.value)}
      />

<button onClick={buttonCleckd}>挿入</button>
	<div className="Graph">
        {mappedArry}
	</div>
	  </div>
    </>
  );
}
