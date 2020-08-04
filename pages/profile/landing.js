import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
import Cookie from 'js-cookie'

export default function profile() {
  console.log('hi');
  console.log(Cookie.get('loggedIn'));
//   useEffect(() => {
//     // Update the document title using the browser API
//     console.log(Cookie.get('loggedIn').loggedIn);
//     // Router.replace("/"); 
// // 
//   }, [0]);
  return (
    <>
      <Header />
      <Profile />
      <Footer />
    </>
  );
}
