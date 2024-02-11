import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;

        return (
          <div
            className={`bottombar-link ${
              isActive && "bg-primary-600 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <Link className="flex flex-col gap-2 items-center " to={link.route}>
            <link.icon />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default BottomBar;
