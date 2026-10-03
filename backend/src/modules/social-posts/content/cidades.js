// Catálogo da série "Cidades da Rota" no Instagram, NA ORDEM DA TRAVESSIA: a rota sai de Campo Grande
// (1ª) para o Pacífico — Sidrolândia (2ª), Bonito (desvio a partir de Guia Lopes/Jardim), Jardim, Porto
// Murtinho (última do Brasil), a ponte para Carmelo Peralta, o Chaco (Filadélfia, Mariscal Estigarribia),
// a entrada na Argentina por Tartagal, Salta, Jujuy, o Paso de Jama e os portos do Chile.
// A posição na lista É a "parada" que a arte (NN/14) e a legenda anunciam (Hamilton, 03/10).
// Fonte: as páginas das cidades do site (frontend/src/pages/public/*Page.jsx — props country e
// tagline). A tabela `cities` do banco é dado de exemplo antigo (Cuiabá, Bolívia) e não é usada.
// Frases com a grafia corrigida; o texto completo de cada cidade, que alimenta a legenda, é extraído
// por scripts/extract-city-texts.mjs para assets/social/cidades/<slug>.txt.
export const CIDADES = [
    { slug: "campo-grande", nome: "Campo Grande", pais: "Brasil", foto: "campo_grande", frase: "A Capital Morena — porta do Pantanal e hub da Rota Bioceânica." },
    { slug: "sidrolandia", nome: "Sidrolândia", pais: "Brasil", foto: "sidrolandia", frase: "Onde o agronegócio encontra o povo Terena, o cerrado e a logística que move um continente." },
    { slug: "bonito", nome: "Bonito", pais: "Brasil", foto: "bonito", frase: "Rios cristalinos de 40 metros de visibilidade — onde a lei de 1997 protege o que o turismo poderia ter destruído." },
    { slug: "jardim", nome: "Jardim", pais: "Brasil", foto: "jardim", frase: "Serra da Bodoquena, lagoas azul-esmeralda e a porta natural entre o Cerrado e o Pantanal." },
    { slug: "porto-murtinho", nome: "Porto Murtinho", pais: "Brasil", foto: "porto_murtinho", frase: "A última cidade brasileira antes da travessia — onde o Rio Paraguai separa dois mundos." },
    { slug: "carmelo-peralta", nome: "Carmelo Peralta", pais: "Paraguai", foto: "carmelo_peralta", frase: "Primeira cidade paraguaia — do outro lado da ponte bioceânica, o Chaco começa aqui." },
    { slug: "filadelfia", nome: "Filadélfia", pais: "Paraguai", foto: "filadelfia", frase: "Colônia menonita que transformou o deserto do Chaco em polo agroindustrial." },
    { slug: "mariscal-estigarribia", nome: "Mariscal Estigarribia", pais: "Paraguai", foto: "mariscal_estigarribia", frase: "Novo polo logístico do Chaco — cruzamento estratégico entre a Rota Bioceânica e a Transchaco." },
    { slug: "tartagal", nome: "Tartagal", pais: "Argentina", foto: "tartagal", frase: "Cinco povos originários, a floresta das Yungas e o carnaval multicultural mais vivo do norte argentino." },
    { slug: "salta", nome: "Salta", pais: "Argentina", foto: "salta", frase: "A alma folclórica dos Andes argentinos — colonial, vibrante e portão para as nuvens." },
    { slug: "jujuy", nome: "Jujuy", pais: "Argentina", foto: "jujuy", frase: "Quebrada de Humahuaca, patrimônio da UNESCO — 10.000 anos de história nos cânions andinos mais coloridos do mundo." },
    { slug: "antofagasta", nome: "Antofagasta", pais: "Chile", foto: "antofagasta", frase: "Onde o Atacama beija o Pacífico — capital do cobre, dos observatórios e da maior vista continental do oceano." },
    { slug: "iquique", nome: "Iquique", pais: "Chile", foto: "iquique", frase: "Porto histórico, duna urbana de 400 metros e a memória salitreira que moldou o Chile moderno." },
    { slug: "mejillones", nome: "Mejillones", pais: "Chile", foto: "mejillones", frase: "O encerramento simbólico da travessia continental — porto artesanal, camanchaca e o pôr do sol mais emocionante do Pacífico." },
];

export const urlCidade = (slug) => `https://www.rota4mundos.com.br/cidades/${slug}`;
export const infograficoCidade = (slug) => `infografico-${slug}.jpg`;
