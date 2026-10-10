import { getSettings } from "@/lib/store-data";
export const metadata = { title: "Privacidade", robots: { index: false } };
export default async function Privacy() {
  const s = await getSettings();
  return (
    <article className="container section prose">
      <p className="eyebrow">SEUS DADOS</p>
      <h1>Privacidade no atendimento.</h1>
      <h2>Dados da sua seleção</h2>
      <p>
        O carrinho é mantido no armazenamento local do seu navegador. Nome,
        telefone, cidade, estado, CEP quando informado e observações são usados
        no navegador para preparar sua mensagem. O site não mantém um banco de
        pedidos ou armazena os dados do formulário no servidor.
      </p>
      <h2>WhatsApp</h2>
      <p>
        Ao continuar, os dados da solicitação são incluídos em uma mensagem e
        compartilhados com o WhatsApp. A abertura da conversa não confirma que a
        mensagem foi enviada ou que o pedido foi concluído. O serviço possui sua
        própria política de privacidade.
      </p>
      <h2>Armazenamento local</h2>
      <p>
        O carrinho permanece neste dispositivo até você remover os itens ou
        limpar os dados do navegador. Este site não utiliza cookies de
        publicidade ou análise e não possui login de clientes.
      </p>
      <h2>Contato e direitos</h2>
      <p>
        Para solicitar acesso, correção ou exclusão de seus dados, entre em
        contato com {s.name}
        {s.email ? (
          <>
            {" "}
            pelo e-mail <a href={`mailto:${s.email}`}>{s.email}</a>
          </>
        ) : (
          " pelos canais comerciais disponibilizados na página de contato"
        )}
        .
      </p>
    </article>
  );
}
