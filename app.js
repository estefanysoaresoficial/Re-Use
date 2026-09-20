/* ReUse Brasil — marketplace de alimentos excedentes (protótipo front-end) */
"use strict";

/* ---------------------------------------------------------------------- */
/* DADOS                                                                  */
/* ---------------------------------------------------------------------- */

var CATEGORIAS = ["Padaria","Hortifruti","Restaurante","Supermercado","Cafeteria","Confeitaria","Mercearia"];

/* ---------------------------------------------------------------------- */
/* IMAGENS: fotografias reais (bancos com licença livre) + fallback       */
/* ---------------------------------------------------------------------- */
/* Estrutura pensada para troca fácil por assets/produtos/ e assets/empresas/
   locais: basta trocar os valores abaixo pelos caminhos dos arquivos. */
var IMG = {
  paes:      "https://images.pexels.com/photos/1118332/pexels-photo-1118332.jpeg?auto=compress&cs=tinysrgb&w=800",
  cafeManha: "https://images.pexels.com/photos/15882841/pexels-photo-15882841/free-photo-of-pastry-in-display-cabinet.jpeg?auto=compress&cs=tinysrgb&w=800",
  frutas:    "https://images.pexels.com/photos/2880348/pexels-photo-2880348.jpeg?auto=compress&cs=tinysrgb&w=800",
  legumes:   "https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg",
  cafe:      "https://images.pexels.com/photos/18394807/pexels-photo-18394807/free-photo-of-a-cup-of-coffee-on-a-table-next-to-a-glass.jpeg?auto=compress&cs=tinysrgb&w=800",
  refeicao:  "https://images.pexels.com/photos/2418486/pexels-photo-2418486.jpeg?auto=compress&w=1260&h=750&dpr=1",
  hero:      "https://images.pexels.com/photos/1118332/pexels-photo-1118332.jpeg?auto=compress&cs=tinysrgb&w=1200"
};
var IMG_GENERICO = IMG.paes; // usado como 2º nível de fallback antes do emoji

function escolherImagemProduto(nome, categoriaEmpresa){
  var n = (nome||"").toLowerCase();
  if(n.indexOf("marmita")>-1 || n.indexOf("jantar")>-1 || n.indexOf("almoço")>-1 || n.indexOf("almoco")>-1 || n.indexOf("combinação")>-1 || n.indexOf("combinacao")>-1) return IMG.refeicao;
  if(n.indexOf("fruta")>-1) return IMG.frutas;
  if(n.indexOf("legume")>-1 || n.indexOf("verdura")>-1 || n.indexOf("raiz")>-1 || n.indexOf("raízes")>-1 || n.indexOf("tubérculo")>-1 || n.indexOf("tuberculo")>-1 || n.indexOf("hortifruti")>-1) return IMG.legumes;
  if(n.indexOf("café da manhã")>-1 || n.indexOf("cafe da manha")>-1) return IMG.cafe;
  if(n.indexOf("doce")>-1 || n.indexOf("bolo")>-1 || n.indexOf("torta")>-1 || n.indexOf("brigadeiro")>-1 || n.indexOf("sobremesa")>-1 || n.indexOf("confeit")>-1) return IMG.cafeManha;
  if(n.indexOf("pão")>-1 || n.indexOf("pães")>-1 || n.indexOf("padaria")>-1 || n.indexOf("salgado")>-1) return IMG.paes;
  if(n.indexOf("mercearia")>-1 || n.indexOf("conserva")>-1 || n.indexOf("tempero")>-1 || n.indexOf("especiaria")>-1 || n.indexOf("grão")>-1 || n.indexOf("grao")>-1 || n.indexOf("cereal")>-1) return IMG.paes;
  return escolherImagemEmpresa(categoriaEmpresa);
}
function escolherImagemEmpresa(categoria){
  switch(categoria){
    case "Hortifruti": return IMG.legumes;
    case "Restaurante": return IMG.refeicao;
    case "Supermercado": return IMG.frutas;
    case "Cafeteria": return IMG.cafe;
    case "Confeitaria": return IMG.cafeManha;
    case "Mercearia": return IMG.paes;
    default: return IMG.paes; // Padaria e demais
  }
}
function extrairCores(strGradiente){
  var m = String(strGradiente||"").match(/#[0-9a-fA-F]{6}/g);
  return (m && m.length>=2) ? [m[0], m[1]] : ["#3F7F3A","#8CA944"];
}
/* fallback em 2 níveis: foto específica -> foto genérica -> emoji sobre gradiente (SVG embutido, nunca quebra) */
window.fallbackImg = function(img){
  var estagio = img.getAttribute("data-estagio") || "1";
  var generico = img.getAttribute("data-generico");
  if(estagio === "1" && generico){
    img.setAttribute("data-estagio","2");
    img.src = generico;
    return;
  }
  img.onerror = null;
  var emoji = img.getAttribute("data-emoji") || "🍽️";
  var c1 = img.getAttribute("data-c1") || "#3F7F3A";
  var c2 = img.getAttribute("data-c2") || "#8CA944";
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs>' +
    '<rect width="400" height="300" fill="url(#g)"/>' +
    '<text x="200" y="168" font-size="120" text-anchor="middle" dominant-baseline="middle">'+emoji+'</text>' +
    '</svg>';
  img.src = "data:image/svg+xml," + encodeURIComponent(svg);
};
function imgHTML(src, alt, emoji, cores, cls){
  var c = cores || ["#3F7F3A","#8CA944"];
  return '<img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy" class="'+cls+'" ' +
    'data-emoji="'+esc(emoji||"🍽️")+'" data-c1="'+c[0]+'" data-c2="'+c[1]+'" data-generico="'+esc(IMG_GENERICO)+'" ' +
    'onerror="fallbackImg(this)">';
}

var EMPRESAS = [
  {
    id:"padaria-pao-do-dia", nome:"Padaria Pão do Dia", categoria:"Padaria", emoji:"🥖",
    cidade:"São Paulo - SP", bairro:"Centro", endereco:"Rua das Acácias, 120 — Centro",
    nota:4.8, avaliacoes:214, funciona:"06:00 – 22:00", retirada:"até 21:30",
    descricao:"Padaria parceira do ReUse Brasil, oferecendo produtos excedentes do dia com preços especiais.",
    cor:"linear-gradient(135deg,#E8B25A,#C97A2E)"
  },
  {
    id:"hortifruti-vida-verde", nome:"Hortifruti Vida Verde", categoria:"Hortifruti", emoji:"🥗",
    cidade:"São Paulo - SP", bairro:"Jardim Sul", endereco:"Rua das Palmeiras, 300 — Jardim Sul",
    nota:4.7, avaliacoes:158, funciona:"07:00 – 20:00", retirada:"até 19:30",
    descricao:"Frutas, legumes e verduras frescos com pequenas imperfeições estéticas, prontos para consumo.",
    cor:"linear-gradient(135deg,#8CC152,#4F8A3E)"
  },
  {
    id:"restaurante-sabor-da-casa", nome:"Restaurante Sabor da Casa", categoria:"Restaurante", emoji:"🍝",
    cidade:"São Paulo - SP", bairro:"Centro", endereco:"Rua XV de Novembro, 45 — Centro",
    nota:4.9, avaliacoes:301, funciona:"11:00 – 23:00", retirada:"até 22:00",
    descricao:"Marmitas e pratos preparados no dia que não foram servidos no horário de pico.",
    cor:"linear-gradient(135deg,#E3672F,#A8431B)"
  },
  {
    id:"mercado-boa-compra", nome:"Mercado Boa Compra", categoria:"Supermercado", emoji:"🛒",
    cidade:"São Paulo - SP", bairro:"Vila Nova", endereco:"Av. Central, 980 — Vila Nova",
    nota:4.6, avaliacoes:412, funciona:"08:00 – 22:00", retirada:"até 21:00",
    descricao:"Produtos de mercearia e laticínios próximos da validade, ainda próprios para consumo.",
    cor:"linear-gradient(135deg,#4A90A4,#2C5F70)"
  },
  {
    id:"cafe-e-pao", nome:"Café & Pão", categoria:"Cafeteria", emoji:"☕",
    cidade:"São Paulo - SP", bairro:"Pinheiros", endereco:"Rua Harmonia, 88 — Pinheiros",
    nota:4.8, avaliacoes:189, funciona:"06:30 – 19:00", retirada:"até 18:30",
    descricao:"Cafeteria de bairro com pães, doces e salgados que sobram do movimento do dia.",
    cor:"linear-gradient(135deg,#9C6B3E,#5E3E22)"
  },
  {
    id:"doce-encanto", nome:"Doce Encanto", categoria:"Confeitaria", emoji:"🍰",
    cidade:"São Paulo - SP", bairro:"Centro", endereco:"Rua Bahia, 210 — Centro",
    nota:4.9, avaliacoes:176, funciona:"09:00 – 20:00", retirada:"até 19:30",
    descricao:"Bolos, tortas e docinhos preparados no dia, com sobra ao final do expediente.",
    cor:"linear-gradient(135deg,#D97AA6,#9C4770)"
  },
  {
    id:"feira-da-roca", nome:"Feira da Roça", categoria:"Hortifruti", emoji:"🧺",
    cidade:"São Paulo - SP", bairro:"Vila Nova", endereco:"Rua Piauí, 77 — Vila Nova",
    nota:4.5, avaliacoes:97, funciona:"06:00 – 14:00", retirada:"até 13:30",
    descricao:"Feira de produtores locais com excedente de fim de feira a preços baixos.",
    cor:"linear-gradient(135deg,#B7C15A,#748034)"
  },
  {
    id:"emporio-grao-nobre", nome:"Empório Grão Nobre", categoria:"Mercearia", emoji:"🫘",
    cidade:"São Paulo - SP", bairro:"Jardim Sul", endereco:"Rua das Oliveiras, 55 — Jardim Sul",
    nota:4.7, avaliacoes:132, funciona:"08:00 – 21:00", retirada:"até 20:30",
    descricao:"Grãos, cereais e conservas com embalagens amassadas ou próximas da validade.",
    cor:"linear-gradient(135deg,#B08D57,#6E5228)"
  }
];
EMPRESAS.forEach(function(e){ e.imagem = escolherImagemEmpresa(e.categoria); });

/* produtos por empresa: [nome, descricao, itens[], precoOriginal, precoReuse, qtd, horaRetirada, emoji, ultimaChance] */
var PRODUTOS_POR_EMPRESA = {
  "padaria-pao-do-dia":[
    ["Kit Café da Manhã","Para começar o dia sem desperdício",["2 pães franceses","2 salgados assados","2 mini doces"],20,8,6,"21h","🥐",false],
    ["Kit Padaria","Seleção variada do fim do dia",["3 pães","2 salgados","1 fatia de bolo"],25,10,4,"21h30","🍞",false],
    ["Kit Doces","Docinhos preparados hoje",["4 doces variados"],18,7,5,"20h","🍩",true],
    ["Kit Salgados","Direto do forno da manhã",["8 salgados variados"],30,12,3,"21h","🥟",true],
    ["Kit Pães","Pães do dia, ainda fresquinhos",["6 pães variados"],15,6,7,"20h30","🥖",false]
  ],
  "hortifruti-vida-verde":[
    ["Kit Frutas","Frutas maduras, ideais para consumo imediato",["Mix de frutas da estação, aprox. 2kg"],28,11,5,"19h","🍎",true],
    ["Kit Legumes","Legumes com pequenas imperfeições",["Mix de legumes, aprox. 2,5kg"],24,9,6,"19h30","🥕",false],
    ["Kit Hortifruti","Combinação de frutas, legumes e verduras",["Sortimento variado, aprox. 3kg"],35,14,4,"19h","🥦",false],
    ["Caixa de Frutas Maduras","Prontas para consumir ainda hoje",["Frutas diversas, aprox. 3kg"],30,10,3,"18h30","🍇",true],
    ["Kit Verduras","Folhas que precisam ser consumidas hoje",["Alface, couve, rúcula e espinafre"],16,6,8,"19h","🥬",true]
  ],
  "restaurante-sabor-da-casa":[
    ["Marmita do Dia","Prato completo preparado no almoço",["Arroz, feijão, proteína e salada"],28,11,10,"15h","🍛",false],
    ["Kit Jantar","Porções do jantar que sobraram",["Prato principal e acompanhamento"],32,13,6,"22h30","🍽️",false],
    ["Kit Almoço","Sobras do almoço executivo",["Prato do dia completo"],26,10,5,"15h30","🍲",true],
    ["Sobremesas","Doces de sobra da cozinha",["3 sobremesas variadas"],18,7,4,"22h","🍮",false],
    ["Combinação Surpresa","O chef decide o que vai no kit",["Prato surpresa do dia"],35,14,5,"22h","🎁",false]
  ],
  "mercado-boa-compra":[
    ["Kit Mercearia","Itens de despensa próximos da validade",["Massas, molhos e enlatados"],40,16,7,"21h","🛍️",false],
    ["Kit Laticínios","Consumo recomendado nos próximos dias",["Leites, queijos e iogurtes"],35,14,5,"20h30","🧀",true],
    ["Kit Frutas","Frutas com validade curta",["Mix de frutas, aprox. 2,5kg"],26,10,6,"20h","🍊",false],
    ["Kit Produtos Próximos da Validade","Itens variados do estoque",["Sortimento diverso de mercearia"],45,18,4,"21h","📦",true],
    ["Cesta Surpresa","Combinação variada do estoque do dia",["Itens diversos, sortimento surpresa"],50,20,3,"21h","🧺",false]
  ],
  "cafe-e-pao":[
    ["Kit Café da Manhã","Pães e frios do balcão da manhã",["Pão, frios e suco"],22,9,5,"18h30","☕",false],
    ["Kit Doces","Doces de vitrine do dia",["3 doces variados"],16,6,6,"18h","🧁",true],
    ["Kit Salgados","Salgados assados na cafeteria",["5 salgados variados"],20,8,4,"18h30","🥪",false],
    ["Kit Pães","Pães de fermentação natural do dia",["4 pães variados"],18,7,5,"19h","🥯",false],
    ["Combo Surpresa","Mix de itens da vitrine",["Combinação variada do dia"],24,9,3,"18h30","🎁",false]
  ],
  "doce-encanto":[
    ["Kit Doces Variados","Docinhos de festa do dia",["6 docinhos variados"],20,8,6,"19h30","🍬",false],
    ["Caixa de Bolos","Fatias de bolo do dia",["4 fatias variadas"],24,9,4,"19h","🎂",true],
    ["Kit Tortas","Fatias de torta preparadas hoje",["3 fatias de torta"],22,8,3,"19h30","🥧",false],
    ["Kit Brigadeiros","Brigadeiros gourmet do dia",["10 brigadeiros variados"],18,7,7,"19h","🍫",false],
    ["Combo Confeitaria","Seleção da confeitaria do dia",["Mix de doces e fatias"],28,11,3,"19h30","🎁",false]
  ],
  "feira-da-roca":[
    ["Caixa de Verduras da Feira","Sobra do fim da feira",["Verduras variadas, aprox. 2kg"],20,7,8,"13h30","🥬",true],
    ["Kit Frutas da Feira","Frutas de produtores locais",["Mix de frutas da estação, aprox. 2kg"],22,8,6,"13h30","🍈",true],
    ["Kit Raízes e Tubérculos","Batata, mandioca e cenoura","",26,10,5,"13h","🥔",false],
    ["Cesta da Roça","Combinação de itens da feira",["Sortimento variado de hortifruti"],30,12,4,"13h30","🧺",false]
  ],
  "emporio-grao-nobre":[
    ["Kit Grãos e Cereais","Arroz, feijão e grãos variados",["3 itens de grãos e cereais"],32,13,5,"20h30","🌾",false],
    ["Kit Conservas","Embalagens amassadas, conteúdo intacto",["4 potes de conservas variadas"],28,11,6,"20h","🥫",false],
    ["Caixa Próxima da Validade","Itens diversos do estoque",["Sortimento variado de mercearia"],38,15,4,"20h30","📦",true],
    ["Kit Temperos e Especiarias","Embalagens com defeito estético",["5 potes de temperos variados"],20,8,7,"20h","🧂",false]
  ]
};

// corrigir array de itens em string única (Kit Raízes e Tubérculos)
PRODUTOS_POR_EMPRESA["feira-da-roca"][2][2] = ["Batata, mandioca e cenoura"];

/* monta lista global de produtos com referência à empresa */
var PRODUTOS = [];
(function montarProdutos(){
  var contador = 1;
  EMPRESAS.forEach(function(emp){
    var lista = PRODUTOS_POR_EMPRESA[emp.id] || [];
    lista.forEach(function(p){
      PRODUTOS.push({
        id: "p" + (contador++),
        empresaId: emp.id,
        nome: p[0],
        descricao: p[1],
        itens: p[2],
        precoOriginal: p[3],
        precoReuse: p[4],
        qtd: p[5],
        retirada: p[6],
        emoji: p[7],
        ultimaChance: p[8],
        imagem: escolherImagemProduto(p[0], emp.categoria)
      });
    });
  });
})();

function economiaPercentual(p){
  return p.precoOriginal > 0 ? Math.round((1 - p.precoReuse / p.precoOriginal) * 100) : 0;
}
function empresaPorId(id){ return EMPRESAS.filter(function(e){ return e.id === id; })[0]; }
function produtoPorId(id){ return PRODUTOS.filter(function(p){ return p.id === id; })[0]; }
function produtosDaEmpresa(id){ return PRODUTOS.filter(function(p){ return p.empresaId === id; }); }
function contarOfertas(empresaId){ return produtosDaEmpresa(empresaId).filter(function(p){ return p.qtd > 0; }).length; }

/* ---------------------------------------------------------------------- */
/* ESTADO (persistido em localStorage)                                    */
/* ---------------------------------------------------------------------- */

var CHAVE = "reuse-brasil-marketplace-v1";
var estado = {
  favEmpresas: [],
  favProdutos: [],
  reservas: [],       // {cod, produtoId, empresaId, data, valor, status}
  perfil: {nome:"", email:"", local:""},
  minhasEmpresas: [], // empresas cadastradas pelo próprio usuário (fictícias, sessão local)
  extraStock: {}      // ajustes de estoque por produtoId (reservas feitas na sessão)
};

function carregarEstado(){
  try{
    var bruto = localStorage.getItem(CHAVE);
    if(bruto){
      var d = JSON.parse(bruto);
      estado.favEmpresas = d.favEmpresas || [];
      estado.favProdutos = d.favProdutos || [];
      estado.reservas = d.reservas || [];
      estado.perfil = d.perfil || {nome:"",email:"",local:""};
      estado.minhasEmpresas = d.minhasEmpresas || [];
      estado.extraStock = d.extraStock || {};
    }
  }catch(e){}
  // aplica ajustes de estoque salvos
  for(var pid in estado.extraStock){
    var p = produtoPorId(pid);
    if(p) p.qtd = Math.max(0, p.qtd - estado.extraStock[pid]);
  }
}
function salvarEstado(){ try{ localStorage.setItem(CHAVE, JSON.stringify(estado)); }catch(e){} }

/* ---------------------------------------------------------------------- */
/* UTILITÁRIOS                                                            */
/* ---------------------------------------------------------------------- */

function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c];}); }
function real(v){ return "R$ " + Number(v).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}); }
function estrelas(nota){ return "★ " + nota.toFixed(1).replace(".",","); }
function codigoReserva(){
  var c = "#RU";
  for(var i=0;i<4;i++) c += "0123456789".charAt(Math.floor(Math.random()*10));
  return c;
}
function dataHoje(){
  var d = new Date();
  return d.toLocaleDateString("pt-BR");
}
function itensTexto(itens){
  if(!itens) return "";
  if(Array.isArray(itens)) return itens.join(" · ");
  return String(itens);
}
function navegar(rota){
  if(location.hash === rota){ renderizar(); window.scrollTo({top:0,behavior:"smooth"}); }
  else location.hash = rota;
}

/* delegação de clique para elementos com data-rota (funciona em qualquer página renderizada) */
document.addEventListener("click", function(e){
  var el = e.target.closest("[data-rota]");
  if(el){ e.preventDefault(); navegar(el.getAttribute("data-rota")); }
});

/* ---------------------------------------------------------------------- */
/* AÇÕES: favoritos, reservas                                             */
/* ---------------------------------------------------------------------- */

function alternarFavEmpresa(id){
  var i = estado.favEmpresas.indexOf(id);
  if(i>-1) estado.favEmpresas.splice(i,1); else estado.favEmpresas.unshift(id);
  salvarEstado(); atualizarContadores(); renderizar();
}
function alternarFavProduto(id){
  var i = estado.favProdutos.indexOf(id);
  if(i>-1) estado.favProdutos.splice(i,1); else estado.favProdutos.unshift(id);
  salvarEstado(); atualizarContadores(); renderizar();
}
function ehFavEmpresa(id){ return estado.favEmpresas.indexOf(id) > -1; }
function ehFavProduto(id){ return estado.favProdutos.indexOf(id) > -1; }

var modal = document.getElementById("modal");
function reservarProduto(produtoId){
  var p = produtoPorId(produtoId);
  if(!p || p.qtd<=0) return;
  var emp = empresaPorId(p.empresaId);
  p.qtd--;
  estado.extraStock[produtoId] = (estado.extraStock[produtoId]||0) + 1;
  var r = {
    cod: codigoReserva(), produtoId: produtoId, empresaId: p.empresaId,
    nome: p.nome, loja: emp.nome, endereco: emp.endereco,
    valor: p.precoReuse, original: p.precoOriginal, data: dataHoje(),
    retirada: p.retirada, status: "reservado"
  };
  estado.reservas.unshift(r);
  salvarEstado(); atualizarContadores();
  document.getElementById("modalTitulo").textContent = "Reserva realizada!";
  document.getElementById("modalTexto").textContent = "Seu produto foi reservado. Retire em " + emp.nome + " (" + emp.endereco + ") dentro do horário informado: " + p.retirada + ".";
  document.getElementById("modalCodigo").textContent = r.cod;
  if(typeof modal.showModal === "function") modal.showModal();
  renderizar();
}
document.getElementById("modalOk").addEventListener("click", function(){ modal.close(); });
document.getElementById("modalIrReservas").addEventListener("click", function(){ modal.close(); });

function marcarRetirado(cod){
  var r = estado.reservas.filter(function(x){return x.cod===cod;})[0];
  if(r && r.status==="reservado"){ r.status="retirado"; salvarEstado(); renderizar(); }
}
function cancelarReserva(cod){
  var idx = -1;
  estado.reservas.forEach(function(r,i){ if(r.cod===cod) idx=i; });
  if(idx>-1){
    var r = estado.reservas[idx];
    if(r.status==="reservado"){
      var p = produtoPorId(r.produtoId);
      if(p) p.qtd++;
      estado.extraStock[r.produtoId] = Math.max(0,(estado.extraStock[r.produtoId]||0)-1);
    }
    estado.reservas.splice(idx,1);
    salvarEstado(); atualizarContadores(); renderizar();
  }
}

function atualizarContadores(){
  var cf = document.getElementById("contFav"), cr = document.getElementById("contRes");
  var nf = estado.favEmpresas.length + estado.favProdutos.length;
  var nr = estado.reservas.filter(function(r){return r.status==="reservado";}).length;
  cf.textContent = nf; cf.hidden = nf===0;
  cr.textContent = nr; cr.hidden = nr===0;
}

/* ---------------------------------------------------------------------- */
/* COMPONENTES REUTILIZÁVEIS (HTML)                                       */
/* ---------------------------------------------------------------------- */

function htmlCardEmpresa(emp){
  var ofertas = contarOfertas(emp.id);
  var fav = ehFavEmpresa(emp.id);
  return (
    '<article class="card-empresa">' +
      '<div class="card-empresa__capa" style="background:'+emp.cor+'">' +
        imgHTML(emp.imagem, "Foto ilustrativa de "+emp.nome, emp.emoji, extrairCores(emp.cor), "") +
        '<button class="coracao card-empresa__fav" data-fav-empresa="'+emp.id+'" aria-pressed="'+fav+'" aria-label="Favoritar empresa">'+(fav?'❤️':'🤍')+'</button>' +
      '</div>' +
      '<div class="card-empresa__corpo">' +
        '<span class="card-empresa__nome">'+esc(emp.nome)+'</span>' +
        '<span class="card-empresa__meta"><span class="pill pill--cinza">'+esc(emp.categoria)+'</span> 📍 '+esc(emp.cidade)+'</span>' +
        '<span class="card-empresa__meta estrelas">'+estrelas(emp.nota)+' <span style="color:var(--tinta-suave);font-weight:400">('+emp.avaliacoes+')</span></span>' +
        '<span class="card-empresa__oferta">'+ofertas+' oferta'+(ofertas===1?"":"s")+' disponível'+(ofertas===1?"":"eis")+'</span>' +
        '<div class="card-empresa__rodape"><button class="btn btn--peq btn--bloco" data-rota="#/empresa/'+emp.id+'">Ver ofertas</button></div>' +
      '</div>' +
    '</article>'
  );
}

function htmlCardProduto(p, opts){
  opts = opts || {};
  var emp = empresaPorId(p.empresaId);
  var fav = ehFavProduto(p.id);
  var pct = economiaPercentual(p);
  var tags = '';
  if(p.ultimaChance) tags += '<span class="pill pill--destaque">🔥 Última Chance</span>';
  if(pct>0) tags += '<span class="pill pill--verde">-'+pct+'%</span>';
  var esgotado = p.qtd<=0;
  return (
    '<article class="card-produto" data-abrir-produto="'+p.id+'">' +
      '<div class="card-produto__capa">' +
        imgHTML(p.imagem, p.nome+" — foto ilustrativa do produto", p.emoji, null, "") +
        '<div class="card-produto__tags">'+tags+'</div>' +
        '<button class="coracao card-produto__fav" data-fav-produto="'+p.id+'" aria-pressed="'+fav+'" aria-label="Favoritar produto">'+(fav?'❤️':'🤍')+'</button>' +
      '</div>' +
      '<div class="card-produto__corpo">' +
        (opts.ocultarLoja? '' : '<span class="card-produto__loja">'+esc(emp.nome)+'</span>') +
        '<span class="card-produto__nome">'+esc(p.nome)+'</span>' +
        '<span class="card-produto__desc">'+esc(itensTexto(p.itens)||p.descricao||"")+'</span>' +
        '<div class="card-produto__preco"><b>'+real(p.precoReuse)+'</b><s>'+real(p.precoOriginal)+'</s></div>' +
        '<span class="card-produto__desc">'+(esgotado? 'Esgotado por hoje' : p.qtd+' disponível'+(p.qtd===1?"":"eis")+' · retirada até '+esc(p.retirada))+'</span>' +
        '<div class="card-produto__rodape">' +
          '<button class="btn btn--vazado btn--peq" data-rota="#/produto/'+p.id+'">Ver detalhes</button>' +
          '<button class="btn btn--peq" data-reservar="'+p.id+'" '+(esgotado?'disabled':'')+'>Reservar</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function ligarAcoesCartoes(container){
  container.querySelectorAll("[data-fav-empresa]").forEach(function(b){
    b.addEventListener("click", function(e){ e.stopPropagation(); alternarFavEmpresa(b.getAttribute("data-fav-empresa")); });
  });
  container.querySelectorAll("[data-fav-produto]").forEach(function(b){
    b.addEventListener("click", function(e){ e.stopPropagation(); alternarFavProduto(b.getAttribute("data-fav-produto")); });
  });
  container.querySelectorAll("[data-reservar]").forEach(function(b){
    b.addEventListener("click", function(e){ e.stopPropagation(); reservarProduto(b.getAttribute("data-reservar")); });
  });
  container.querySelectorAll("[data-abrir-produto]").forEach(function(c){
    c.addEventListener("click", function(e){
      if(e.target.closest("[data-fav-produto], [data-reservar], [data-rota]")) return;
      navegar("#/produto/"+c.getAttribute("data-abrir-produto"));
    });
  });
}

/* ---------------------------------------------------------------------- */
/* PÁGINAS                                                                 */
/* ---------------------------------------------------------------------- */

function totalReservasSessao(){ return estado.reservas.length; }
function kgAproximadoSessao(){ return estado.reservas.length * 1.2; }

function paginaHome(){
  var totalOfertas = PRODUTOS.filter(function(p){return p.qtd>0;}).length + totalReservasSessao()*0;
  var html =
  '<header class="hero">' +
    '<div class="wrap hero__grid">' +
      '<div>' +
        '<h1>Compre melhor. Economize. Evite o desperdício.</h1>' +
        '<p class="lead">Encontre alimentos excedentes de empresas próximas a você por preços especiais e ajude a reduzir o desperdício.</p>' +
        '<div class="hero__acoes">' +
          '<button class="btn" data-rota="#/ofertas">Encontrar ofertas</button>' +
          '<button class="btn btn--vazado" data-rota="#/cadastro-empresa">Sou uma empresa</button>' +
        '</div>' +
        '<div class="hero__nums">' +
          '<div><b>'+totalOfertas+'</b><span>ofertas disponíveis</span></div>' +
          '<div><b>'+EMPRESAS.length+'</b><span>empresas parceiras</span></div>' +
          '<div><b>1.250 kg</b><span>já aproveitados</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="hero__foto">' + imgHTML(IMG.hero, "Variedade de alimentos frescos do ReUse Brasil", "🥗", ["#3F7F3A","#8CA944"], "") + '</div>' +
    '</div>' +
  '</header>' +

  '<div class="wrap">' +
    '<div class="buscagrande">' +
      '<h3>O que você está procurando?</h3>' +
      '<div class="busca__linha">' +
        '<div class="busca__campo"><label for="campoBusca" class="sr">Buscar</label>' +
        '<input type="search" id="campoBusca" placeholder="Ex.: kit padaria, hortifruti, Vila Nova..."></div>' +
        '<button class="btn" id="btnBuscarHome">Buscar ofertas</button>' +
      '</div>' +
      '<div class="busca__filtros">' +
        '<div><label for="fLocal">Localização</label><input type="text" id="fLocal" placeholder="Bairro ou cidade"></div>' +
        '<div><label for="fCategoria">Categoria</label><select id="fCategoria"><option value="">Todas</option>'+CATEGORIAS.map(function(c){return '<option>'+c+'</option>';}).join("")+'</select></div>' +
        '<div><label for="fPreco">Preço máximo</label><select id="fPreco"><option value="">Sem limite</option><option value="8">até R$ 8</option><option value="12">até R$ 12</option><option value="18">até R$ 18</option></select></div>' +
        '<div><label for="fDistancia">Distância</label><select id="fDistancia"><option value="">Qualquer</option><option>até 1 km</option><option>até 3 km</option><option>até 5 km</option></select></div>' +
        '<div><label for="fHorario">Retirada até</label><select id="fHorario"><option value="">Qualquer horário</option><option>18h</option><option>19h</option><option>20h</option><option>21h</option><option>22h</option></select></div>' +
      '</div>' +
    '</div>' +
  '</div>' +

  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Empresas parceiras</h2><p>Escolha uma empresa e veja todas as ofertas disponíveis nela agora.</p></div>' +
      '<button class="btn btn--vazado btn--peq" data-rota="#/empresas">Ver todas as empresas</button></div>' +
      '<div class="grade-empresas">' + EMPRESAS.map(htmlCardEmpresa).join("") + '</div>' +
    '</div>' +
  '</section>' +

  '<section class="secao secao--calma">' +
    '<div class="wrap">' +
      '<div class="ultima-faixa">' +
        '<div><h2>🔥 Última Chance</h2><p>Produtos com maior urgência de retirada hoje, com desconto extra.</p></div>' +
        '<button class="btn btn--destaque" data-rota="#/ultima-chance">Ver Última Chance</button>' +
      '</div>' +
      '<div class="grade-produtos ultima">' +
        PRODUTOS.filter(function(p){return p.ultimaChance && p.qtd>0;}).slice(0,4).map(function(p){return htmlCardProduto(p);}).join("") +
      '</div>' +
    '</div>' +
  '</section>' +

  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Nosso impacto até agora</h2></div><button class="btn btn--vazado btn--peq" data-rota="#/impacto">Ver detalhes</button></div>' +
      '<div class="numeros">' +
        '<div class="numero"><b>'+(1250+Math.round(kgAproximadoSessao())).toLocaleString("pt-BR")+' kg</b><span>alimentos aproveitados</span></div>' +
        '<div class="numero"><b>'+EMPRESAS.length+ (estado.minhasEmpresas.length? " + "+estado.minhasEmpresas.length : "" ) +'</b><span>empresas parceiras</span></div>' +
        '<div class="numero"><b>'+(430+totalReservasSessao()).toLocaleString("pt-BR")+'</b><span>ofertas realizadas</span></div>' +
        '<div class="numero"><b>320</b><span>consumidores</span></div>' +
      '</div>' +
    '</div>' +
  '</section>' +

  '<section class="secao secao--calma" id="ods12">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>ODS 12 — Consumo e Produção Responsáveis</h2>' +
      '<p>O ReUse Brasil contribui para o ODS 12 ao incentivar o consumo consciente, reduzir o desperdício de alimentos e promover o uso mais eficiente dos recursos.</p></div>' +
      '<button class="btn btn--vazado btn--peq" data-rota="#/ods12">Saber mais</button></div>' +
    '</div>' +
  '</section>';

  return html;
}

function ligarBuscaHome(){
  var ir = function(){
    var q = document.getElementById("campoBusca").value;
    var local = document.getElementById("fLocal").value;
    var cat = document.getElementById("fCategoria").value;
    var preco = document.getElementById("fPreco").value;
    var dist = document.getElementById("fDistancia").value;
    var hora = document.getElementById("fHorario").value;
    var params = new URLSearchParams();
    if(q) params.set("q", q);
    if(local) params.set("local", local);
    if(cat) params.set("cat", cat);
    if(preco) params.set("preco", preco);
    if(dist) params.set("dist", dist);
    if(hora) params.set("hora", hora);
    navegar("#/ofertas?"+params.toString());
  };
  var b = document.getElementById("btnBuscarHome");
  if(b) b.addEventListener("click", ir);
  var campo = document.getElementById("campoBusca");
  if(campo) campo.addEventListener("keydown", function(e){ if(e.key==="Enter") ir(); });
}

function paginaOfertas(query){
  var params = new URLSearchParams(query||"");
  var texto = (params.get("q")||"").toLowerCase();
  var local = (params.get("local")||"").toLowerCase();
  var catInicial = params.get("cat")||"Todas";
  var precoMax = params.get("preco")||"";
  var horaMax = params.get("hora")||"";

  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Ofertas disponíveis</h2><p>Alimentos excedentes de todas as empresas parceiras, próprios para consumo e com preço reduzido.</p></div></div>' +
      '<div class="filtros">' +
        '<div class="busca"><label class="sr" for="buscaOfertas">Buscar</label><input type="search" id="buscaOfertas" placeholder="Buscar produto, empresa ou bairro" value="'+esc(texto||local)+'"></div>' +
        '<div class="chips" id="chipsCategoria"></div>' +
        '<div style="flex:0 1 190px"><label class="sr" for="ordemOfertas">Ordenar</label>' +
          '<select id="ordemOfertas"><option value="relevancia">Relevância</option><option value="preco">Menor preço</option><option value="desconto">Maior desconto</option><option value="hora">Retirada mais cedo</option></select></div>' +
      '</div>' +
      '<div class="grade-produtos" id="listaOfertas"></div>' +
      '<p class="vazio" id="ofertasVazio" hidden>Nenhuma oferta encontrada com esses filtros. Tente limpar a busca ou escolher outra categoria.</p>' +
    '</div>' +
  '</section>';

  return {html:html, init:function(){
    var chips = document.getElementById("chipsCategoria");
    var cats = ["Todas"].concat(CATEGORIAS);
    var catAtual = cats.indexOf(catInicial)>-1 ? catInicial : "Todas";
    cats.forEach(function(c){
      var b = document.createElement("button");
      b.className="chip"; b.type="button"; b.textContent=c;
      b.setAttribute("aria-pressed", c===catAtual?"true":"false");
      b.addEventListener("click", function(){
        catAtual = c;
        Array.prototype.forEach.call(chips.children,function(x){x.setAttribute("aria-pressed", x===b?"true":"false");});
        atualizar();
      });
      chips.appendChild(b);
    });
    var ordem = "relevancia";
    document.getElementById("ordemOfertas").addEventListener("change", function(e){ ordem=e.target.value; atualizar(); });
    var buscaTxt = texto||local;
    document.getElementById("buscaOfertas").addEventListener("input", function(e){ buscaTxt=e.target.value.toLowerCase(); atualizar(); });

    function atualizar(){
      var lista = PRODUTOS.filter(function(p){
        var emp = empresaPorId(p.empresaId);
        if(catAtual!=="Todas" && emp.categoria!==catAtual) return false;
        if(precoMax && p.precoReuse>parseFloat(precoMax)) return false;
        if(buscaTxt){
          var alvo = (p.nome+" "+emp.nome+" "+emp.bairro+" "+emp.categoria+" "+itensTexto(p.itens)).toLowerCase();
          if(alvo.indexOf(buscaTxt)===-1) return false;
        }
        return true;
      });
      lista.sort(function(a,b){
        if(ordem==="preco") return a.precoReuse-b.precoReuse;
        if(ordem==="desconto") return economiaPercentual(b)-economiaPercentual(a);
        if(ordem==="hora") return (a.retirada||"").localeCompare(b.retirada||"");
        return (b.qtd>0?1:0)-(a.qtd>0?1:0);
      });
      var alvoLista = document.getElementById("listaOfertas");
      alvoLista.innerHTML = lista.map(function(p){return htmlCardProduto(p);}).join("");
      ligarAcoesCartoes(alvoLista);
      document.getElementById("ofertasVazio").hidden = lista.length>0;
    }
    atualizar();
  }};
}

function paginaUltimaChance(){
  var lista = PRODUTOS.filter(function(p){return p.ultimaChance;});
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="ultima-faixa">' +
        '<div><h2>🔥 Última Chance</h2><p>Produtos com maior urgência de retirada. Todos continuam próprios e seguros para consumo — o desconto é pelo tempo, não pela qualidade.</p></div>' +
      '</div>' +
      '<div class="grade-produtos ultima" id="listaUltima">' + lista.map(function(p){return htmlCardProduto(p);}).join("") + '</div>' +
    '</div>' +
  '</section>';
  return {html:html, init:function(){ ligarAcoesCartoes(document.getElementById("listaUltima")); }};
}

function paginaEmpresas(query){
  var params = new URLSearchParams(query||"");
  var filtroCat = params.get("cat")||"Todas";
  var todasEmpresas = EMPRESAS.concat(estado.minhasEmpresas);
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Empresas parceiras</h2><p>Escolha uma empresa para ver todos os produtos excedentes disponíveis nela.</p></div></div>' +
      '<div class="filtros"><div class="chips" id="chipsEmpresaCat"></div></div>' +
      '<div class="grade-empresas" id="gradeTodasEmpresas"></div>' +
    '</div>' +
  '</section>';
  return {html:html, init:function(){
    var chips = document.getElementById("chipsEmpresaCat");
    var cats = ["Todas"].concat(CATEGORIAS);
    var atual = cats.indexOf(filtroCat)>-1?filtroCat:"Todas";
    cats.forEach(function(c){
      var b=document.createElement("button"); b.className="chip"; b.type="button"; b.textContent=c;
      b.setAttribute("aria-pressed", c===atual?"true":"false");
      b.addEventListener("click", function(){
        atual=c; Array.prototype.forEach.call(chips.children,function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
        atualizar();
      });
      chips.appendChild(b);
    });
    function atualizar(){
      var lista = todasEmpresas.filter(function(e){ return atual==="Todas" || e.categoria===atual; });
      var alvo = document.getElementById("gradeTodasEmpresas");
      alvo.innerHTML = lista.length ? lista.map(htmlCardEmpresa).join("") : '<p class="vazio">Nenhuma empresa nessa categoria ainda.</p>';
      ligarAcoesCartoes(alvo);
    }
    atualizar();
  }};
}

function paginaEmpresa(id){
  var emp = empresaPorId(id) || estado.minhasEmpresas.filter(function(e){return e.id===id;})[0];
  if(!emp){
    return {html:'<section class="secao"><div class="wrap"><p class="vazio">Empresa não encontrada. <a data-rota="#/empresas">Voltar para empresas</a>.</p></div></section>', init:function(){}};
  }
  var produtos = produtosDaEmpresa(emp.id);
  var fav = ehFavEmpresa(emp.id);
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<p class="migalha"><a data-rota="#/empresas">Empresas</a> › '+esc(emp.nome)+'</p>' +
      '<div class="perfil-empresa">' +
        '<div class="perfil-empresa__capa" style="background:'+(emp.cor||'var(--verde)')+'">' +
          imgHTML(emp.imagem, "Foto ilustrativa de "+emp.nome, emp.emoji, extrairCores(emp.cor), "") +
        '</div>' +
        '<div class="perfil-empresa__info">' +
          '<h1>'+esc(emp.nome)+'</h1>' +
          '<div class="perfil-empresa__linha">' +
            '<span class="pill pill--cinza">'+esc(emp.categoria)+'</span>' +
            '<span>📍 '+esc(emp.cidade)+'</span>' +
            '<span class="estrelas">'+estrelas(emp.nota)+'</span>' +
            '<span>('+emp.avaliacoes+' avaliações)</span>' +
            '<span>📦 '+contarOfertas(emp.id)+' ofertas disponíveis</span>' +
          '</div>' +
          '<p style="margin-top:.6rem">'+esc(emp.descricao)+'</p>' +
          '<div class="info-horarios"><span><b>Horário de funcionamento:</b> '+esc(emp.funciona)+'</span><span><b>Retirada de pedidos:</b> '+esc(emp.retirada)+'</span></div>' +
          '<div class="perfil-empresa__acoes">' +
            '<button class="btn btn--vazado btn--peq" id="btnFavEmpresaPerfil" aria-pressed="'+fav+'">'+(fav?'❤️ Favoritado':'🤍 Favoritar empresa')+'</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h2 style="margin:1.6rem 0 1rem">Ofertas de '+esc(emp.nome)+'</h2>' +
      '<div class="grade-produtos" id="gradeProdutosEmpresa">' + produtos.map(function(p){return htmlCardProduto(p,{ocultarLoja:true});}).join("") + '</div>' +
      (produtos.length===0 ? '<p class="vazio">Essa empresa ainda não publicou produtos.</p>' : '') +
    '</div>' +
  '</section>';
  return {html:html, init:function(){
    ligarAcoesCartoes(document.getElementById("gradeProdutosEmpresa"));
    var b = document.getElementById("btnFavEmpresaPerfil");
    if(b) b.addEventListener("click", function(){ alternarFavEmpresa(emp.id); });
  }};
}

function paginaProduto(id){
  var p = produtoPorId(id);
  if(!p){
    return {html:'<section class="secao"><div class="wrap"><p class="vazio">Produto não encontrado. <a data-rota="#/ofertas">Voltar para ofertas</a>.</p></div></section>', init:function(){}};
  }
  var emp = empresaPorId(p.empresaId);
  var pct = economiaPercentual(p);
  var fav = ehFavProduto(p.id);
  var esgotado = p.qtd<=0;
  var reservaRecente = estado.reservas.filter(function(r){return r.produtoId===p.id;})[0];
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<p class="migalha"><a data-rota="#/empresas">Empresas</a> › <a data-rota="#/empresa/'+emp.id+'">'+esc(emp.nome)+'</a> › '+esc(p.nome)+'</p>' +
      '<div class="detalhe">' +
        '<div>' +
          '<div class="detalhe__foto">' + imgHTML(p.imagem, p.nome+" — foto do produto", p.emoji, null, "") + '</div>' +
          '<div style="display:flex;gap:.5rem;margin-top:.8rem;flex-wrap:wrap">' +
            (p.ultimaChance?'<span class="pill pill--destaque">🔥 Última Chance</span>':'') +
            (pct>0?'<span class="pill pill--verde">-'+pct+'% de economia</span>':'') +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h1>'+esc(p.nome)+'</h1>' +
          '<p style="margin-top:.3rem"><a data-rota="#/empresa/'+emp.id+'" style="font-weight:700;color:var(--verde-escuro)">'+esc(emp.nome)+'</a> · '+esc(emp.bairro)+'</p>' +
          '<p>'+esc(p.descricao||"")+(p.itens?(' Contém: '+esc(itensTexto(p.itens))+'.'):'')+'</p>' +
          '<div class="detalhe__preco"><b>'+real(p.precoReuse)+'</b><s>'+real(p.precoOriginal)+'</s>'+(pct>0?'<span class="pill pill--verde">'+pct+'% off</span>':'')+'</div>' +
          '<div class="linha-info"><b>Quantidade</b><span>'+(esgotado?'Esgotado por hoje':p.qtd+' unidade'+(p.qtd===1?'':'s')+' disponível'+(p.qtd===1?'':'eis'))+'</span></div>' +
          '<div class="linha-info"><b>Horário de retirada</b><span>até '+esc(p.retirada)+'</span></div>' +
          '<div class="linha-info"><b>Endereço</b><span>'+esc(emp.endereco)+'</span></div>' +
          '<div class="linha-info"><b>Validade</b><span>Produto próprio e seguro para consumo; retirar dentro do horário informado.</span></div>' +
          '<div style="display:flex;gap:.7rem;margin-top:1.1rem;flex-wrap:wrap">' +
            '<button class="btn" id="btnReservarDetalhe" '+(esgotado?'disabled':'')+'>Reservar oferta</button>' +
            '<button class="btn btn--vazado" id="btnFavProdutoDetalhe" aria-pressed="'+fav+'">'+(fav?'❤️ Favoritado':'🤍 Favoritar')+'</button>' +
          '</div>' +
          (reservaRecente ? (
            '<div class="confirmacao"><b>Reserva realizada!</b><p style="margin:.3rem 0 0">Retire no estabelecimento dentro do horário informado.</p>' +
            '<p style="margin:.5rem 0 0">Código: <span class="codigo">'+esc(reservaRecente.cod)+'</span></p></div>'
          ) : '') +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>';
  return {html:html, init:function(){
    var b1=document.getElementById("btnReservarDetalhe");
    if(b1) b1.addEventListener("click", function(){ reservarProduto(p.id); });
    var b2=document.getElementById("btnFavProdutoDetalhe");
    if(b2) b2.addEventListener("click", function(){ alternarFavProduto(p.id); });
  }};
}

function paginaFavoritos(){
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Meus favoritos</h2><p>Empresas e produtos que você marcou com ❤️.</p></div></div>' +
      '<div class="abas-mini">' +
        '<button data-aba="produtos" aria-selected="true">Produtos</button>' +
        '<button data-aba="empresas" aria-selected="false">Empresas</button>' +
      '</div>' +
      '<div id="favProdutos" class="grade-produtos"></div>' +
      '<div id="favEmpresas" class="grade-empresas" hidden></div>' +
      '<p class="vazio" id="favVazio" hidden>Você ainda não favoritou nada. Toque no ❤️ em qualquer produto ou empresa.</p>' +
    '</div>' +
  '</section>';
  return {html:html, init:function(){
    var botoes = document.querySelectorAll("[data-aba]");
    var painelProdutos = document.getElementById("favProdutos"), painelEmpresas = document.getElementById("favEmpresas");
    function render(aba){
      botoes.forEach(function(b){ b.setAttribute("aria-selected", b.getAttribute("data-aba")===aba?"true":"false"); });
      if(aba==="produtos"){
        painelProdutos.hidden=false; painelEmpresas.hidden=true;
        var prod = estado.favProdutos.map(produtoPorId).filter(Boolean);
        painelProdutos.innerHTML = prod.map(function(p){return htmlCardProduto(p);}).join("");
        ligarAcoesCartoes(painelProdutos);
        document.getElementById("favVazio").hidden = prod.length>0;
      } else {
        painelProdutos.hidden=true; painelEmpresas.hidden=false;
        var emp = estado.favEmpresas.map(function(id){return empresaPorId(id)||estado.minhasEmpresas.filter(function(e){return e.id===id;})[0];}).filter(Boolean);
        painelEmpresas.innerHTML = emp.map(htmlCardEmpresa).join("");
        ligarAcoesCartoes(painelEmpresas);
        document.getElementById("favVazio").hidden = emp.length>0;
      }
    }
    botoes.forEach(function(b){ b.addEventListener("click", function(){ render(b.getAttribute("data-aba")); }); });
    render("produtos");
  }};
}

function paginaReservas(){
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Minhas reservas</h2><p>Apresente o código no balcão dentro do horário de retirada.</p></div></div>' +
      '<div class="lista" id="listaReservasPagina"></div>' +
      '<p class="vazio" id="reservasVazio" hidden>Nenhuma reserva ainda. <a data-rota="#/ofertas">Ver ofertas disponíveis</a>.</p>' +
    '</div>' +
  '</section>';
  return {html:html, init:function(){
    var alvo = document.getElementById("listaReservasPagina");
    alvo.innerHTML = estado.reservas.map(function(r){
      var statusTxt = r.status==="reservado"?"Reservado":r.status==="retirado"?"Retirado":"Cancelado";
      var statusCls = "status--"+r.status;
      return (
        '<div class="item">' +
          '<span class="item__icone">🧾</span>' +
          '<div class="item__txt"><b>'+esc(r.nome)+'</b><span>'+esc(r.loja)+' · '+esc(r.endereco)+' · retirar até '+esc(r.retirada)+' · '+r.data+' · '+real(r.valor)+'</span></div>' +
          '<span class="codigo">'+esc(r.cod)+'</span>' +
          '<span class="status '+statusCls+'">'+statusTxt+'</span>' +
          (r.status==="reservado" ? '<button class="linkinho" data-retirar="'+r.cod+'">Marcar retirado</button><button class="linkinho" data-cancelar="'+r.cod+'">Cancelar</button>' : '') +
        '</div>'
      );
    }).join("");
    document.getElementById("reservasVazio").hidden = estado.reservas.length>0;
    alvo.querySelectorAll("[data-retirar]").forEach(function(b){ b.addEventListener("click", function(){ marcarRetirado(b.getAttribute("data-retirar")); }); });
    alvo.querySelectorAll("[data-cancelar]").forEach(function(b){ b.addEventListener("click", function(){ cancelarReserva(b.getAttribute("data-cancelar")); }); });
  }};
}

function paginaPerfil(){
  var html =
  '<section class="secao">' +
    '<div class="wrap">' +
      '<div class="cab"><div><h2>Meu perfil</h2><p>Dados salvos apenas neste navegador, para fins de demonstração.</p></div></div>' +
      '<div class="painel-grid">' +
        '<form class="cartao" id="formPerfil">' +
          '<div class="campo"><label for="pNome">Nome</label><input type="text" id="pNome" value="'+esc(estado.perfil.nome)+'" placeholder="Seu nome"></div>' +
          '<div class="campo"><label for="pEmail">E-mail</label><input type="email" id="pEmail" value="'+esc(estado.perfil.email)+'" placeholder="voce@email.com"></div>' +
          '<div class="campo"><label for="pLocal">Localização</label><input type="text" id="pLocal" value="'+esc(estado.perfil.local)+'" placeholder="Bairro, cidade"></div>' +
          '<button class="btn btn--bloco" type="submit">Salvar perfil</button>' +
          '<p class="aviso" id="avisoPerfil" role="status"></p>' +
        '</form>' +
        '<div>' +
          '<div class="lista">' +
            '<a class="item" data-rota="#/reservas"><span class="item__icone">🧾</span><div class="item__txt"><b>Minhas reservas</b><span>'+estado.reservas.length+' no total</span></div></a>' +
            '<a class="item" data-rota="#/favoritos"><span class="item__icone">❤️</span><div class="item__txt"><b>Favoritos</b><span>'+(estado.favEmpresas.length+estado.favProdutos.length)+' salvos</span></div></a>' +
            '<a class="item" data-rota="#/painel-empresa"><span class="item__icone">🏪</span><div class="item__txt"><b>Painel da empresa</b><span>gerenciar anúncios</span></div></a>' +
          '</div>' +
          '<h3 style="margin:1.6rem 0 .8rem">Histórico de pedidos</h3>' +
          '<div class="lista" id="historicoPedidos"></div>' +
          '<p class="vazio" id="historicoVazio" hidden>Nenhum pedido retirado ainda.</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>';
  return {html:html, init:function(){
    document.getElementById("formPerfil").addEventListener("submit", function(e){
      e.preventDefault();
      estado.perfil = {nome:document.getElementById("pNome").value.trim(), email:document.getElementById("pEmail").value.trim(), local:document.getElementById("pLocal").value.trim()};
      salvarEstado();
      document.getElementById("avisoPerfil").textContent = "Perfil salvo.";
      setTimeout(function(){ var a=document.getElementById("avisoPerfil"); if(a) a.textContent=""; },3000);
    });
    var historico = estado.reservas.filter(function(r){return r.status==="retirado";});
    document.getElementById("historicoPedidos").innerHTML = historico.map(function(r){
      return '<div class="item"><span class="item__icone">✅</span><div class="item__txt"><b>'+esc(r.nome)+'</b><span>'+esc(r.loja)+' · '+r.data+' · '+real(r.valor)+'</span></div><span class="codigo">'+esc(r.cod)+'</span></div>';
    }).join("");
    document.getElementById("historicoVazio").hidden = historico.length>0;
  }};
}

function paginaComoFunciona(){
  var passos = [
    ["Cadastro do estabelecimento","Empresas como padarias, mercados, restaurantes e hortifrutis criam sua conta na plataforma."],
    ["Publicação do excedente","O estabelecimento anuncia o produto excedente com preço, quantidade e horário de retirada."],
    ["Consulta pelo consumidor","O consumidor busca ofertas por localização, categoria, preço ou horário."],
    ["Reserva do produto","O consumidor reserva o produto direto pelo site e recebe um código de retirada."],
    ["Retirada no estabelecimento","O produto é retirado no endereço informado dentro do horário combinado."],
    ["Registro do impacto","A plataforma soma o alimento aproveitado, a economia gerada e o valor recuperado pela empresa."]
  ];
  return {html:
    '<section class="secao"><div class="wrap">' +
      '<div class="cab"><div><h2>Como funciona</h2><p>Do excedente à retirada, em seis passos.</p></div></div>' +
      '<div class="grade">' + passos.map(function(p,i){
        return '<div class="cartao"><h3>'+(i+1)+'. '+esc(p[0])+'</h3><p style="margin-top:.4rem">'+esc(p[1])+'</p></div>';
      }).join("") + '</div>' +
    '</div></section>',
  init:function(){}};
}

function paginaImpacto(){
  var kgExtra = Math.round(kgAproximadoSessao());
  var html =
  '<section class="secao"><div class="wrap">' +
    '<div class="cab"><div><h2>Painel de impacto</h2><p>Números fictícios para demonstração do protótipo, somados ao que você reservou nesta sessão.</p></div></div>' +
    '<div class="numeros">' +
      '<div class="numero"><b>'+(1250+kgExtra).toLocaleString("pt-BR")+' kg</b><span>alimentos aproveitados</span></div>' +
      '<div class="numero"><b>'+(EMPRESAS.length+estado.minhasEmpresas.length + 77)+'</b><span>empresas parceiras</span></div>' +
      '<div class="numero"><b>'+(430+totalReservasSessao()).toLocaleString("pt-BR")+'</b><span>ofertas realizadas</span></div>' +
      '<div class="numero"><b>320</b><span>consumidores</span></div>' +
    '</div>' +
    '<div class="grade">' +
      '<div class="cartao"><h3>Ambiental</h3><p>Menos alimento no aterro significa menos metano e melhor aproveitamento da água, da terra e da energia já gastas na produção.</p></div>' +
      '<div class="cartao"><h3>Econômico</h3><p>As empresas recuperam parte do valor de produtos que seriam perda total, e os consumidores compram mais com o mesmo dinheiro.</p></div>' +
      '<div class="cartao"><h3>Social</h3><p>Parcerias com instituições permitem destinar à doação os alimentos elegíveis, conforme a Lei nº 14.016/2020.</p></div>' +
    '</div>' +
  '</div></section>';
  return {html:html, init:function(){}};
}

function paginaOds12(){
  return {html:
  '<section class="secao"><div class="wrap">' +
    '<div class="cab"><div><h2>ODS 12 — Consumo e Produção Responsáveis</h2></div></div>' +
    '<p style="max-width:70ch">Os Objetivos de Desenvolvimento Sustentável são 17 metas globais da ONU para 2030. O ODS 12 trata de consumir e produzir usando melhor os recursos do planeta.</p>' +
    '<p style="max-width:70ch">A meta 12.3 é direta: reduzir pela metade o desperdício de alimentos por pessoa no varejo e no consumo, e diminuir as perdas ao longo das cadeias de produção. É exatamente o ponto em que o ReUse Brasil atua, ao transformar o excedente em venda com desconto.</p>' +
    '<div class="grade">' +
      '<div class="cartao"><h3>1 bilhão</h3><p>de refeições descartadas por dia nos domicílios do mundo em 2022 (PNUMA).</p></div>' +
      '<div class="cartao"><h3>94 kg</h3><p>por pessoa ao ano: estimativa de desperdício doméstico no Brasil (PNUMA/Embrapa).</p></div>' +
      '<div class="cartao"><h3>Lei 14.016/2020</h3><p>autoriza a doação de excedentes por restaurantes, lanchonetes e varejo no Brasil.</p></div>' +
    '</div>' +
  '</div></section>',
  init:function(){}};
}

function paginaCadastroEmpresa(){
  var html =
  '<section class="secao"><div class="wrap">' +
    '<div class="cab"><div><h2>Quer vender seus excedentes?</h2><p>Faça parte do ReUse Brasil e transforme alimentos excedentes em novas oportunidades.</p></div></div>' +
    '<form class="cartao" id="formCadastroEmpresa" style="max-width:640px">' +
      '<div class="campo"><label for="ceNome">Nome da empresa</label><input type="text" id="ceNome" required placeholder="Padaria Estrela"></div>' +
      '<div class="campo dupla">' +
        '<div><label for="ceCategoria">Categoria</label><select id="ceCategoria">'+CATEGORIAS.map(function(c){return '<option>'+c+'</option>';}).join("")+'</select></div>' +
        '<div><label for="ceCidade">Cidade</label><input type="text" id="ceCidade" value="São Paulo - SP"></div>' +
      '</div>' +
      '<div class="campo"><label for="ceEndereco">Endereço</label><input type="text" id="ceEndereco" placeholder="Rua Exemplo, 100 — Bairro"></div>' +
      '<div class="campo dupla">' +
        '<div><label for="ceResponsavel">Responsável</label><input type="text" id="ceResponsavel" placeholder="Nome do responsável"></div>' +
        '<div><label for="ceTelefone">Telefone</label><input type="tel" id="ceTelefone" placeholder="(11) 90000-0000"></div>' +
      '</div>' +
      '<div class="campo dupla">' +
        '<div><label for="ceEmail">E-mail</label><input type="email" id="ceEmail" placeholder="contato@empresa.com"></div>' +
        '<div><label for="ceHorario">Horário de funcionamento</label><input type="text" id="ceHorario" placeholder="08:00 – 20:00"></div>' +
      '</div>' +
      '<button class="btn btn--bloco" type="submit">Cadastrar minha empresa</button>' +
      '<p class="dica">Depois do cadastro você verá o painel simulado da sua empresa, onde poderá anunciar produtos.</p>' +
    '</form>' +
  '</div></section>';
  return {html:html, init:function(){
    document.getElementById("formCadastroEmpresa").addEventListener("submit", function(e){
      e.preventDefault();
      var nome = document.getElementById("ceNome").value.trim() || "Minha Empresa";
      var id = "minha-"+nome.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")+"-"+Date.now();
      var nova = {
        id:id, nome:nome, categoria:document.getElementById("ceCategoria").value,
        emoji:"🏪", cidade:document.getElementById("ceCidade").value.trim()||"São Paulo - SP",
        bairro:"", endereco:document.getElementById("ceEndereco").value.trim()||"Endereço não informado",
        nota:5.0, avaliacoes:0, funciona:document.getElementById("ceHorario").value.trim()||"a definir",
        retirada:"a definir",
        descricao:"Nova empresa parceira do ReUse Brasil.",
        cor:"linear-gradient(135deg,#7FA65A,#4B6B36)",
        imagem: escolherImagemEmpresa(document.getElementById("ceCategoria").value),
        responsavel:document.getElementById("ceResponsavel").value.trim(),
        telefone:document.getElementById("ceTelefone").value.trim(),
        email:document.getElementById("ceEmail").value.trim()
      };
      estado.minhasEmpresas.push(nova);
      if(!PRODUTOS_POR_EMPRESA[id]) PRODUTOS_POR_EMPRESA[id]=[];
      salvarEstado();
      navegar("#/painel-empresa?id="+id);
    });
  }};
}

function paginaPainelEmpresa(query){
  var params = new URLSearchParams(query||"");
  var idAlvo = params.get("id");
  var minhas = estado.minhasEmpresas;
  if(!idAlvo && minhas.length) idAlvo = minhas[minhas.length-1].id;
  var emp = minhas.filter(function(e){return e.id===idAlvo;})[0];

  if(!emp){
    return {html:
      '<section class="secao"><div class="wrap">' +
        '<div class="cab"><div><h2>Painel da empresa</h2><p>Cadastre sua empresa para acessar o painel simulado.</p></div></div>' +
        '<p class="vazio">Você ainda não cadastrou nenhuma empresa. <a data-rota="#/cadastro-empresa">Cadastrar agora</a>.</p>' +
      '</div></section>',
    init:function(){}};
  }

  var produtos = PRODUTOS_POR_EMPRESA[emp.id]||[];
  var reservasEmpresa = estado.reservas.filter(function(r){return r.empresaId===emp.id;});
  var kg = reservasEmpresa.length*1.1;
  var receita = reservasEmpresa.reduce(function(s,r){return s+r.valor;},0);

  var html =
  '<section class="secao"><div class="wrap">' +
    '<div class="cab"><div><h2>Painel de '+esc(emp.nome)+'</h2><p>Visão simulada de produtos, ofertas ativas, reservas e impacto.</p></div>' +
    '<button class="btn btn--vazado btn--peq" data-rota="#/empresa/'+emp.id+'">Ver página pública</button></div>' +
    '<div class="numeros">' +
      '<div class="numero"><b>'+produtos.length+'</b><span>produtos cadastrados</span></div>' +
      '<div class="numero"><b>'+reservasEmpresa.length+'</b><span>reservas recebidas</span></div>' +
      '<div class="numero"><b>'+kg.toFixed(1).replace(".",",")+' kg</b><span>alimentos aproveitados</span></div>' +
      '<div class="numero"><b>'+real(receita)+'</b><span>receita recuperada</span></div>' +
    '</div>' +
    '<div class="painel-grid" style="margin-top:1.6rem">' +
      '<form class="cartao" id="formNovoProduto">' +
        '<h3 style="margin-bottom:.9rem">Publicar novo produto</h3>' +
        '<div class="campo"><label for="npNome">Nome do produto</label><input type="text" id="npNome" required placeholder="Kit surpresa"></div>' +
        '<div class="campo dupla"><div><label for="npPreco">Preço ReUse (R$)</label><input type="number" id="npPreco" min="0" step="0.5" value="9"></div><div><label for="npOriginal">Preço original (R$)</label><input type="number" id="npOriginal" min="0" step="0.5" value="22"></div></div>' +
        '<div class="campo dupla"><div><label for="npQtd">Unidades</label><input type="number" id="npQtd" min="1" value="4"></div><div><label for="npHora">Retirar até</label><input type="text" id="npHora" value="20h"></div></div>' +
        '<div class="campo"><label style="display:flex;gap:.5rem;align-items:flex-start;font-weight:400;color:var(--tinta-suave);font-size:.9rem"><input type="checkbox" id="npUltima" style="width:auto"> Marcar como Última Chance</label></div>' +
        '<button class="btn btn--bloco" type="submit">Publicar produto</button>' +
        '<p class="aviso" id="avisoNovoProduto"></p>' +
      '</form>' +
      '<div>' +
        '<h3 style="margin-bottom:.8rem">Produtos cadastrados</h3>' +
        '<div class="lista" id="listaProdutosEmpresa"></div>' +
        '<p class="vazio" id="produtosVazio">Nenhum produto cadastrado ainda.</p>' +
        '<h3 style="margin:1.6rem 0 .8rem">Últimas reservas</h3>' +
        '<div class="lista" id="listaReservasEmpresa"></div>' +
        '<p class="vazio" id="reservasEmpresaVazio">Nenhuma reserva recebida ainda.</p>' +
      '</div>' +
    '</div>' +
  '</div></section>';

  return {html:html, init:function(){
    function renderProdutos(){
      var lp = document.getElementById("listaProdutosEmpresa");
      var arr = PRODUTOS_POR_EMPRESA[emp.id]||[];
      lp.innerHTML = arr.map(function(p){
        return '<div class="item"><span class="item__icone">🍽️</span><div class="item__txt"><b>'+esc(p[0])+'</b><span>'+real(p[4])+' (de '+real(p[3])+') · '+p[5]+' em estoque · retirar até '+esc(p[6])+'</span></div></div>';
      }).join("");
      document.getElementById("produtosVazio").hidden = arr.length>0;
    }
    function renderReservas(){
      var lr = document.getElementById("listaReservasEmpresa");
      var arr = estado.reservas.filter(function(r){return r.empresaId===emp.id;});
      lr.innerHTML = arr.map(function(r){
        return '<div class="item"><span class="item__icone">🧾</span><div class="item__txt"><b>'+esc(r.nome)+'</b><span>'+r.data+' · '+real(r.valor)+' · código '+esc(r.cod)+'</span></div><span class="status status--'+r.status+'">'+(r.status==="reservado"?"Reservado":r.status==="retirado"?"Retirado":"Cancelado")+'</span></div>';
      }).join("");
      document.getElementById("reservasEmpresaVazio").hidden = arr.length>0;
    }
    renderProdutos(); renderReservas();

    document.getElementById("formNovoProduto").addEventListener("submit", function(e){
      e.preventDefault();
      var nome = document.getElementById("npNome").value.trim()||"Novo produto";
      var preco = parseFloat(document.getElementById("npPreco").value)||0;
      var original = parseFloat(document.getElementById("npOriginal").value)||0;
      var qtd = parseInt(document.getElementById("npQtd").value,10)||1;
      var hora = document.getElementById("npHora").value.trim()||"20h";
      var ultima = document.getElementById("npUltima").checked;
      var novo = [nome,"Publicado agora pela empresa",["Item avulso"],original,preco,qtd,hora,"🍽️",ultima];
      if(!PRODUTOS_POR_EMPRESA[emp.id]) PRODUTOS_POR_EMPRESA[emp.id]=[];
      PRODUTOS_POR_EMPRESA[emp.id].push(novo);
      PRODUTOS.push({id:"u"+Date.now(),empresaId:emp.id,nome:novo[0],descricao:novo[1],itens:novo[2],precoOriginal:novo[3],precoReuse:novo[4],qtd:novo[5],retirada:novo[6],emoji:novo[7],ultimaChance:novo[8]});
      renderProdutos();
      document.getElementById("avisoNovoProduto").textContent = "Produto publicado. Já aparece na página pública da empresa.";
      document.getElementById("npNome").value="";
      setTimeout(function(){ var a=document.getElementById("avisoNovoProduto"); if(a) a.textContent=""; },4000);
    });
  }};
}

/* ---------------------------------------------------------------------- */
/* ROTEADOR                                                                */
/* ---------------------------------------------------------------------- */

function analisarHash(){
  var h = location.hash || "#/";
  var semAncora = h.slice(1); // remove #
  var partes = semAncora.split("?");
  var caminho = partes[0] || "/";
  var query = partes[1] || "";
  return {caminho:caminho, query:query};
}

function renderizar(){
  var rota = analisarHash();
  var app = document.getElementById("app");
  var seg = rota.caminho.split("/").filter(Boolean); // ex: ["empresa","padaria-pao-do-dia"]
  var pagina;

  if(seg.length===0){
    app.innerHTML = paginaHome();
    ligarAcoesCartoes(app);
    ligarBuscaHome();
    marcarLinkAtivo("#/");
    atualizarContadores();
    return;
  }

  if(seg[0]==="ofertas"){ pagina = paginaOfertas(rota.query); marcarLinkAtivo("#/ofertas"); }
  else if(seg[0]==="ultima-chance"){ pagina = paginaUltimaChance(); marcarLinkAtivo("#/ofertas"); }
  else if(seg[0]==="empresas"){ pagina = paginaEmpresas(rota.query); marcarLinkAtivo("#/empresas"); }
  else if(seg[0]==="empresa" && seg[1]){ pagina = paginaEmpresa(seg[1]); marcarLinkAtivo("#/empresas"); }
  else if(seg[0]==="produto" && seg[1]){ pagina = paginaProduto(seg[1]); marcarLinkAtivo("#/ofertas"); }
  else if(seg[0]==="favoritos"){ pagina = paginaFavoritos(); marcarLinkAtivo(""); }
  else if(seg[0]==="reservas"){ pagina = paginaReservas(); marcarLinkAtivo(""); }
  else if(seg[0]==="perfil"){ pagina = paginaPerfil(); marcarLinkAtivo(""); }
  else if(seg[0]==="como-funciona"){ pagina = paginaComoFunciona(); marcarLinkAtivo("#/como-funciona"); }
  else if(seg[0]==="impacto"){ pagina = paginaImpacto(); marcarLinkAtivo("#/impacto"); }
  else if(seg[0]==="ods12"){ pagina = paginaOds12(); marcarLinkAtivo("#/ods12"); }
  else if(seg[0]==="cadastro-empresa"){ pagina = paginaCadastroEmpresa(); marcarLinkAtivo(""); }
  else if(seg[0]==="painel-empresa"){ pagina = paginaPainelEmpresa(rota.query); marcarLinkAtivo(""); }
  else {
    pagina = {html:'<section class="secao"><div class="wrap"><p class="vazio">Página não encontrada. <a data-rota="#/">Voltar ao início</a>.</p></div></section>', init:function(){}};
  }

  app.innerHTML = pagina.html;
  ligarAcoesCartoes(app);
  if(pagina.init) pagina.init();
  atualizarContadores();
}

function marcarLinkAtivo(rota){
  document.querySelectorAll("#navLinks a").forEach(function(a){
    a.classList.toggle("ativo", a.getAttribute("data-rota")===rota);
  });
}

/* busca rápida do topo (ícone lupa) */
document.getElementById("btnBuscaTopo").addEventListener("click", function(){
  var termo = prompt("O que você está procurando?");
  if(termo!==null && termo.trim()!==""){
    navegar("#/ofertas?q="+encodeURIComponent(termo.trim()));
  }
});

window.addEventListener("hashchange", function(){ renderizar(); window.scrollTo({top:0,behavior:"smooth"}); });

/* ---------------------------------------------------------------------- */
/* INÍCIO                                                                  */
/* ---------------------------------------------------------------------- */

carregarEstado();
atualizarContadores();
if(!location.hash) location.hash = "#/";
renderizar();
