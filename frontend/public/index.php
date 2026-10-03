<?php
// Rota 4 Mundos — porta de entrada do site no cPanel.
//
// O site é SPA (React): sem isto, toda URL devolve o mesmo index.html vazio, e Google, Bing,
// ChatGPT, Perplexity e as prévias de WhatsApp/Instagram não veem reportagem nem cidade nenhuma.
// Aqui cada página sai do servidor já com título, descrição, prévia de compartilhamento
// (Open Graph), dados estruturados (JSON-LD) e o TEXTO da página dentro de #root. O React monta
// por cima (createRoot substitui o conteúdo): para quem visita, nada muda.
//
// Dados: reportagens pela API (api.rota4mundos.com.br, cache curto em arquivo);
// cidades por seo/cidades.json, gerado no build a partir das páginas (scripts/gerar-seo-cidades.mjs).
// Se a API falhar, a página sai com os dados gerais — o site nunca cai por causa disto.

declare(strict_types=1);

const SITE = 'https://www.rota4mundos.com.br';
const API = 'https://api.rota4mundos.com.br/api';
const MARCA = 'Rota 4 Mundos';
const IMAGEM_PADRAO = SITE . '/og-rota4mundos.jpg';
const CATEGORIA_HISTORIAS = 'historias-da-rota';

// ── utilitários ──────────────────────────────────────────────────────────────────────────────

function e(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

function corta(string $s, int $max): string {
    $s = trim(preg_replace('/\s+/u', ' ', $s));
    if (mb_strlen($s) <= $max) return $s;
    $c = mb_substr($s, 0, $max - 1);
    $p = mb_strrpos($c, ' ');
    return rtrim($p > $max * 0.6 ? mb_substr($c, 0, $p) : $c, " ,;:.—-") . '…';
}

function pastaCache(): ?string {
    foreach ([dirname(__DIR__) . '/r4m-cache-seo', sys_get_temp_dir() . '/r4m-cache-seo'] as $d) {
        if (is_dir($d) || @mkdir($d, 0700, true)) { if (is_writable($d)) return $d; }
    }
    return null;
}

/** GET na API com cache em arquivo. Devolve o JSON decodificado ou null. */
function api(string $caminho, int $ttl = 600): ?array {
    $dir = pastaCache();
    $arq = $dir ? $dir . '/' . md5($caminho) . '.json' : null;
    if ($arq && is_file($arq) && time() - filemtime($arq) < $ttl) {
        $j = json_decode((string)file_get_contents($arq), true);
        if (is_array($j)) return $j;
    }
    $ch = curl_init(API . $caminho);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 3, CURLOPT_TIMEOUT => 6,
        CURLOPT_HTTPHEADER => ['Accept: application/json'], CURLOPT_USERAGENT => 'Rota4Mundos-SEO/1.0',
    ]);
    $corpo = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($status === 404) return ['__404' => true];
    $j = ($status === 200 && $corpo) ? json_decode((string)$corpo, true) : null;
    if (is_array($j)) {
        if ($arq) @file_put_contents($arq, $corpo, LOCK_EX);
        return $j;
    }
    // API fora do ar: serve o cache vencido, se houver
    if ($arq && is_file($arq)) { $v = json_decode((string)file_get_contents($arq), true); if (is_array($v)) return $v; }
    return null;
}

function cidades(): array {
    static $c = null;
    if ($c === null) $c = json_decode((string)@file_get_contents(__DIR__ . '/seo/cidades.json'), true) ?: [];
    return $c;
}

/** HTML das reportagens é nosso (agentes), mas passa por uma peneira mesmo assim. */
function htmlSeguro(string $h): string {
    $h = strip_tags($h, '<p><h2><h3><h4><strong><em><b><i><ul><ol><li><blockquote><a><br>');
    $h = preg_replace('/\s(on\w+|style|class)\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $h);
    return preg_replace('/href\s*=\s*(["\'])\s*javascript:[^"\']*\1/i', 'href="#"', $h);
}

// ── idioma e rota ────────────────────────────────────────────────────────────────────────────

$caminho = trim(rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/'), '/');
$lang = 'pt';
if (preg_match('#^(es|en)(?:/(.*))?$#', $caminho, $m)) { $lang = $m[1]; $caminho = $m[2] ?? ''; }
$prefixo = $lang === 'pt' ? '' : '/' . $lang;
$url = fn(string $p, ?string $l = null) => SITE . (($l ?? $lang) === 'pt' ? '' : '/' . ($l ?? $lang)) . ($p === '' ? '/' : '/' . $p);

$T = [
    'pt' => ['html' => 'pt-BR', 'og' => 'pt_BR',
        'home_t' => 'Rota 4 Mundos — Rota Bioceânica: notícias, cidades e histórias',
        'home_d' => 'O portal da Rota Bioceânica, de Campo Grande ao Pacífico: notícias do corredor, guias das 14 cidades no Brasil, Paraguai, Argentina e Chile, e as histórias, lendas e sabores do caminho.',
        'not_t' => 'Notícias da Rota Bioceânica', 'not_d' => 'Obras, comércio, turismo e desenvolvimento no Corredor Bioceânico — Brasil, Paraguai, Argentina e Chile.',
        'his_t' => 'Histórias da Rota', 'his_d' => 'Histórias, folclore, culinária, festas e curiosidades das cidades da Rota Bioceânica, verificadas em fontes.',
        'cid_t' => 'As 14 cidades da Rota Bioceânica', 'cid_d' => 'De Campo Grande a Mejillones: guias das cidades cortadas pela Rota Bioceânica no Brasil, Paraguai, Argentina e Chile.',
        'apo_t' => 'Apoie o Rota 4 Mundos', 'apo_d' => 'Apoie o portal que conta a Rota Bioceânica e as cidades do caminho.',
        'col_t' => 'Colabore com o Rota 4 Mundos', 'col_d' => 'Envie histórias, fotos e informações sobre as cidades da Rota Bioceânica.',
        'ult' => 'Últimas notícias', 'hist' => 'Histórias da Rota', 'cids' => 'Cidades da Rota', 'inicio' => 'Início', 'nao' => 'Página não encontrada',
        'guia' => 'Guia de %s — Rota Bioceânica'],
    'es' => ['html' => 'es', 'og' => 'es_LA',
        'home_t' => 'Rota 4 Mundos — Ruta Bioceánica: noticias, ciudades e historias',
        'home_d' => 'El portal de la Ruta Bioceánica, de Campo Grande al Pacífico: noticias del corredor y guías de las 14 ciudades en Brasil, Paraguay, Argentina y Chile.',
        'not_t' => 'Noticias de la Ruta Bioceánica', 'not_d' => 'Obras, comercio, turismo y desarrollo en el Corredor Bioceánico — Brasil, Paraguay, Argentina y Chile.',
        'his_t' => 'Historias de la Ruta', 'his_d' => 'Historias, folclore, gastronomía, fiestas y curiosidades de las ciudades de la Ruta Bioceánica.',
        'cid_t' => 'Las 14 ciudades de la Ruta Bioceánica', 'cid_d' => 'De Campo Grande a Mejillones: guías de las ciudades de la Ruta Bioceánica en Brasil, Paraguay, Argentina y Chile.',
        'apo_t' => 'Apoye Rota 4 Mundos', 'apo_d' => 'Apoye el portal que cuenta la Ruta Bioceánica y sus ciudades.',
        'col_t' => 'Colabore con Rota 4 Mundos', 'col_d' => 'Envíe historias, fotos e información sobre las ciudades de la Ruta Bioceánica.',
        'ult' => 'Últimas noticias', 'hist' => 'Historias de la Ruta', 'cids' => 'Ciudades de la Ruta', 'inicio' => 'Inicio', 'nao' => 'Página no encontrada',
        'guia' => 'Guía de %s — Ruta Bioceánica'],
    'en' => ['html' => 'en', 'og' => 'en_US',
        'home_t' => 'Rota 4 Mundos — Bioceanic Route: news, cities and stories',
        'home_d' => 'The Bioceanic Route portal, from Campo Grande to the Pacific: corridor news and guides to the 14 cities in Brazil, Paraguay, Argentina and Chile.',
        'not_t' => 'Bioceanic Route news', 'not_d' => 'Works, trade, tourism and development along the Bioceanic Corridor — Brazil, Paraguay, Argentina and Chile.',
        'his_t' => 'Stories of the Route', 'his_d' => 'Stories, folklore, food, festivals and curiosities from the cities of the Bioceanic Route.',
        'cid_t' => 'The 14 cities of the Bioceanic Route', 'cid_d' => 'From Campo Grande to Mejillones: guides to the cities of the Bioceanic Route in Brazil, Paraguay, Argentina and Chile.',
        'apo_t' => 'Support Rota 4 Mundos', 'apo_d' => 'Support the portal that tells the story of the Bioceanic Route and its cities.',
        'col_t' => 'Contribute to Rota 4 Mundos', 'col_d' => 'Send stories, photos and information about the cities of the Bioceanic Route.',
        'ult' => 'Latest news', 'hist' => 'Stories of the Route', 'cids' => 'Cities of the Route', 'inicio' => 'Home', 'nao' => 'Page not found',
        'guia' => '%s guide — Bioceanic Route'],
][$lang];

$org = ['@type' => 'NewsMediaOrganization', '@id' => SITE . '/#org', 'name' => MARCA, 'url' => SITE . '/',
    'logo' => ['@type' => 'ImageObject', 'url' => SITE . '/logo-full.png', 'width' => 1024, 'height' => 1024],
    'sameAs' => ['https://www.instagram.com/rota4mundos/']];

// valores padrão (servem também para quando a API falhar)
$pg = [
    'titulo' => $T['home_t'], 'descricao' => $T['home_d'], 'canonica' => $url($caminho), 'imagem' => IMAGEM_PADRAO,
    'tipo' => 'website', 'status' => 200, 'robots' => 'index, follow, max-image-preview:large',
    'alternativas' => null, 'jsonld' => [], 'corpo' => '', 'extra' => '',
];
$migalhas = fn(array $itens) => ['@type' => 'BreadcrumbList', 'itemListElement' => array_map(
    fn($i, $k) => ['@type' => 'ListItem', 'position' => $k + 1, 'name' => $i[0], 'item' => $i[1]], $itens, array_keys($itens))];
$traduzida = fn(string $p) => ['pt' => $url($p, 'pt'), 'es' => $url($p, 'es'), 'en' => $url($p, 'en')];

function listaDeArtigos(array $artigos, string $prefixo): string {
    $h = '<ul>';
    foreach ($artigos as $a) {
        $data = !empty($a['publishedAt']) ? date('d/m/Y', strtotime($a['publishedAt'])) : '';
        $h .= '<li><a href="' . e($prefixo . '/noticias/' . $a['slug']) . '">' . e($a['title']) . '</a>'
            . ($data ? ' <small>' . e($data) . '</small>' : '')
            . (!empty($a['excerpt']) ? '<p>' . e(corta($a['excerpt'], 220)) . '</p>' : '') . '</li>';
    }
    return $h . '</ul>';
}
function listaDeCidades(string $prefixo, string $lang): string {
    $h = '<ul>';
    foreach (cidades() as $slug => $l) {
        $c = $l[$lang] ?? $l['pt'];
        $h .= '<li><a href="' . e($prefixo . '/cidades/' . $slug) . '">' . e($c['nome']) . '</a> — ' . e($c['pais'] ?? '') . (!empty($c['frase']) ? ': ' . e($c['frase']) : '') . '</li>';
    }
    return $h . '</ul>';
}

// ── páginas ──────────────────────────────────────────────────────────────────────────────────

$partes = $caminho === '' ? [] : explode('/', $caminho);
$secao = $partes[0] ?? '';

if ($secao === '') {
    $pg['alternativas'] = $traduzida('');
    $not = api('/articles?limit=15&status=PUBLISHED&excludeCategory=' . CATEGORIA_HISTORIAS, 300)['data'] ?? [];
    $his = api('/articles?limit=6&status=PUBLISHED&category=' . CATEGORIA_HISTORIAS, 300)['data'] ?? [];
    $pg['jsonld'] = [$org, ['@type' => 'WebSite', '@id' => SITE . '/#site', 'name' => MARCA, 'url' => SITE . '/', 'inLanguage' => $T['html'], 'publisher' => ['@id' => SITE . '/#org']]];
    $pg['corpo'] = '<h1>' . e(MARCA) . '</h1><p>' . e($T['home_d']) . '</p>'
        . '<h2>' . e($T['ult']) . '</h2>' . listaDeArtigos($not, $prefixo)
        . ($his ? '<h2>' . e($T['hist']) . '</h2>' . listaDeArtigos($his, $prefixo) : '')
        . '<h2>' . e($T['cids']) . '</h2>' . listaDeCidades($prefixo, $lang);

} elseif (($secao === 'noticias' || $secao === 'historias') && count($partes) === 1) {
    $ehHist = $secao === 'historias';
    $pg['titulo'] = ($ehHist ? $T['his_t'] : $T['not_t']) . ' | ' . MARCA;
    $pg['descricao'] = $ehHist ? $T['his_d'] : $T['not_d'];
    $pg['alternativas'] = $traduzida($secao);
    $filtro = $ehHist ? '&category=' . CATEGORIA_HISTORIAS : '&excludeCategory=' . CATEGORIA_HISTORIAS;
    $lista = api('/articles?limit=40&status=PUBLISHED' . $filtro, 300)['data'] ?? [];
    $pg['jsonld'] = [$org, ['@type' => 'CollectionPage', 'name' => $ehHist ? $T['his_t'] : $T['not_t'], 'url' => $pg['canonica'], 'inLanguage' => $T['html']],
        $migalhas([[$T['inicio'], $url('')], [$ehHist ? $T['his_t'] : $T['not_t'], $pg['canonica']]])];
    $pg['corpo'] = '<h1>' . e($ehHist ? $T['his_t'] : $T['not_t']) . '</h1><p>' . e($pg['descricao']) . '</p>' . listaDeArtigos($lista, $prefixo);

} elseif ($secao === 'noticias' && count($partes) === 2) {
    $r = api('/articles/' . rawurlencode($partes[1]), 600);
    $a = $r['data'] ?? null;
    if (!$a || isset($r['__404']) || ($a['status'] ?? '') !== 'PUBLISHED') {
        if ($r !== null) { $pg['status'] = 404; $pg['titulo'] = $T['nao'] . ' | ' . MARCA; $pg['robots'] = 'noindex'; }
    } else {
        $ehHist = ($a['category']['slug'] ?? '') === CATEGORIA_HISTORIAS;
        $canon = SITE . '/noticias/' . $a['slug']; // reportagens são em português: /es e /en apontam para cá
        $img = !empty($a['featuredImage']) ? (str_starts_with($a['featuredImage'], 'http') ? $a['featuredImage'] : SITE . $a['featuredImage']) : IMAGEM_PADRAO;
        $desc = corta(strip_tags($a['metaDesc'] ?: ($a['excerpt'] ?: $a['content'])), 160);
        $tags = array_values(array_filter(array_map(fn($t) => $t['tag']['name'] ?? $t['name'] ?? null, $a['tags'] ?? [])));
        $pg = array_merge($pg, [
            'titulo' => corta($a['metaTitle'] ?: $a['title'], 70) . ' | ' . MARCA,
            'descricao' => $desc, 'canonica' => $canon, 'imagem' => $img, 'tipo' => 'article',
        ]);
        $pg['extra'] = '<meta property="article:published_time" content="' . e($a['publishedAt'] ?? '') . '">'
            . '<meta property="article:modified_time" content="' . e($a['updatedAt'] ?? '') . '">'
            . (!empty($a['category']['name']) ? '<meta property="article:section" content="' . e($a['category']['name']) . '">' : '');
        $pg['jsonld'] = [$org, [
            '@type' => $ehHist ? 'Article' : 'NewsArticle',
            'headline' => corta($a['title'], 110), 'description' => $desc, 'image' => [$img],
            'datePublished' => $a['publishedAt'] ?? $a['createdAt'], 'dateModified' => $a['updatedAt'] ?? $a['publishedAt'],
            'author' => ['@type' => 'Organization', 'name' => 'Redação ' . MARCA, 'url' => SITE . '/'],
            'publisher' => ['@id' => SITE . '/#org'], 'mainEntityOfPage' => $canon, 'inLanguage' => 'pt-BR',
            'articleSection' => $a['category']['name'] ?? ($ehHist ? 'Histórias da Rota' : 'Notícias'),
            'keywords' => $tags ?: null,
        ], $migalhas([['Início', SITE . '/'], [$ehHist ? 'Histórias da Rota' : 'Notícias', SITE . ($ehHist ? '/historias' : '/noticias')], [$a['title'], $canon]])];
        $outras = array_filter(api('/articles?limit=8&status=PUBLISHED', 300)['data'] ?? [], fn($o) => $o['slug'] !== $a['slug']);
        $pg['corpo'] = '<article><h1>' . e($a['title']) . '</h1>'
            . (!empty($a['publishedAt']) ? '<p><time datetime="' . e($a['publishedAt']) . '">' . e(date('d/m/Y', strtotime($a['publishedAt']))) . '</time></p>' : '')
            . (!empty($a['excerpt']) ? '<p><strong>' . e($a['excerpt']) . '</strong></p>' : '')
            . htmlSeguro((string)$a['content']) . '</article>'
            . ($outras ? '<h2>' . e($T['ult']) . '</h2>' . listaDeArtigos(array_slice($outras, 0, 6), '') : '');
    }

} elseif ($secao === 'cidades' && count($partes) === 1) {
    $pg['titulo'] = $T['cid_t'] . ' | ' . MARCA;
    $pg['descricao'] = $T['cid_d'];
    $pg['alternativas'] = $traduzida('cidades');
    $pg['jsonld'] = [$org, $migalhas([[$T['inicio'], $url('')], [$T['cids'], $pg['canonica']]])];
    $pg['corpo'] = '<h1>' . e($T['cid_t']) . '</h1><p>' . e($T['cid_d']) . '</p>' . listaDeCidades($prefixo, $lang);

} elseif ($secao === 'cidades' && count($partes) === 2 && isset(cidades()[$partes[1]])) {
    $slug = $partes[1];
    $c = cidades()[$slug][$lang] ?? cidades()[$slug]['pt'];
    $img = !empty($c['imagem']) ? SITE . $c['imagem'] : IMAGEM_PADRAO;
    $desc = corta(($c['frase'] ? $c['frase'] . ' ' : '') . ($c['paragrafos'][0] ?? ''), 160);
    $pg = array_merge($pg, [
        'titulo' => sprintf($T['guia'], $c['nome']) . ' | ' . MARCA, 'descricao' => $desc, 'imagem' => $img,
        'alternativas' => $traduzida('cidades/' . $slug),
    ]);
    $pg['jsonld'] = [$org, [
        '@type' => ['City', 'TouristDestination'], 'name' => $c['nome'], 'description' => $desc, 'image' => $img, 'url' => $pg['canonica'],
        'containedInPlace' => array_values(array_filter([
            $c['regiao'] ? ['@type' => 'AdministrativeArea', 'name' => $c['regiao']] : null,
            $c['pais'] ? ['@type' => 'Country', 'name' => $c['pais']] : null,
        ])),
    ], $migalhas([[$T['inicio'], $url('')], [$T['cids'], $url('cidades')], [$c['nome'], $pg['canonica']]])];
    $pg['corpo'] = '<article><h1>' . e($c['nome'] . ($c['apelido'] ? ' — ' . $c['apelido'] : '')) . '</h1>'
        . '<p>' . e(implode(' · ', array_filter([$c['regiao'], $c['pais']]))) . '</p>'
        . ($c['frase'] ? '<p><strong>' . e($c['frase']) . '</strong></p>' : '')
        . implode('', array_map(fn($p) => '<p>' . e($p) . '</p>', $c['paragrafos'])) . '</article>'
        . '<h2>' . e($T['cids']) . '</h2>' . listaDeCidades($prefixo, $lang);

} elseif (in_array($secao, ['apoie', 'colabore'], true) && count($partes) === 1) {
    $k = $secao === 'apoie' ? 'apo' : 'col';
    $pg['titulo'] = $T[$k . '_t'] . ' | ' . MARCA;
    $pg['descricao'] = $T[$k . '_d'];
    $pg['alternativas'] = $traduzida($secao);
    $pg['corpo'] = '<h1>' . e($T[$k . '_t']) . '</h1><p>' . e($T[$k . '_d']) . '</p>';

} elseif (in_array($secao, ['login', 'registro', 'minha-conta', 'admin'], true)) {
    $pg['robots'] = 'noindex, nofollow';
    $pg['titulo'] = MARCA;

} else {
    $pg['status'] = 404;
    $pg['titulo'] = $T['nao'] . ' | ' . MARCA;
    $pg['robots'] = 'noindex';
}

// ── montagem ─────────────────────────────────────────────────────────────────────────────────

$html = (string)@file_get_contents(__DIR__ . '/index.html');
if ($html === '') { http_response_code(503); exit('Rota 4 Mundos: manutenção rápida, volte em instantes.'); }

$cab = '<link rel="canonical" href="' . e($pg['canonica']) . '">'
    . '<meta name="robots" content="' . e($pg['robots']) . '">'
    . '<meta property="og:site_name" content="' . e(MARCA) . '">'
    . '<meta property="og:locale" content="' . e($T['og']) . '">'
    . '<meta property="og:type" content="' . e($pg['tipo']) . '">'
    . '<meta property="og:title" content="' . e($pg['titulo']) . '">'
    . '<meta property="og:description" content="' . e($pg['descricao']) . '">'
    . '<meta property="og:url" content="' . e($pg['canonica']) . '">'
    . '<meta property="og:image" content="' . e($pg['imagem']) . '">'
    . '<meta name="twitter:card" content="summary_large_image">'
    . '<meta name="twitter:title" content="' . e($pg['titulo']) . '">'
    . '<meta name="twitter:description" content="' . e($pg['descricao']) . '">'
    . '<meta name="twitter:image" content="' . e($pg['imagem']) . '">'
    . $pg['extra'];
if ($pg['alternativas']) {
    foreach (['pt' => 'pt-BR', 'es' => 'es', 'en' => 'en'] as $l => $hl) $cab .= '<link rel="alternate" hreflang="' . $hl . '" href="' . e($pg['alternativas'][$l]) . '">';
    $cab .= '<link rel="alternate" hreflang="x-default" href="' . e($pg['alternativas']['pt']) . '">';
}
if ($pg['jsonld']) {
    $grafo = ['@context' => 'https://schema.org', '@graph' => array_values(array_map(fn($n) => array_filter($n, fn($v) => $v !== null), $pg['jsonld']))];
    $cab .= '<script type="application/ld+json">' . json_encode($grafo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) . '</script>';
}

$html = preg_replace('#<html lang="[^"]*"#', '<html lang="' . $T['html'] . '"', $html, 1);
$html = preg_replace('#<title>.*?</title>#s', '<title>' . e($pg['titulo']) . '</title>', $html, 1);
$html = preg_replace('#<meta\s+name="description"\s+content="[^"]*"\s*/?>#s', '<meta name="description" content="' . e($pg['descricao']) . '">', $html, 1);
$html = str_replace('</head>', $cab . "\n</head>", $html);
if ($pg['corpo'] !== '') {
    // texto legível sem JavaScript; o React substitui ao montar
    $corpo = '<div style="max-width:760px;margin:0 auto;padding:24px 16px;font-family:Inter,system-ui,sans-serif;line-height:1.6;color:#0B2E4F">' . $pg['corpo'] . '</div>';
    $html = str_replace('<div id="root"></div>', '<div id="root">' . $corpo . '</div>', $html);
}

http_response_code($pg['status']);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache');
echo $html;
