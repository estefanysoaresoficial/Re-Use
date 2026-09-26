ReUse Brasil — marketplace de alimentos excedentes
====================================================

Como abrir
-----------
1. Descompacte o arquivo .zip.
2. Abra o arquivo "index.html" em qualquer navegador (duplo clique nele já funciona).
   Não precisa de servidor, internet (exceto para a fonte de texto) ou instalação.

Estrutura de arquivos
----------------------
index.html      -> estrutura do site e menu
app.js          -> todos os dados (empresas e produtos) e toda a lógica (roteamento,
                   reservas, favoritos, cadastro, painel da empresa)
assets/logo.jpg -> logo do ReUse Brasil usada no cabeçalho e na página inicial

Navegação (protótipo funcional)
--------------------------------
Início -> Empresas -> página da empresa -> Produto (detalhe) -> Reserva
                                          -> Reservar direto pelo card do produto

Páginas disponíveis
--------------------
- Início: busca, empresas parceiras, Última Chance, impacto e ODS 12
- Ofertas: todos os produtos de todas as empresas, com busca, filtro por categoria e ordenação
- Empresas: lista completa das 8 empresas fictícias
- Página da empresa: perfil (nota, horário, endereço) + todos os produtos daquela empresa
- Produto (detalhe): foto, descrição, preço original x preço ReUse, % de economia, horário e
  endereço de retirada, botão "Reservar oferta" que gera um código de retirada
- Última Chance: produtos com maior urgência de retirada, com destaque visual próprio
- Favoritos: empresas e produtos marcados com o coração
- Minhas reservas: lista de reservas com código, status e opção de marcar como retirado ou cancelar
- Meu perfil: nome, e-mail, localização e histórico de pedidos retirados
- Cadastrar minha empresa / Painel da empresa: formulário de cadastro e um painel simulado
  para publicar novos produtos e acompanhar reservas recebidas
- Impacto / ODS 12: números do projeto e a relação com o Objetivo de Desenvolvimento
  Sustentável 12 (Consumo e Produção Responsáveis)

Sobre os dados
---------------
Todas as empresas, produtos, reservas e números de impacto são fictícios, criados apenas
para demonstrar o funcionamento do marketplace. Os dados que você gerar durante o uso
(reservas, favoritos, cadastro de empresa, perfil) ficam salvos somente no seu navegador,
através do localStorage — ou seja, existem apenas na sua máquina e não são enviados a
lugar nenhum.

Se quiser reiniciar o protótipo do zero, apague os dados do site no navegador (ou abra o
index.html em uma janela anônima/privada).
