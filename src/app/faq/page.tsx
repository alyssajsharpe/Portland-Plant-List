import styles from "./page.module.scss";
import Navigation from "../../components/navigation/Navigation";
import Footer from "@/components/navigation/Footer";

export default function Faq() {

  return (
    <>
    <Navigation/>
    <div className={styles.page}>
      <h2>FAQ</h2>
      <p>Accordions in progress...</p>
      
      <div className={styles.infoCardWrapper}>
        <div className={styles.infoCard}>
          <h4>Want more information? </h4>
          <p>Visit our main website below</p>
          <a href="https://backyardhabitats.org/" target="_blank"><button className="button primary">Visit Backyard Habitats</button></a>
        </div>
        <div className={styles.infoCard}>
          <h4>Ready to learn more plants? </h4>
            <p>Click the button below to visit a random plant page!</p>
          <a href={`/plants/${Math.floor(Math.random() * 201)}`}><button className="button secondary">View a random plant</button></a>   
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
