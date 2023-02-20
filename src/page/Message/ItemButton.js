import styles from './Message.module.scss';

function ItemButton({ content, active }) {
  return (
    <button
      style={{
        marginLeft: '12px',
        color: 'inherit',
        borderRadius: '9999px',
        border: 'none',
        padding: '8px 12px',
        cursor: 'pointer',
      }}
      className={active ? styles.btnActive : ''}
    >
      {content}
    </button>
  );
}

export default ItemButton;
