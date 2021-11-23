import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

export default function Navbar() {

  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };


  const WrapperLink = ({ children, href, ...props }) => (
    <Link href={href} {...props} passHref>
      <a>{children}</a>
    </Link>
  );

  return (
    <nav className="navbar">
      <ul>
        <li>
          <>
            <WrapperLink href="/">
              <button className="btn-logo">NXT</button>
            </WrapperLink>
          </>
        </li>

        {/* user is signed-in and has a username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <>
                <WrapperLink href="/admin">
                  <button className="btn-blue">Write Posts</button>
                </WrapperLink>
              </>
            </li>
            <li>
              <WrapperLink href={`/${username}`}>
                <Image
                  src={user?.photoURL}
                  alt={`/${username} photo`}
                  width={200}
                  height={200}
                />
              </WrapperLink>
            </li>
          </>
        )}

        {/* user is not signed-in OR has not created a username */}
        {!username && (
          <Link href="/enter" passHref>
            <button className="btn-blue">Log in</button>
          </Link>
        )}
      </ul>
    </nav>
  );
}