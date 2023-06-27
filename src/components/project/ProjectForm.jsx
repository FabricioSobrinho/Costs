function ProjectForm() {
  return (
    <div>
      <form>
        <div>
          <input type="text" placeholder="Insira o nome do projeto" />
        </div>
        <div>
          <input type="text" placeholder="Insira o orçamento total" />
        </div>
        <div>
          <select name="Category_id">
            <option disabled> Selecione a categoria</option>
          </select>
        </div>
        <div><input type="submit" value="Enviar projeto" /></div>
      </form>
    </div>
  )
}

export default ProjectForm
