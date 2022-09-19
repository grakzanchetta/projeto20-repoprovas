# projeto20-repoprovas

## Rota <span style="color:yellow">**POST**</span>/signup

Essa é uma rota <span style="color:red"> **NÃO** </span> autenticada Sua função é criar novos usuários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email_do_usuario", //string
  "password": "senha_do_usuario", //string
  "confirmPassword":"mesma_senha_informada_acima" //string
}
```
### Regras de Uso: 
A senha deve ter no mínimo 10 caracteres, do contrário, a requisição terminará com erro de status 401 (Unauthorized). Retornará 409 (Conflict) caso tente cadastrar novamente o mesmo e-mail.

## Rota <span style="color:yellow">**POST**</span>/signin
Essa é uma rota <span style="color:red"> **NÃO** </span> autenticada Sua função é fazer login.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email_do_usuario", //string
  "password": "senha_do_usuario" //string
}
```

### Regras de Uso: 
Usuário e senha devem ser compatíveis. E-mail não existente ou incorreto retorna status 422, senha incorreta retorna 401. Requisições bem sucedidas retornam o JWT token necessário para autenticação em <span style="color:crimson"> **TODAS** </span> as rotas descritas a seguir.

# Todas as rotas a seguir são autenticadas com um token JWT no formato 'Bearer'.

## Rota <span style="color:yellow">**POST**</span>/create

Essa rota tem como função realizar a adição de provas.

```json
{

  "name": "nome_da_prova", //string
  "pdfUrl":"link_do_pdf_da_prova", //string
  "categoryId":"id_do_tipo_da_prova", //number
  "teacherDisciplineId": "id_da_relação_entre_disciplina_professor" //number
}
```
Falhar nos requisitos de preenchimento acarreta numa resposta de status 422, informar IDs inexistentes acarretam em erro 404 (not found).

## Rotas <span style="color:green"> **GET** </span>/discipline e /teacher

Ambas as rotas não tem body em sua requisição (Token incorreto ou faltante acarreta em código de resposta 401), apenas o token. O que muda é a resposta da requisição. Na primeira, as provas previamente cadastradas são ordenadas por disciplinas, e na segunda, por professores.

Uma requisição bem sucedida traz o status 200. E no corpo da resposta para a primeira rota:

```json
[
  {
    "number": 1,
    "disciplines": [
      {
        "name": "HTML e CSS",
        "teachersdisciplines": [
          {
            "id": 1,
            "teacherId": 1,
            "disciplineId": 1,
            "teacher": {
              "name": "Frank Pinho"
            },
            "teste": []
          }
        ]
      },
      {
        "name": "Humildade",
        "teachersdisciplines": [
          {
            "id": 4,
            "teacherId": 2,
            "disciplineId": 4,
            "teacher": {
              "name": "Marina Hamori"
            },
            "teste": [
              {
                "id": 3,
                "name": "prova de teste",
                "pdfUrl": "hhttps://www.driven.com.br/",
                "categoryId": 2,
                "teacherDisciplineId": 4,
                "category": {
                  "name": "Prática"
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
```
E para a segunda rota:

```json
[
  {
    "id": 1,
    "name": "Frank Pinho",
    "teachersdisciplines": [
      {
        "id": 1,
        "teacherId": 1,
        "disciplineId": 1,
        "discipline": {
          "id": 1,
          "name": "HTML e CSS",
          "termId": 1
        },
        "teste": []
      },
      {
        "id": 2,
        "teacherId": 1,
        "disciplineId": 2,
        "discipline": {
          "id": 2,
          "name": "JavaScript",
          "termId": 2
        },
        "teste": []
      },
      {
        "id": 3,
        "teacherId": 1,
        "disciplineId": 3,
        "discipline": {
          "id": 3,
          "name": "React",
          "termId": 3
        },
        "teste": [
          {
            "id": 6,
            "name": "prova de teste 3",
            "pdfUrl": "hhttps://www.driven.com.br/",
            "categoryId": 2,
            "teacherDisciplineId": 3,
            "category": {
              "id": 2,
              "name": "Prática"
            }
          },
          {
            "id": 7,
            "name": "prova de teste 3",
            "pdfUrl": "hhttps://www.driven.com.br/",
            "categoryId": 2,
            "teacherDisciplineId": 3,
            "category": {
              "id": 2,
              "name": "Prática"
            }
          }
        ]
      }
    ]
  },
  
]

```