import styles from './Btn-secondary.module.css';

function BtnSecondary({ children, onClick, ...props }) {
    return (
        <button className={styles.btnSecondary} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default BtnSecondary;