import styles from "./NewProject.module.css";

import ProjectForm from "../components/project/ProjectForm";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Message from "../components/layout/Message";

function NewProject() {
  const history = useNavigate();
  const [errors, setErrors] = useState(null);
  const createPost = async (project) => {
    try {
      await setErrors(null);
      await axios.post("http://localhost:5065/projects", project);

      history("/projects", {
        state: { message: "Projeto criado com sucesso!" },
      });
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className={styles.newProjectContainer}>
      {errors &&
      <Message type={"error"} time={3000} msg={errors}/>
      }
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <div className={styles.formContainer}>
        <ProjectForm btnText="Criar projeto" handleSubmit={createPost} />
      </div>
    </div>
  );
}

export default NewProject;
