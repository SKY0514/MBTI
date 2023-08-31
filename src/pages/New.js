import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import MBTISelect from "../components/MBTISelect";
import ColorInput from "../components/ColorInput";
import Button from "../components/Button";
import generateColorCode from "../lib/generateColorCode";
import styles from "./New.module.css";
import { postMbti } from "../api/api";

function New() {
  const [formValue, setFormValue] = useState({
    mbti: "ESTJ",
    colorCode: "#000000",
  });
  const navigate = useNavigate();

  function handleChange(name, value) {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  }

  const handleRandomClick = () => {
    const nextColorCode = generateColorCode();
    handleChange("colorCode", nextColorCode);
  };

  function handleColorCodeBlur() {
    const isValidColorCode = /^#[a-f0-9]{6}$/i.test(formValue.colorCode);
    if (!isValidColorCode) {
      handleChange("colorCode", "#000000");
    }
  }
  async function handleSubmit() {
    await postMbti({
      ...formValue,
      password: '0000',
    });
    navigate('/');
  }


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to="/">
          <img className={styles.cancelIcon} src="/images/x.svg" alt="취소" />
        </Link>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>MBTI</h2>
        <MBTISelect
          value={formValue.mbti}
          onChange={(newMbti) => handleChange("mbti", newMbti)}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random} onClick={handleRandomClick}>
            <img
              className={styles.repeatIcon}
              src="/images/repeat.svg"
              alt="랜덤"
            />
          </button>
        </h2>
        <ColorInput
          value={formValue.colorCode}
          onChange={(newColorCode) => handleChange("colorCode", newColorCode)
        }
        onBlur={handleColorCodeBlur}
        
        />
      </section>
      <Button className={styles.submit} onClick={handleSubmit}>
        컬러 등록
      </Button>
    </div>
  );
}

export default New;
