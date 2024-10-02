import "@/styles/globals.css";
import Navbar from "@/components/head/navbar";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const noNavbarPages = [
    "/user/login",
    "/user/regis",
    ];
  return(
    <>
      {!noNavbarPages.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />;
    </>
  ) 
    
}
