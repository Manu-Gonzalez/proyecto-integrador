import styles from './BtnAdd.module.css';

const BtnAdd = ({ children, onClick, className = '', ...props }) => {
    return (
        <button 
            className={`${styles.btnAdd} ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className={styles.icon}>+</span>
            {children}
        </button>
    );
};

export default BtnAdd;