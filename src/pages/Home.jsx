import styles from "./Home.module.css";
import savings from "../assets/images/savings.svg";
import LinkButton from "../components/layout/LinkButton";

function Home() {
  return (
    <section className={styles.homeContainer}>
      <h1>
        Bem Vindo ao <span>Costs</span>!
      </h1>
      <p>Comece a gerenciar seus projetos agora!</p>
      <LinkButton to="/newproject" text="Criar projeto"></LinkButton>
      <img src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
