import styles from "./OptionsMenu.module.scss";
import { HtmlStringToScssOptions } from "../../lib/";
import { Dispatch, SetStateAction } from "react";

type Props = {
  options: HtmlStringToScssOptions;
  handleMenuClose: () => void;
  setConversionOptions: Dispatch<SetStateAction<HtmlStringToScssOptions>>;
};

export const OptionsMenu = ({
  options,
  handleMenuClose,
  setConversionOptions,
}: Props) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newOptions = {
      ...options,
      [name]: type === "checkbox" ? checked : value,
    };
    setConversionOptions(newOptions);
  };

  return (
    <div
      data-bg
      onClick={handleBackgroundClick}
      className={styles.optionsMenuWrapper}
    >
      <div className={styles.optionsMenu}>
        <h2>Convertion Options</h2>
        <button onClick={handleMenuClose} className={styles.closeMenu}>
          x
        </button>
        <div className={styles.option}>
          <input
            checked={options.includeModifiers}
            onChange={handleOptionChange}
            type="checkbox"
            name="includeModifiers"
            id="includeModifiers"
          />
          <label htmlFor="includeModifiers">
            Include modifier class names.
          </label>
        </div>
      </div>
    </div>
  );
};
