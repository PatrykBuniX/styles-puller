import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2021</p>
      <p>
        Created by{" "}
        <a rel="noreferrer noopener" href="https://github.com/PatrykBuniX">
          patrykbunix
        </a>
      </p>
    </footer>
  );
};
