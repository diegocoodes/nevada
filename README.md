# Retém Estética Premium & Loja Distribuidora

Site da Retém Estética Premium, com foco em PPF e películas, e uma área própria da Retém Loja Distribuidora para Nevada Films e Origin Películas. Atendimento pelo WhatsApp **+55 27 99231-5115**. Construído com Next.js 16, React 19 e TypeScript. Funciona sem banco de dados, migrations ou credenciais de servidor.

As páginas `/` e `/distribuidora` usam a composição da referência de campanha, adaptada ao preto, vermelho e amarelo da RETÉM. Os heroes combinam fotografias reais com títulos em Barlow Condensed. A home apresenta proteção, serviços interativos, orçamento, marcas, galeria, perguntas frequentes e localização. A distribuidora reúne benefícios, marcas, linhas, produtos e atendimento. Sobre, contato, catálogo e checkout seguem a mesma identidade. As duas landings possuem entradas animadas, revelações na rolagem, parallax discreto e interações nos cartões e botões, com respeito a movimento reduzido. Não há contadores ou numeração decorativa. A Origin possui filtro próprio e atendimento para consulta; seus produtos e fichas técnicas ainda precisam ser cadastrados. Os SVGs Retém e RE em `public/images` são reconstruções vetoriais baseadas nas referências do briefing; substitua pelos arquivos oficiais quando disponíveis.

O catálogo, as categorias e as configurações ficam em [`src/data/store.ts`](src/data/store.ts). O carrinho permanece no navegador com Zustand/localStorage. Ao finalizar, o site prepara uma mensagem com produtos, variantes, atributos, SKU, quantidades, valores e dados informados pelo cliente, e abre a conversa no número configurado. O cliente confirma o envio no WhatsApp.

Os serviços da estética e as perguntas frequentes ficam em [`src/data/services.ts`](src/data/services.ts). A home apresenta PPF, películas automotivas e arquitetônicas, coat cerâmica Gyeon, polimento, cristalização e recuperação de faróis. Cada serviço abre o contato com o assunto preenchido. Os dados de atendimento usam o material fornecido: Instagram `@retem.es`, Rodovia do Sol, 1528, Praia de Itaparica, Vila Velha, ES. O CEP `29102-020` segue a informação mais recente do perfil enviada no briefing.

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

- O WhatsApp em `settings.whatsapp` contém país, DDD e número, somente dígitos: `5527992315115`.
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

Os estilos atuais ficam em `src/styles/studio-design.css` e `src/styles/distributor-design.css`. Os títulos usam Barlow Condensed e os textos e controles usam Barlow, fontes locais com licenças em `public/fonts/barlow*`. O hook `src/hooks/use-landing-motion.ts` usa GSAP e ScrollTrigger nas duas landings, com cleanup ao navegar, suporte a conteúdo carregado durante a navegação e cancelamento quando o visitante prefere movimento reduzido. `src/styles/landing-motion.css` reúne interações de cartões, fotos, botões e seletores. O conteúdo é renderizado no servidor e permanece legível sem JavaScript. Não há WebGL nem tela de abertura bloqueando as páginas. `src/components/studio-services.tsx` abre o contato com o serviço preenchido. As fotografias vieram de Unsplash e Pexels; autores e páginas originais estão em [`public/images/CREDITS.md`](public/images/CREDITS.md). São imagens ilustrativas de contexto, com acesso ao perfil oficial para trabalhos reais. Os estilos anteriores permanecem como base para os componentes do catálogo.

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
