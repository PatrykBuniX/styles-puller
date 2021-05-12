import styles from "./OptionsMenu.module.scss";
import { HtmlStringToStylesOptions } from "../../lib/";

type Props = {
  options: HtmlStringToStylesOptions;
  handleMenuClose: () => void;
  handleConvertionOptionsChange: (options: HtmlStringToStylesOptions) => void;
};

export const OptionsMenu = ({
  options,
  handleMenuClose,
  handleConvertionOptionsChange,
}: Props) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        <div className={styles.option}>
          <label htmlFor="mode">conversion mode: </label>
          <select
            onChange={handleOptionChange}
            name="mode"
            id="mode"
            value={options.mode}
          >
            <option value="scss">scss</option>
            <option value="css">css</option>
          </select>
        </div>
      </div>
    </div>
  );
};
