import styles from './Checkbox.module.css';

function Checkbox({ children, ...props }) {
    return (
        <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} {...props} />
            <span className={styles.checkboxText}>{children}</span>
        </label>
    );
}

export default Checkbox;