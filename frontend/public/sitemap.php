<?php
// /sitemap.xml (o .htaccess reescreve para cá): páginas fixas e cidades nos 3 idiomas, com
// hreflang, mais todas as reportagens publicadas — o Repórter publica a cada 2h, então o mapa
// é montado da API (cache de 30 min), não escrito à mão.
declare(strict_types=1);

const SITE = 'https://www.rota4mundos.com.br';
const API = 'https://api.rota4mundos.com.br/api';

function pagina(int $n): ?array {
    $dir = dirname(__DIR__) . '/r4m-cache-seo';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $arq = $dir . "/sitemap-$n.json";
    if (is_file($arq) && time() - filemtime($arq) < 1800) return json_decode((string)file_get_contents($arq), true);
    $ch = curl_init(API . "/articles?status=PUBLISHED&limit=100&page=$n");
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 3, CURLOPT_TIMEOUT => 10, CURLOPT_USERAGENT => 'Rota4Mundos-SEO/1.0']);
    $corpo = curl_exec($ch);
    $ok = curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
    curl_close($ch);
    $j = $ok ? json_decode((string)$corpo, true) : null;
    if (is_array($j)) { @file_put_contents($arq, $corpo, LOCK_EX); return $j; }
    return is_file($arq) ? json_decode((string)file_get_contents($arq), true) : null;
}

$x = fn(string $s) => htmlspecialchars($s, ENT_XML1 | ENT_QUOTES, 'UTF-8');
$hoje = gmdate('Y-m-d');
$saida = [];

// páginas que existem nos 3 idiomas
$cidades = array_keys(json_decode((string)@file_get_contents(__DIR__ . '/seo/cidades.json'), true) ?: []);
$traduzidas = array_merge(['', 'noticias', 'historias', 'cidades', 'apoie', 'colabore'], array_map(fn($s) => "cidades/$s", $cidades));
foreach ($traduzidas as $p) {
    $u = fn(string $l) => SITE . ($l === 'pt' ? '' : "/$l") . ($p === '' ? '/' : "/$p");
    $alt = '';
    foreach (['pt' => 'pt-BR', 'es' => 'es', 'en' => 'en'] as $l => $hl) $alt .= '<xhtml:link rel="alternate" hreflang="' . $hl . '" href="' . $x($u($l)) . '"/>';
    $alt .= '<xhtml:link rel="alternate" hreflang="x-default" href="' . $x($u('pt')) . '"/>';
    $freq = in_array($p, ['', 'noticias', 'historias'], true) ? 'hourly' : 'weekly';
    foreach (['pt', 'es', 'en'] as $l) $saida[] = '<url><loc>' . $x($u($l)) . "</loc><changefreq>$freq</changefreq>$alt</url>";
}

// reportagens e histórias (só em português)
$n = 1;
do {
    $j = pagina($n);
    foreach ($j['data'] ?? [] as $a) {
        $mod = substr((string)($a['updatedAt'] ?? $a['publishedAt'] ?? $hoje), 0, 10);
        $saida[] = '<url><loc>' . $x(SITE . '/noticias/' . $a['slug']) . "</loc><lastmod>$mod</lastmod></url>";
    }
    $n++;
} while (($j['pagination']['hasNextPage'] ?? false) && $n <= 50);

header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=1800');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
    . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n"
    . implode("\n", $saida) . "\n</urlset>\n";
