import styles from "./OptionsMenu.module.scss";
import { HtmlStringToStylesOptions } from "../../lib/";
import FocusTrap from "focus-trap-react";
import { useEffect } from "react";

type Props = {
  options: HtmlStringToStylesOptions;
  handleMenuClose: () => void;
  handleConvertionOptionsChange: (options: HtmlStringToStylesOptions) => void;
};

export const OptionsMenu = ({ options, handleMenuClose, handleConvertionOptionsChange }: Props) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      handleConvertionOptionsChange({
        ...options,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      handleConvertionOptionsChange({
        ...options,
        [name]: value,
      });
    }
  };

  const handleEscapeModalClose = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    handleMenuClose();
    console.log("eee");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeModalClose);
    return () => window.removeEventListener("keydown", handleEscapeModalClose);
  }, []);

  return (
    <FocusTrap>
      <div data-bg onClick={handleBackgroundClick} className={styles.optionsMenuWrapper}>
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
            <label htmlFor="includeModifiers">Include modifier class names.</label>
          </div>
          <div className={styles.option}>
            <input
              checked={options.tagNamesOnly}
              onChange={handleOptionChange}
              type="checkbox"
              name="tagNamesOnly"
              id="tagNamesOnly"
            />
            <label htmlFor="tagNamesOnly">Use tag names only.</label>
          </div>
          <div className={styles.option}>
            <select onChange={handleOptionChange} name="mode" id="mode" value={options.mode}>
              <option value="scss">scss</option>
              <option value="css">css</option>
            </select>
            <label htmlFor="mode">conversion mode.</label>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};
