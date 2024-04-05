import styles from "../project/ProjectForm.module.css";
import { useState } from "react";

import Input from "../form/Input";
import Button from "../form/Button";
import Message from "../layout/Message";

function ServiceForm({ btnText, handleSubmit, projectData }) {
  const [service, setService] = useState([]);
  const [message, setMessage] = useState();

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);

    document.querySelector("#nameService").value = "";
    document.querySelector("#cost").value = "";
    document.querySelector("#description").value = "";
  };

  const handleChange = (e) => {
    setName(document.querySelector("#nameService").value);
    setCost(document.querySelector("#cost").value);
    setDescription(document.querySelector("#description").value);

    setService({ ...service, [e.target.name]: e.target.value });

    if (e.target.type === "number") {
      Number(e.target.value) > projectData.budget - projectData.cost
        ? setMessage(
            "O custo do serviço não pode exceder o orçamento disponível."
          )
        : setMessage("");
    }
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      {message && <Message msg={message} type="error" />}

      <Input
        type="text"
        text="Nome do serviço"
        placeholder="Insira o nome do serviço"
        name="nameService"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        placeholder="Insira o custo do serviço"
        name="cost"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        placeholder="Descreva o serviço"
        name="description"
        handleOnChange={handleChange}
      />

      {name !== "" && cost !== "" && description !== "" ? (
        <Button text={btnText} />
      ) : (
        <Message type="error" msg="Preencha todos os campos." />
      )}
    </form>
  );
}

export default ServiceForm;
