import MBTIOption from "./MBTIOption";
function MBTIOptionGroup({ options, value, onChange, styles }) {
  return (
    <div className={styles.mbtiOptionGroup}>
      {options.map((option) => (
        <MBTIOption
          styles={styles}
          key={option.value}
          selected={option.value === value}
          label={option.label}
          value={option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}

export default MBTIOptionGroup;
