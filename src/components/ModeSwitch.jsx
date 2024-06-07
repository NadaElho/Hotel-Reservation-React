const ModeSwitch = ({ handleMode, mode }) => {
  return (
    <>
       <div onClick={handleMode} className={`toggle ${mode == "dark" ? "night" : ""}`}>
            <div className="notch">
                <div className="crater" />
                <div className="crater" />
            </div>
            <div>
                <div className="shape sm" />
                <div className="shape sm" />
                <div className="shape md" />
                <div className="shape lg" />
            </div>
        </div>
    </>
  );
};

export default ModeSwitch;
