# Publicar na Vercel

O projeto funciona sem banco de dados. Produtos, categorias, imagens e configurações estão no repositório; o carrinho e a preparação da mensagem funcionam no navegador.

1. Na Vercel, abra **Add New → Project** e importe [diegocoodes/nevada](https://github.com/diegocoodes/nevada).
2. Selecione **Next.js**, mantenha a raiz do projeto e a branch de produção `main`.
3. Mantenha os comandos definidos no `vercel.json`:

| Configuração     | Valor                           |
| ---------------- | ------------------------------- |
| Node.js          | `24.x`                          |
| Install Command  | `npm ci`                        |
| Build Command    | `npm run build`                 |
| Output Directory | Padrão do Next.js, sem override |

4. Clique em **Deploy**. Não é necessário configurar banco, migrations ou segredos.
5. Confira `/`, `/produtos`, uma página de produto, `/contato` e `/checkout`.

O WhatsApp já está configurado em `src/data/store.ts` como `5527992315115`, correspondente a **+55 27 99231-5115**. Finalizar o pedido abre uma mensagem preenchida com a seleção; o visitante confirma o envio na conversa.

## Domínio próprio

Ao conectar um domínio, você pode definir `SITE_URL=https://seu-dominio.com.br` em **Settings → Environment Variables**, apenas para **Production**, e publicar novamente. A variável é opcional: a aplicação usa o domínio de produção fornecido pela Vercel quando ela está ausente. Em Preview, deixe a variável ausente para usar o endereço de cada deployment.

Mantenha habilitada a opção **Automatically expose System Environment Variables** para permitir o domínio automático. Não cadastre `SITE_URL` como `http://localhost:3000` na hospedagem.

## Atualizar produtos e configurações

Edite `src/data/store.ts`, faça commit e envie para `main`. A integração GitHub–Vercel publica a atualização. Imagens novas devem ser adicionadas em `public/images` e referenciadas pelo caminho público. O catálogo já inclui as seis categorias e os sete produtos da versão local; não é necessário importar dados.

## Referências

- [Next.js na Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Variáveis de sistema](https://vercel.com/docs/environment-variables/system-environment-variables)
- [Node.js na Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
