import { useEffect, useState } from "react";
import { getLendings, postLendingReturn } from "../api";

export default function LendingList() {
  const [lendings, setLendings] = useState([]);

  useEffect(() => {
    (async () => {
      const lendings = await getLendings();
      setLendings(lendings);
    })();
  }, []);

  return (
    <>
      <table className="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th>貸出番号</th>
            <th>学生証番号</th>
            <th>学生氏名</th>
            <th>貸出書籍</th>
            <th>貸出日</th>
            <th>返却予定日</th>
            <th>返却確認日</th>
            <th>返却</th>
          </tr>
        </thead>
        <tbody>
          {lendings.map((lending) => {
            return (
              <tr key={lending.貸出番号}>
                <td>{lending.貸出番号}</td>
                <td>{lending.学生.学生証番号}</td>
                <td>{lending.学生.学生氏名}</td>
                <td>
                  {lending.書籍.map((book) => {
                    return <p key={book.ISBNコード}>{book.書籍名}</p>;
                  })}
                </td>
                <td>{lending.貸出日}</td>
                <td>{lending.返却予定日}</td>
                <td>{lending.返却確認日}</td>
                <td>
                  <button
                    className="button is-primary"
                    disabled={!!lending.返却確認日}
                    onClick={async () => {
                      if (
                        confirm(
                          `貸出番号${lending.貸出番号}の返却を完了しますか？`
                        )
                      ) {
                        await postLendingReturn(lending.貸出番号);
                        const lendings = await getLendings();
                        setLendings(lendings);
                      }
                    }}
                  >
                    返却
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
