function MBTIOption({ selected, label, value, onClick, styles }) {
  const classNames = `${styles.mbtiOption} ${selected ? styles.selected : ""}`;

  return (
    <div className={classNames} onClick={onClick}>
      <span className={styles.char}>{value}</span>
      {label}
    </div>
  );
}
export default MBTIOption;
