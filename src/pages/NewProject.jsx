import styles from "./NewProject.module.css";

import ProjectForm from "../components/project/ProjectForm";

import { useNavigate } from "react-router-dom";


function NewProject() {
  const history = useNavigate();

  function createPost(project) {
    //inicializacao
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //redirect
        history("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <div className={styles.formContainer}>
        <ProjectForm btnText="Criar projeto" handleSubmit={createPost} />
      </div>
    </div>
  );
}

export default NewProject;
