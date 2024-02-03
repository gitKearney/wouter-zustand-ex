import { useUserStore } from "../store/userStore.ts";
import { useEffect } from "react";

function Items() {
  const getToken = useUserStore((state) => state.getToken);

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Items list</h2>

      <div>
        <ul>
          <li>Bread</li>
          <li>Butter</li>
          <li>Cheese</li>
          <li>Jelly</li>
        </ul>
      </div>
    </div>
  );
}

export default Items;
