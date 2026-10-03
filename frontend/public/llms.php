<?php
// /llms.txt (o .htaccess reescreve para cá): o resumo do portal para assistentes de IA
// (ChatGPT, Claude, Perplexity), no formato llmstxt.org — o que é o site, as seções, as
// cidades e as reportagens mais recentes, com links. Cache de 30 min.
declare(strict_types=1);

const SITE = 'https://www.rota4mundos.com.br';

$dir = dirname(__DIR__) . '/r4m-cache-seo';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$arq = $dir . '/llms-artigos.json';
$j = null;
if (is_file($arq) && time() - filemtime($arq) < 1800) $j = json_decode((string)file_get_contents($arq), true);
if (!$j) {
    $ch = curl_init('https://api.rota4mundos.com.br/api/articles?status=PUBLISHED&limit=40');
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 3, CURLOPT_TIMEOUT => 8, CURLOPT_USERAGENT => 'Rota4Mundos-SEO/1.0']);
    $corpo = curl_exec($ch);
    $ok = curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
    curl_close($ch);
    $j = $ok ? json_decode((string)$corpo, true) : null;
    if ($j) @file_put_contents($arq, $corpo, LOCK_EX);
    elseif (is_file($arq)) $j = json_decode((string)file_get_contents($arq), true);
}
$cidades = json_decode((string)@file_get_contents(__DIR__ . '/seo/cidades.json'), true) ?: [];
$linha = fn(string $s) => trim(preg_replace('/\s+/u', ' ', $s));

$t = "# Rota 4 Mundos\n\n"
    . "> Portal sobre a Rota Bioceânica (Corredor Bioceânico Atlântico–Pacífico), que liga Campo Grande (Mato Grosso do Sul, Brasil) aos portos do norte do Chile, atravessando o Chaco paraguaio e o norte da Argentina. Publica notícias do corredor (obras, comércio, turismo, desenvolvimento), guias das 14 cidades da rota em português, espanhol e inglês, e histórias, folclore e culinária dessas cidades, verificados em fontes.\n\n"
    . "O conteúdo é em português do Brasil; as páginas das cidades também existem em espanhol (/es) e inglês (/en).\n\n"
    . "## Seções\n\n"
    . "- [Notícias da Rota Bioceânica](" . SITE . "/noticias): cobertura do Corredor Bioceânico no Brasil, Paraguai, Argentina e Chile\n"
    . "- [Histórias da Rota](" . SITE . "/historias): história, folclore, culinária, festas e personagens das cidades\n"
    . "- [Cidades da Rota](" . SITE . "/cidades): guias das 14 cidades, na ordem da travessia\n\n"
    . "## Cidades (de Campo Grande ao Pacífico)\n\n";
foreach ($cidades as $slug => $l) {
    $c = $l['pt'];
    $t .= '- [' . $c['nome'] . ' (' . ($c['pais'] ?? '') . ')](' . SITE . "/cidades/$slug)" . (!empty($c['frase']) ? ': ' . $linha($c['frase']) : '') . "\n";
}
$t .= "\n## Reportagens recentes\n\n";
foreach ($j['data'] ?? [] as $a) {
    $t .= '- [' . $linha($a['title']) . '](' . SITE . '/noticias/' . $a['slug'] . ')' . (!empty($a['excerpt']) ? ': ' . $linha($a['excerpt']) : '') . "\n";
}
$t .= "\n## Mais\n\n- [Mapa do site](" . SITE . "/sitemap.xml): todas as páginas e reportagens\n";

header('Content-Type: text/plain; charset=UTF-8');
header('Cache-Control: public, max-age=1800');
echo $t;
