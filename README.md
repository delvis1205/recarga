# R.J.A | Morásio Digital

Recarga Jogo Angola — R.J.A
Site/E-commerce estático para venda de itens e recarga de jogos (Free Fire, Delta Force, FC Mobile, Black Clover M, Blood Strike, etc).

Site funcional (ao vivo): https://recargajogoangola.shop
📌 Sobre o Projeto

Recarga Jogo Angola é uma plataforma online para compra de diamantes e créditos em jogos como Free Fire, Black Clover, Delta Force e outros.
O site oferece um catálogo de produtos, carrinho de compras, formulário de pedidos integrado ao WhatsApp e automação de confirmação via n8n com envio de e-mail e fatura em PDF.

🌍 Foco: jogadores em Angola
💎 Missão: facilitar recargas seguras e rápidas em jogos online
⚡ Tecnologias: HTML, CSS, JavaScript, n8n, Zoho Mail

✨ Funcionalidades

📋 Catálogo de Produtos com todos os pacotes de recargas.

🛒 Carrinho de Compras com opção de:

Adicionar/remover produtos

Alterar quantidade

Continuar comprando ou finalizar pedido

📝 Formulário de Pedido:

Nome, sobrenome e e-mail

ID do jogo e nickname

Seleção do método de pagamento

Envio automático dos dados para WhatsApp e n8n

🤖 Automação com n8n:

Recebe os pedidos via webhook /pedido

Envia e-mail de confirmação para cliente e admin

Gera e envia fatura em PDF

Integração com Zoho Mail (SMTP)

💬 Suporte via WhatsApp e página dedicada no site

📜 Páginas institucionais:

Termos de Serviço

Política de Privacidade

Contato

Suporte

🛠️ Tecnologias Utilizadas

Frontend:

HTML5, CSS3, JavaScript

Layout responsivo

Backend/Automação:

n8n (webhooks, e-mails, geração de PDFs)

Redis (armazenamento temporário de pedidos)

Zoho Mail (SMTP para envio de e-mails)

Integrações:

WhatsApp (envio automático de mensagens com dados do pedido)

Pagamentos: Presencial, Express, PayPay AO, Unitel Money, IBAN

🚀 Estrutura do Projeto
/index.html        -> Catálogo de produtos
/carrinho.html     -> Carrinho de compras
/formulario.html   -> Formulário de pedidos
/termos.html       -> Termos de Serviço
/privacy.html      -> Política de Privacidade
/contato.html      -> Página de contato (form -> WhatsApp)
/suporte.html      -> Suporte via WhatsApp
/assets/           -> Imagens, CSS, JS

📦 Fluxo do Pedido

Cliente escolhe produto em /index.html → adiciona ao carrinho

Ao finalizar, é redirecionado para /formulario.html com os itens do pedido

Preenche dados (nome, e-mail, ID, nickname, pagamento)

Dados são enviados para:

WhatsApp da empresa: +244 973929712

Webhook n8n: https://n8n.recargajogoangola.shop/webhook-test/pedido

n8n processa:

Armazena no Redis (pedido:{numero})

Envia e-mail de confirmação para cliente e admin

Gera fatura PDF e envia como anexo

📧 Confirmação de Pedido

E-mail para o cliente: inclui número do pedido, produto, ID, nickname e pagamento

E-mail para o administrador: inclui todos os detalhes do pedido

PDF da fatura é anexado ao e-mail

🔑 Métodos de Pagamento

💵 Presencial

⚡ Express → 930441438

📱 PayPay AO → 930441438

📲 Unitel Money → 930441438

🏦 Transferência IBAN → 0040.0000.9841.5347.1016.4

📞 Suporte

WhatsApp: 973 929 712

Página de suporte: /suporte.html

👨‍💻 Contribuição

Faça um fork do projeto

Crie sua branch: git checkout -b minha-feature

Commit suas mudanças: git commit -m 'feat: minha nova funcionalidade'

Push: git push origin minha-feature

Abra um Pull Request

📄 Licença

Este projeto é propriedade da Recarga Jogo Angola.
Uso e distribuição não autorizados não são permitidos.
