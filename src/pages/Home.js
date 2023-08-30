import { useEffect, useState } from "react";
import { getMbti } from "../api/api";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ColorSurvey from "../components/ColorSurvey";

function Home() {
  const [mbtiList, setMbtiList] = useState([]);
  const [filter, setFilter] = useState(null);

  const getMbtiList = async () => {
    const { data } = await getMbti();
    setMbtiList(data.results);
  };

  useEffect(() => {
    getMbtiList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI 별<br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            {filter && (
              <div className={styles.filter} onClick={() => setFilter(null)}>
                {filter}
                <img
                  className={styles.removeIcon}
                  src="/images/x.svg"
                  alt="필터 삭제"
                />
              </div>
            )}
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {mbtiList.map((item) => (
            <li key={item.id}>
              <ColorSurvey value={item} onClick={() => setFilter(item.mbti)} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
