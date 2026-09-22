# 📋 Sistema de Cadastro de Clientes — Inflex Indústria

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21%20%2F%2017-orange.svg)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)](https://www.sqlite.org/)

Sistema corporativo completo para gestão e emissão da Ficha Cadastral de Clientes da **Inflex Indústria de Embalagens**. O sistema conta com um assistente guiado em etapas (wizard) no frontend, persistência de dados em SQLite e um motor de renderização de PDFs oficiais com alta fidelidade visual.

---

## 🌐 Idiomas / Languages
- [🇧🇷 Português](#-português)
- [🇺🇸 English](#-english)

---

# 🇧🇷 Português

## 📌 Visão Geral

A aplicação simplifica e padroniza o fluxo de cadastro de novos clientes e atualização cadastral:
1. **Frontend Guiado:** Formulário em etapas (Wizard) para captura de dados operacionais, societários, fiscais, endereços, contatos, referências bancárias e comerciais.
2. **Personalização Dinâmica:** Aba administrativa dedicada para gerenciar opções dinâmicas de seleção (representantes, segmentos de mercado, tipos e grupos de cliente).
3. **Geração Automatizada de PDF:** Geração da Ficha Cadastral oficial de 4 páginas (Capa de Documentos, Ficha Cadastral, Solicitação de Informações Bancárias e Referências Comerciais) em formato A4, pronta para impressão e assinatura.
4. **Auto-inicialização de Dados:** Criação automática do banco de dados SQLite e injeção de parâmetros iniciais no primeiro arranque, sem necessidade de scripts manuais.

---

## 🚀 Principais Funcionalidades

- **Wizard Multi-Etapas:**
  - **Passo 1 (Operação):** Tipo de cadastro customizável, representante de vendas e fonte das informações.
  - **Passo 2 (Empresa):** CNPJ, Razão Social, Nome Fantasia, Inscrição Estadual, Suframa condicional, data de fundação e faturamento.
  - **Passo 3 (Endereço & Contatos):** Endereço principal, cobrança e entrega independentes, contatos corporativos e financeiros.
  - **Passo 4 (Sócios & Referências):** Quadro societário, referências bancárias (múltiplas contas) e comerciais com histórico financeiro.
  - **Passo 5 (Revisão & Finalização):** Pré-visualização instantânea, botão de reset e geração do PDF final.
- **Gerenciador de Opções:** Cadastro, edição e exclusão de opções utilizadas nos campos de seleção do formulário.
- **Visualizador de Impressão:** Modal com preview direto do PDF gerado via blob sem necessidade de download externo prévio.
- **Tema Claro / Escuro:** Suporte a alternância de tema com persistência local.
- **Persistência Inteligente:** Atualização automática caso o CNPJ já exista no banco (upsert) ou criação de novo registro.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** com **TypeScript**
- **Vite 8** (Build tool rápida)
- **TailwindCSS 4** (Estilização modular)
- **React Router Dom 7** (Navegação SPA)
- **Axios** (Comunicação com API REST)

### Backend
- **Java 21** (compatível com Java 17+)
- **Spring Boot 3** (Web, Data JPA, Validation)
- **SQLite 3** via JDBC + Hibernate Community Dialect
- **OpenHTMLtoPDF / Flying Saucer** (Renderização precisa de HTML/CSS para PDF)
- **Thymeleaf** (Template engine para montagem das páginas do PDF)

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior) e **npm**
- **JDK 17 ou 21** configurado (`JAVA_HOME`)
- **Git**

---

## 💻 Como Rodar o Projeto

### 1. Clonando o Repositório
```bash
git clone https://github.com/nilo415/registration-system-ifx.git
cd registration-system-ifx
```

### 2. Executando o Backend
Abra o terminal na pasta do backend:
```bash
cd backend

# No Windows (PowerShell / CMD):
.\mvnw.cmd spring-boot:run

# No Linux / macOS:
./mvnw spring-boot:run
```
> **Nota:** No primeiro arranque, o backend criará automaticamente a pasta `local_data`, o arquivo `database.db` e todas as opções padrão do formulário. A API estará acessível em `http://localhost:8080`.

### 3. Executando o Frontend
Em outro terminal, acesse a pasta do frontend:
```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
Abra o navegador em `http://localhost:5173`.

---

## 📂 Estrutura de Pastas

```text
cadastro-stm/
├── backend/                        # Aplicação Spring Boot
│   ├── local_data/                 # Banco SQLite e PDFs gerados (ignorado no Git)
│   ├── src/main/java/com/inflex/registration_system/
│   │   ├── config/                 # Configurações de CORS, Web e Inicialização
│   │   ├── controller/             # Endpoints REST (/api/registration, /api/options)
│   │   ├── dto/                    # Objetos de transferência de dados (DTOs)
│   │   ├── entity/                 # Entidades JPA (SQLite)
│   │   ├── repository/             # Interfaces Spring Data JPA
│   │   └── service/                # Regras de negócio, geração de PDF e opções
│   ├── src/main/resources/
│   │   ├── templates/              # registration_form.html (Template Thymeleaf do PDF)
│   │   └── application.properties  # Configurações de porta, storage e banco
│   └── pom.xml                     # Dependências Maven
├── frontend/                       # Aplicação React SPA
│   ├── src/
│   │   ├── assets/                 # Logotipos e imagens oficiais
│   │   ├── components/             # Layout, Header, Sidebar e componentes comuns
│   │   ├── contexts/               # ThemeContext e RegistrationContext
│   │   ├── features/register/      # Steps do assistente e modais de referências
│   │   ├── pages/                  # Dashboard, RegisterPage e OptionsManagerPage
│   │   └── services/               # Clientes de API Axios
│   ├── package.json
│   └── vite.config.ts
├── .gitignore                      # Regras de exclusão raiz
└── README.md                       # Documentação do projeto
```

---

<br/>

# 🇺🇸 English

## 📌 Overview

The **Client Registration System** streamlines and standardizes the client onboarding and cadastral update process for **Inflex Indústria de Embalagens**:
1. **Guided Frontend:** Multi-step wizard capturing operational, legal, tax, address, contact, banking, and commercial references.
2. **Dynamic Form Options:** Dedicated administrative module to customize dropdown values (sales representatives, market segments, client types and groups).
3. **Automated PDF Generation:** High-fidelity 4-page official document (Document Checklist Cover, Registration Form, Banking Info Request, and Commercial References) formatted in A4 standard for signature and printing.
4. **Zero-Config Database:** Automatically provisions the SQLite database file and seeds default reference data on first startup.

---

## 🚀 Key Features

- **Multi-Step Wizard:**
  - **Step 1 (Operation):** Customizable registration title, sales representative, and information source.
  - **Step 2 (Company):** CNPJ, Corporate Name, Trade Name, State Registration, optional Suframa, founding date, and revenue.
  - **Step 3 (Addresses & Contacts):** Independent operational, billing, and delivery addresses, corporate and accounts payable contacts.
  - **Step 4 (Partners & References):** Shareholders list, multiple bank accounts, and commercial trade references.
  - **Step 5 (Review & Submission):** Instant form review, reset capabilities, and final PDF generation.
- **Options Manager:** Full CRUD for dropdown options dynamically rendered across the form.
- **Print Preview Modal:** Real-time PDF preview dialog using inline blobs without requiring forced file downloads.
- **Dark & Light Mode:** Seamless theme switching with local storage persistence.
- **Smart Upsert Persistence:** Automatically updates existing records by CNPJ or registers new entries in SQLite.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite 8** (Fast next-gen frontend tooling)
- **TailwindCSS 4** (Utility-first modular styling)
- **React Router Dom 7** (SPA routing)
- **Axios** (REST API client)

### Backend
- **Java 21** (or Java 17+)
- **Spring Boot 3** (Web, Data JPA, Validation)
- **SQLite 3** via JDBC + Hibernate Community Dialect
- **OpenHTMLtoPDF / Flying Saucer** (Pixel-perfect HTML/CSS to PDF engine)
- **Thymeleaf** (Template engine for PDF markup)

---

## 📋 Prerequisites

Make sure you have installed:
- **Node.js** (v18+) and **npm**
- **Java JDK 17 or 21** (`JAVA_HOME` properly configured)
- **Git**

---

## 💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/nilo415/registration-system-ifx.git
cd registration-system-ifx
```

### 2. Run the Backend
Open a terminal in the `backend` folder:
```bash
cd backend

# On Windows (PowerShell / CMD):
.\mvnw.cmd spring-boot:run

# On Linux / macOS:
./mvnw spring-boot:run
```
> **Note:** On its first launch, Spring Boot automatically creates `./local_data/database.db` and populates all initial configuration options. The API will listen on `http://localhost:8080`.

### 3. Run the Frontend
In another terminal, navigate to `frontend`:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📄 License

Internal proprietary software developed for **Inflex Indústria de Embalagens**. All rights reserved.
