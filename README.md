
# 📱 CrazyStackReactNativeApp

Este repositório contém um projeto **React Native** utilizando **Expo** e **TypeScript**, desenvolvido como parte do curso **CrazyStack**.

## 📑 Índice

- [🚀 Recursos e Tecnologias](#recursos-e-tecnologias)
- [🔧 Pré-requisitos](#pré-requisitos)
- [⚙️ Instalação e Configuração](#instalação-e-configuração)
- [📂 Estrutura de Pastas](#estrutura-de-pastas)
- [🧩 Atomic Design](#atomic-design)
- [📐 Feature Sliced Design](#feature-sliced-design)
- [📜 Scripts Disponíveis](#scripts-disponíveis)
- [🤝 Contribuindo](#contribuindo)
- [📄 Licença](#licença)
- [📞 Contato](#contato)

---

## 🚀 Recursos e Tecnologias

Este projeto utiliza as seguintes tecnologias e bibliotecas principais:

- **React Native** — Framework para desenvolvimento mobile multiplataforma
- **Expo** — Facilita o desenvolvimento e a compilação do app
- **TypeScript** — Linguagem com tipagem estática para maior segurança
- **React Navigation** — Gerenciamento de navegação entre telas
- **React Hook Form + Yup** — Gerenciamento e validação de formulários
- **TanStack Query (React Query)** — Manipulação eficiente de chamadas assíncronas
- **Moment.js e date-fns** — Manipulação de datas
- **React Native Maps** — Integração com mapas nativos
- **Eslint e Prettier** — Padronização de código
- **Jest + Testing Library** — Testes automatizados

---

## 🔧 Pré-requisitos

Antes de instalar, certifique-se de ter:

- **Node.js** (`20+`)
- **npm** ou **Yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Android Studio** (para rodar no Android) ou **Xcode** (para iOS)

---

## ⚙️ Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/gumiranda/CrazyStackReactNativeApp.git
   cd CrazyStackReactNativeApp
   ```

2. Instale as dependências:

   ```bash
   yarn
   ```

3. Para iOS (se estiver em um Mac):

   ```bash
   cd ios && pod install && cd ..
   ```

4. Para rodar o app:

   ```bash
   yarn start-expo  # Para rodar com Expo
   ```

---

## 📂 Estrutura de Pastas

```
📦 CrazyStackReactNativeApp
├── 📁 android/                   # Projeto nativo Android  
├── 📁 ios/                       # Projeto nativo iOS  
├── 📁 assets/                    # Imagens e fontes  
├── 📁 generators/                # Scripts de geração de código (Plop)  
├── 📁 src/  
│   ├── 📁 @types/                # Definições de tipos  
│   ├── 📁 app/                   # Lógica principal do app  
│   ├── 📁 assets/                # Recursos do app  
│   ├── 📁 shared/                # Código compartilhado  
│   │   ├── 📁 api/               # Chamadas de API  
│   │   ├── 📁 libs/              # Bibliotecas auxiliares  
│   │   ├── 📁 ui/                # Componentes de UI  
│   │   │   ├── 📁 atoms/         # Componentes básicos  
│   │   │   ├── 📁 molecules/     # Componentes compostos  
│   │   │   ├── 📁 organisms/     # Componentes complexos  
│   │   │   └── 📁 templates/     # Estruturas de layout  
│   │   └── 📁 utils/             # Funções utilitárias  
│   ├── 📁 slices/                
│   │   ├── 📁 appointments/      # Funcionalidades de agendamentos  
│   │   │   ├── 📁 entities/      # Entidades de agendamentos  
│   │   │   ├── 📁 features/      # Funcionalidades específicas  
│   │   │   ├── 📁 processes/     # Processos e requisições  
│   │   │   └── 📁 screens/       # Telas relacionadas  
│   │   └── 📁 general/           # Estado global geral  
│   └── 📄 navigation.d.ts        # Tipos de navegação  
├── 📄 .eslintrc.js               # Configuração do ESLint  
├── 📄 .prettierrc                # Configuração do Prettier  
├── 📄 package.json  
└── 📄 tsconfig.json              # Configuração do TypeScript  
```

---

## 🧩 Atomic Design

O projeto utiliza o conceito de **Atomic Design** para organizar os componentes de UI. Essa metodologia divide os componentes em cinco categorias:

- **Átomos**: Componentes básicos e indivisíveis, como botões e inputs.
- **Moléculas**: Combinações simples de átomos, formando componentes mais complexos.
- **Organismos**: Grupos de moléculas e átomos que formam seções distintas da interface.
- **Templates**: Estruturas de layout que organizam organismos em uma página.
- **Páginas**: Instâncias específicas de templates com conteúdo real.

---

## 📐 Feature Sliced Design

O **Feature Sliced Design** é uma abordagem para organizar o código baseado em funcionalidades. Ele ajuda a manter o projeto escalável e fácil de entender, dividindo o código em:

- **Camadas**: Separação lógica do código em camadas como UI, lógica de negócios, etc.
- **Segmentos de Funcionalidade**: Cada funcionalidade é isolada, facilitando a manutenção e evolução do código.
- **Modularidade**: Promove a reutilização de código e a independência entre funcionalidades.

---

## 📜 Scripts Disponíveis

No `package.json`, os seguintes comandos estão disponíveis:

- **Iniciar com Expo**:  
  ```bash
  yarn start-expo
  ```
- **Rodar no Android**:  
  ```bash
  yarn android
  ```
- **Rodar no iOS** (Mac):  
  ```bash
  yarn ios
  ```
- **Limpar cache do React Native**:  
  ```bash
  yarn c
  ```
- **Gerar código com Plop**:  
  ```bash
  yarn generate
  ```
- **Compilar APK** (Android):  
  ```bash
  yarn apk
  ```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um **fork** do projeto
2. Crie uma nova branch: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona minha nova feature'`
4. Faça o push: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 📞 Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **GitHub**: [gumiranda/CrazyStackReactNativeApp](https://github.com/gumiranda/CrazyStackReactNativeApp)
- **Site do curso**: [crazystack.com.br](https://crazystack.com.br)

---

Se este repositório foi útil para você, deixe uma ⭐ no GitHub!
