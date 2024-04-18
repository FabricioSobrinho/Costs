import styles from "./ProjectForm.module.css";

import Input from "../form/Input";
import Select from "../form/Select";
import Button from "../form/Button";

import { useState, useEffect } from "react";
import Message from "../layout/Message";

function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [project, setProject] = useState(projectData || {});

  const [visible, setVisible] = useState(false);

  const options = [
    {
      name: "Infra",
      id: 1
    },
    {
      name: "Desenvolvimento",
      id: 2
    },
    {
      name: "Desing",
      id: 3
    },
    {
      name: "Planejamento",
      id: 4
    }
  ];

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
    if (e.target.type === "number") {
      e.target.value >= project.cost ? setVisible(true) : setVisible(false);
    }
  }
  function handleCategory(e) {
    const category = Number(e.target.value);

    setProject({
      ...project,
      category: category
    });
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={submit}>
        <div>
          <Input
            type="text"
            text="Nome do projeto"
            placeholder="Nome projeto"
            name="projectName"
            handleOnChange={handleChange}
            value={project.projectName ? project.projectName : ""}
          />
          {!project.projectName && (
            <Message type="error" msg="Insira o nome do projeto!" />
          )}
        </div>
        <div>
          <Input
            type="Number"
            text={"Orçamento do projeto"}
            placeholder="Orçamento projeto"
            name="budget"
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ""}
          />

          {(!project.budget || project.budget < project.cost) &&
          project.budget < project.cost ? (
            <Message
              msg={`O Valor do orçamento total não pode ser inferior aos custos: R$${project.cost}!`}
              type="error"
            />
          ) : !project.budget ||
            project.budget < project.cost ||
            project.budget < 0 ? (
            <Message
              msg={`Insira um orçamento válido para o projeto!`}
              type="error"
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <Select
            name="categoryId"
            text="Selecione a categoria"
            options={options}
            handleOnChange={handleCategory}
            value={project.category ? project.category : ""}
          />
        </div>
        <div>
          {project.budget && project.projectName && !project.cost ? (
            <Button text={btnText} />
          ) : visible ? (
            project.name ? (
              <Button text={btnText} />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
