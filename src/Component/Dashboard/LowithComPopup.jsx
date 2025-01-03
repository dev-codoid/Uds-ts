const LowWidthPopup = () => {
  return (
    <>
      <div
        className="lowpopup-background"
        style={{
          width: "100%",
          height: "100vh",
          background: "white",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className="lowpop-wraper"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div
            className="lowpopup-container"
            style={{
              width: "340px",
              height: "330px",
              background: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "22px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "100",
              borderRadius: "10px",
              "-webkit-box-shadow": "3px 3px 14.5px 3px #817eff",
              "-moz-box-shadow": "3px 3px 14.5px 3px #817eff",
              "box-shadow": "3px 3px 14.5px 3px #817eff",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Optimized for Desktop Access
            </h2>
            <p
              style={{
                width: "80%",
                textAlign: "center",
              }}
            >
              Our website is designed for desktop use. Please switch to a
              computer to access our site. Thank you for your understanding!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LowWidthPopup;
