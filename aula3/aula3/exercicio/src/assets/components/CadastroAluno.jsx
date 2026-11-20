import { useEffect, useState } from "react";   

    const API = 'http://localhost:9090/livros'

    export default function CadastroAlunos() {
        const [nome, setNome] = useState("");
        const [email, setEmail] = useState("");
        const [Alunos, setAlunos] = useState([]);
        const [idEdicao, setIdEdicao] = useState(null);
    
    
    
        async function listarAlunos() {
        const resposta = await fetch(API)

        if (resposta.ok) {
            setAlunos(await resposta.json())
        }
    }

    async function cadastrar(Alunos) {
        const resposta = await fetch(API, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(Alunos)
        })
    
        if (!resposta.ok) {
          alert('Não foi possivel cadastrar o aluno.')
          return
        }
    
        const novoAluno = await resposta.json()
        setAlunos(anteriores => [...anteriores, novoAluno])
        limpar()
      }

      async function salvar(evento) {
        evento.preventDefault()

        const aluno = {
            nome: nome.trim(),
            email: email.trim()
        }

        if (idEdicao === null) {
            await adicionar(aluno)
        } else {
            const resposta = await fetch(`${API}/${idEdicao}`, {
                method: `PUT`,
                headers: {'Content-Type': 'application/json'},
            })

            if (!resposta.ok) {
                alert('Não foi possivel atualizar o aluno.')
                return
            }

            const alunoAtualizado = await resposta.json()

            setAlunos(anteriores =>
                anteriores.map(aluno =>
                    aluno.id === idEdicao ? alunoAtualizado : aluno
                )
            )
            limpar()
        }
      }

      async function remover(id) {
        const resposta = await fetch(`${API}/${id}`,)
      }
    }