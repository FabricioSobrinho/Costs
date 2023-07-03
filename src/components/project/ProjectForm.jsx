import styles from "./ProjectForm.module.css"

import Input from "../form/Input"
import Select from "../form/Select"
import Button from "../form/Button"

import { useState, useEffect} from "react"

function ProjectForm({btnText}) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => resp.json())  // Adicionado o retorno da resposta json()
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
  
  return (
    <div>
      <form className={styles.form}>
        <div>
          <Input
            type="text"
            text="Nome do projeto"
            placeholder="Nome projeto"
            name="name"
          />
        </div>
        <div>
        <Input
            type="Number"
            text="Orçamento do projeto"
            placeholder="Orçamento projeto"
            name="budget"
          />
        </div>
        <div>
         <Select name="categoryId" text="Selecione a categoria" options={categories}/>
        </div>
        <div>
         <Button text={btnText}/>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
