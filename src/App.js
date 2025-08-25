import { useState } from "react";
import useGeoLocation from "./custom hooks/useGeoLocation";

export default function App() {
  const { isLoading, position, error, getPosition } = useGeoLocation();
  const [countClicks, setCountClicks] = useState(0);

  const { lat, lng } = position;
  const handleClick = () => {
    getPosition()
    setCountClicks((c) => c + 1);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
