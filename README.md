# Retém Estética Premium & Loja Distribuidora

Site da Retém Estética Premium, com foco em PPF e películas, e uma área própria da Retém Loja Distribuidora para Nevada Films e Origin Películas. Atendimento pelo WhatsApp **+55 81 8602-0710**. Construído com Next.js 16, React 19 e TypeScript. Funciona sem banco de dados, migrations ou credenciais de servidor.

A página `/` apresenta a estética com hero com fundo preto com luz vermelha difusa, tipografia vermelha ampliada e carro vermelho de perfil. A landing `/distribuidora` usa a composição escura com iluminação vermelha das referências, símbolo RE em fundo claro, benefícios, etapas, marcas, produtos e perguntas frequentes. As demais seções, o catálogo e o checkout compartilham a atmosfera de carvão e vermelho, com amarelo nos destaques do catálogo. As rotas de produtos e o carrinho existentes foram preservados. A Origin possui filtro próprio e atendimento para consulta; seus produtos e fichas técnicas ainda precisam ser cadastrados. Os SVGs Retém e RE em `public/images` são reconstruções vetoriais baseadas nas referências do briefing; substitua pelos arquivos oficiais quando disponíveis.

O catálogo, as categorias e as configurações ficam em [`src/data/store.ts`](src/data/store.ts). O carrinho permanece no navegador com Zustand/localStorage. Ao finalizar, o site prepara uma mensagem com produtos, variantes, atributos, SKU, quantidades, valores e dados informados pelo cliente, e abre a conversa no número configurado. O cliente confirma o envio no WhatsApp.

## Publicar na Vercel

Importe [diegocoodes/nevada](https://github.com/diegocoodes/nevada), selecione **Next.js** e mantenha a raiz do repositório. O `vercel.json` configura `npm ci` e `npm run build`; o projeto utiliza Node.js 24.x. Nenhuma variável de banco ou segredo é necessária.

`SITE_URL` é opcional, para definir um domínio customizado em Production. Sem essa variável, o site usa o endereço fornecido pela Vercel. Veja o [guia de publicação](docs/vercel.md).

## Desenvolvimento

Requer Node.js 24.x e npm:

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. Não é necessário criar `.env`. Para compilar e executar em produção:

```sh
npm run build
npm start
```

## Atualizar o catálogo

Edite os objetos `settings`, `categories` e `products` em [`src/data/store.ts`](src/data/store.ts), faça commit e publique novamente. O site não possui painel administrativo.

- O WhatsApp em `settings.whatsapp` contém país, DDD e número, somente dígitos: `558186020710`.
- Os preços estão em centavos; `priceCents: null` apresenta **Sob consulta**.
- Cada variante tem identificador, SKU, atributos e disponibilidade. Preserve os identificadores ao editar produtos existentes para manter os carrinhos dos visitantes.
- Use imagens locais em `public/images` com caminhos como `/images/lines/ppf-application.webp`.
- Novos domínios de imagens externas precisam ser permitidos em `next.config.ts`.

Os valores e dados de catálogo preservados do desenvolvimento são ilustrativos. Atualize-os com suas condições comerciais antes de divulgar ofertas. `demoMode` mantém o catálogo de demonstração fora dos mecanismos de busca; desative em `settings` quando os dados estiverem prontos.

## Finalização

A mensagem é montada no navegador usando o catálogo do projeto. O checkout valida os dados do cliente, os itens, as quantidades, a disponibilidade e eventuais preços antigos do carrinho. Frete, disponibilidade final e pagamento são confirmados no atendimento.

Não existe registro de pedidos em servidor nem pagamento online. Abrir a conversa não envia automaticamente a mensagem. O carrinho é mantido até o visitante remover seus itens ou limpar o navegador. Dados do formulário não são persistidos pelo site.

## Verificação

```sh
npm run lint
npm run typecheck
npm run test:unit
npx playwright install chromium
npm test
```

Playwright compila a aplicação e abre um servidor de produção na porta 3100. Os testes cobrem catálogo, carrinho, persistência, checkout, destino e conteúdo do WhatsApp, navegação mobile, imagens, animações, movimento reduzido e acessibilidade com axe. A conversa externa é interceptada nos testes; nenhuma mensagem real é enviada. Não há dependência de PostgreSQL.

O workflow [Validate](.github/workflows/ci.yml) executa essas verificações no GitHub.

## Interface e arquivos

O hero usa a imagem ilustrativa de um carro vermelho em perfil sobre fundo preto com luz vermelha difusa, sem grade nem rótulos decorativos, preservando a tipografia animada. As seções seguintes compartilham um único Mesh drift em WebGL por página, com fallback em CSS. A abertura usa o componente de partículas enviado pelo usuário, adaptado em `src/components/ui/vapour-text-effect.tsx`, com limite de partículas e cleanup. Os títulos usam Manrope; os textos e controles usam Inter, ambas locais. As animações respeitam movimento reduzido e param quando a seção ou a aba deixa de estar visível. O seletor de serviços e linhas reaproveita fotografias, informações à esquerda e imagem à direita, com recortes e contornos próprios. A faixa vermelha mantém o texto em movimento. A identidade base está em `src/styles/retem.css`; a direção das referências está em `src/styles/art-direction.css`. Os prompts das imagens estão em [`docs/retem-art-direction.md`](docs/retem-art-direction.md).

```text
src/app           páginas, metadata e rotas Next.js
src/data          catálogo e configurações editáveis no projeto
src/components    hero, seções, navegação, carrinho e componentes visuais
src/features      filtros do catálogo, detalhe e checkout WhatsApp
src/stores        carrinho persistente no navegador
src/lib           validação, helpers e shader
src/styles        estilos da interface
public/images     imagens locais e créditos
public/fonts      fontes locais
tests             testes unitários, navegação e acessibilidade
```

As fontes das imagens estão documentadas em [`public/images/CREDITS.md`](public/images/CREDITS.md). A inclusão dos créditos não substitui as autorizações de uso dos respectivos titulares.
