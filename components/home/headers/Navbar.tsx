import Link from "next/link";
import { Button } from "../../ui/button";
import Searchinput from "./Searchinput";
import { ToggleMode } from "./ToggleMode";


const Navbar = () => {
  return (
    
      <div className="sticky top-0 z-50 w-full border border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* left section */}

            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-2xl">
                  <span className=" bg-linear-to-r from-purple-600 to-indigo-600  dark:from-purple-400 bg-clip-text text-transparent">
                    Tushar
                  </span>
                  <span className="text-foreground">Code</span>
                </span>
              </Link>
            </div>


            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href={"/articles"}
                className="text-md font-medium text-foreground transition-colors hover:text-foreground"
              >
                Articles
              </Link>

              <Link
                href={"/contact"}
                className="text-md font-medium text-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>

              <Link
                href={"/about"}
                className="text-md font-medium text-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>

              <Link
                href={"/dashboard"}
                className="text-md font-medium text-foreground transition-colors hover:text-foreground"
              >
                Dasahboard
              </Link>
            </div>

            {/* Right section  */}

            <div className="flex items-center gap-4">
              <Searchinput />
              <ToggleMode />

            <div className="hidden md:flex items-center gap-2">
              <Button>Login</Button>
              <Button>Signup</Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Navbar;
