import { useEffect, useState, useRef } from "react";
import { getMbti } from "../api/api";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ColorSurvey from "../components/ColorSurvey";
import axios from "axios";

function Home() {
  const [mbtiList, setMbtiList] = useState([]);
  const [filter, setFilter] = useState(null);
  const nextPageRef = useRef(null);
  const isLoadingRef = useRef(false);

  const getMbtiList = async (mbti) => {
    const { data } = await getMbti({mbti,limit:20});
    nextPageRef.current = data.next;

    setMbtiList(data.results);
  };

  async function handleLoadNext() {
    

    const { data } = await axios.get(nextPageRef.current);


    setMbtiList((prevItems) => [...prevItems, ...data.results]);
    nextPageRef.current = data.next;

  };
  

  useEffect(() => {
    getMbtiList(filter);
  }, [filter]);

  useEffect(() => {
    async function handleScroll() {
      if (!nextPageRef.current || isLoadingRef.current) return;
      isLoadingRef.current = true;

      const maxScrollTop =
        document.documentElement.offsetHeight - window.innerHeight - 100;

      const currentScrollTop = document.documentElement.scrollTop;
      if (currentScrollTop >= maxScrollTop) {

        await handleLoadNext();
      }
      isLoadingRef.current = false;
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
