import React, { useEffect, useState } from "react";

function WithOpacity(WrappedComponent) {
  return function WithOpacity(props) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      setIsLoaded(true);
    }, []);

    return (
      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity .25s ease",
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export default WithOpacity;