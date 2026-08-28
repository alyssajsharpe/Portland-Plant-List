import styles from "./page.module.scss";
import Navigation from "../../components/navigation/Navigation";
import Footer from "@/components/navigation/Footer";
import WebViewer from "@/components/webviewer";

export default function verificationForm() {
  return (
     <>
    <Navigation/>
      <div className={styles.page}>
        <h2>Certification Determination Form</h2>
        <p>Note: Please do not refresh page, as your info will be reset. </p>
        <WebViewer/>
      </div>
      <Footer />
    </>
  );
}
