import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center gap-2">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log in
        </Button>
      )}
    </span>
  );
}

export default App;
