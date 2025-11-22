import styles from './Btn-primary.module.css';

function BtnPrimary({ children, onClick, ...props }) {
    return (
        <button className={styles.btnPrimary} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default BtnPrimary;