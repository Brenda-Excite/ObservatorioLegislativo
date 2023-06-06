import '../../assets/styles/backdrop.css';

const Backdrop = () => {
    return (
      <>
        <div className="loader-wrapper">
        <div className="loader">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div className="loader loader-2">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div className="loader loader-3">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
      </div><div className="loader-wrapper">
        <div className="loader">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div className="loader loader-2">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div className="loader loader-3">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
      </div>
      </>
    );
};

export default Backdrop;