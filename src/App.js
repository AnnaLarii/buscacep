//Bloco de importação do código
import { useState } from "react"; // UseState é um book do react
import { FiSearch } from "react-icons/fi";
import './style.css'; // importando o estilo da página
import api from "./services/api" // importando api

function App() {

  const [input, setInput] = useState(''); //useState pesquisar (ativ), criando uma função para alterar  valor de uma variável // receber o valor atual
  const [cep, setCEP] = useState({}); // objeto vazio, recebendo via api

  async function handleSearch(){ // função assicrona, pq estamos fazendo aquisição de api, é uma função que vai esperar uma resposta e devido a demora, atribue uma assicroca carrega sem finalizar uma função

    if(input === ''){ // estou vereficando se o usuario preencheu o espaço do CEP
      alert("Preencha algum CEP!")
        return; // retorna o alerta de que não foi preenchido o campo que solicita o CEP
    }
    
    try{ // Vai executar o que eu quero que aconteça
      const response = await api.get(`${input}/json`) // vai receber o valor da api
      setCEP(response.data) 
      setInput("")
    }catch{ // Quando a execução dá errado, o catch entra em ação
        alert("Erro ao buscar CEP!")
        setInput("")
      }
  }

// SOBRE TRY E CATCH, são responsaveis por validar os erros que acontecem na execução da função

return ( // Retornando react HTML, vai retornar a página de HTML
  <div className="container">
    <h1 className="title">Buscador CEP</h1>

    <div className="containerInput">
      <input
      type="text"
      placeholder="Digite seu CEP..."  //texto
      value={input} //valor do input
      onChange={(e) => setInput(e.target.value)} // Onchange (pesquisa) captura tudo que vai ser digitado, pega qualquer tecla que foi inserido no input, é insetado na variavel input
      />

      <button className="buttonSearch" onClick={handleSearch}> 
        <FiSearch size={25} color="#FFF"/>
      </button>
    </div>

    {Object.keys(cep).length > 0 && (
    <main className="main">
      <h2>CEP: {cep.cep}</h2>
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
    </main>
    )}
  </div>
);
}

export default App;
