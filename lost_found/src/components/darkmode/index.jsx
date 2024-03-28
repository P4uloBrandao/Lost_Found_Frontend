import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="checkbox"
        className=" checkbox"
        onChange={handleChange}
        checked={isChecked}
      />
      <label for="checkbox" className="checkbox-label">
        <i className="fas fa-moon"><FontAwesomeIcon icon="fas fa-moon" /></i>
        <i className="fas fa-sun"><FontAwesomeIcon icon="fas fa-sun" /></i>
    <span className="ball"></span>
  </label>
    </div>
  );
};

