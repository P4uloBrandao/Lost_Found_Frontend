import "./style.css";
import { BsSun } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";
import { HiMiniMoon } from "react-icons/hi2";
import '../../assets/colors/colors.css';

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
      <HiMiniMoon
    style={{
      color: '#ffffff',
    }}
  />
      <BsSun
    style={{
      color: '#ffffff',
    }}
  />
                <span className="ball"></span>
  </label>
    </div>
  );
};

