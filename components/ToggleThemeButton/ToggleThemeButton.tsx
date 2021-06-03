import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import styles from "./ToggleThemeButton.module.scss";

type Props = { isDarkTheme: boolean; handleToggleTheme: () => void };

export const ToggleThemeButton = ({ isDarkTheme, handleToggleTheme }: Props) => {
  return (
    <button
      aria-label="Toggle theme color"
      className={styles.toggleThemeButton}
      onClick={handleToggleTheme}
    >
      {isDarkTheme ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
