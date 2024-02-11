import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MdOutlineLogout } from "react-icons/md";
import { useLogoutAccount } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { mutate: logout, isSuccess } = useLogoutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="../../../public/icons/icon-1.webp" width={48} height={48} />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => logout()}
          >
            <MdOutlineLogout />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex center gap-2">
            <img
              src={user.imageUrl || "../../../public/icons/avatar.png"}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
