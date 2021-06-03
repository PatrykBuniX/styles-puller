import { ToggleThemeButton } from "../ToggleThemeButton/ToggleThemeButton";
import styles from "./Header.module.scss";

type Props = {
  isDarkTheme: boolean;
  handleToggleTheme: () => void;
};

export const Header = ({ isDarkTheme, handleToggleTheme }: Props) => {
  return (
    <header className={styles.header}>
      <img
        className={styles.headerLogo}
        width="325"
        height="105"
        src="/logo.png"
        alt="StylesPuller logo."
      />
      <h1 className={styles.headerText}>
        <i>
          Pull <strong>css</strong> selectors <strong>out&nbsp;of</strong> your{" "}
          <strong>html</strong> code!
        </i>
      </h1>

      <ToggleThemeButton isDarkTheme={isDarkTheme} handleToggleTheme={handleToggleTheme} />
    </header>
  );
};
