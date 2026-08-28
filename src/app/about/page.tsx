import styles from "./page.module.scss";
import Navigation from "../../components/navigation/Navigation";
import Footer from "@/components/navigation/Footer";

export default function About() {
  return (
     <>
    <Navigation/>
    <div className={styles.page}>
      <h2>Native plants and why they're important</h2>
      <p>Native plants play a crucial role in supporting healthy ecosystems, providing food and habitat for birds, insects, and other wildlife.
        In contrast, invasive species can spread aggressively, displacing native growth and disrupting these delicate systems.
        By learning to identify both, we can make more informed decisions about what we plant, protect, and remove in our own spaces.
      </p>
      <p>This page is dedicated to showcasing native and invasive plant species found in the Portland, Oregon region.
        Our goal is to make it easier to understand what belongs in our local ecosystems and what threatens their balance.
        Whether you're a gardener, hiker, or simply curious about the natural world around you, this resource is designed to help you recognize and appreciate the plant life that shapes the Pacific Northwest.
      </p>
      <p>This project is made possible through the support and collaboration of organizations like Columbia Land Trust and Oregon Bird Alliance, whose work in land conservation and habitat restoration continues to protect the biodiversity of our region.
        Their efforts, combined with community awareness, help ensure that native habitats remain resilient for future generations.
      </p>
      <p>
        Together, we can better understand the plants that surround us and take meaningful steps toward restoring and preserving the natural balance of the Portland landscape.
      </p>

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
