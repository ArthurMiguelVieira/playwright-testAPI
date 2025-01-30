# Playwright API/UI Test Automation Framework

🔍 **Automação de testes E2E e API usando Playwright** para o sistema de blog [Conduit](https://conduit.bondaracademy.com/). Inclui exemplos de mocks, autenticação JWT e CRUD de artigos.

## 🚀 Funcionalidades Principais
- **Testes de UI** com interações realistas
- **Mock de respostas da API** para testes isolados
- **Autenticação JWT** com armazenamento seguro de token
- **Operações CRUD** completas de artigos
- **Test Data Management** com arquivos JSON


## ⚙️ Estrutura do Projeto

## 🧪 Casos de Teste Implementados
1. **Mock de Artigos**  
   - Substitui dados da API por valores controlados
   - Valida exibição correta na UI

2. **Criação de Artigo**  
   - Preenchimento de formulário complexo
   - Validação via resposta da API e UI
   - Cleanup automático (delete após teste)

3. **Exclusão de Artigo**  
   - Deleção via API request
   - Validação de remoção na UI

4. **Autenticação Global**  
   - Login via API
   - Armazenamento de token JWT
   - Reuso em múltiplos testes


## 📊 Melhores Práticas Implementadas
- Page Object Model (embutido nos locators)
- Mock de rede para testes isolados
- Setup/Teardown global
- Validação em múltiplas camadas (API + UI)
- Configuração de ambiente separada

## Execução 
- npm playwright test 'workingWithAPI.spec.ts' --project=chromium --ui
