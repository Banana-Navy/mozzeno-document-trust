# Showcase Mozzeno Document Trust

Microsite statique multipage destiné à expliquer le fonctionnement, les choix
techniques, la sécurité et la roadmap du vertical slice M1. Il est distinct de
l'interface analyste présente dans `frontend/`.

## Démarrage local

Depuis la racine du repository :

```bash
python3 -m http.server 4173 --directory showcase
```

Ouvrir `http://127.0.0.1:4173/`.

Le site n'a aucune dépendance runtime, aucun CDN, aucun analytics, aucun cookie et
aucune zone d'upload. La démonstration utilise uniquement des scénarios codés en dur
et entièrement synthétiques.

## Pages

- `index.html` : synthèse et preuves du M1;
- `fonctionnement.html` : pipeline interactif en huit étapes;
- `detecteurs.html` : détecteurs, indicateurs et policy;
- `demo.html` : simulation synthétique de cinq scénarios;
- `architecture.html` : M1/cible, choix techniques, bases et multi-agents;
- `securite.html` : frontières, menaces et contrôles;
- `gouvernance.html` : data readiness, références et cycle de vie;
- `roadmap.html` : jalons, décisions et FAQ.

## Identité visuelle et provenance

La palette reprend les couleurs observées le 2026-09-03 dans la feuille de style
publique de Mozzeno : `#222b54`, `#6bd9a8`, `#6f7ce3`, `#4e5576`, `#7a8098`,
`#f3f4f6` et `#eaebef`.

Le gris de marque `#7a8098` est conservé comme référence, mais le petit texte utilise
une variante assombrie `#5f6680` afin d’atteindre un contraste WCAG AA sur fond blanc.
Les badges utilisent explicitement le navy : le menthe n’est jamais employé seul comme
code d’authenticité.

Sources publiques :

- `https://www.mozzeno.com/fr/`;
- `https://www.mozzeno.com/wp-content/themes/mozzeno-public-2021/style.min.css?v=20260825.1`.

La police propriétaire Marine n'est pas embarquée faute de licence vérifiée. Le site
utilise la pile système de fallback publiée par Mozzeno.

La structure du footer et les assets de marque proviennent de la bibliothèque interne
Banana Navy. Les copies PNG ont été réencodées avec leurs pixels inchangés et sans
métadonnées XMP/EXIF. La mention Défense/STRIKE IT est explicitement qualifiée comme
information corporate Banana Navy et non comme une certification de Mozzeno ou de
cette plateforme.

La planche `assets/illustrations/separation-visual-kit.png` a été fournie par le
commanditaire pour la section « Observer, interpréter, puis décider humainement ».
Elle est réutilisée comme sprite local au moyen de crops CSS, sans appel externe ni
altération graphique.

## Publication GitHub Pages

Le dépôt public ne contient que ce microsite statique. La publication est effectuée
par GitHub Actions vers `https://banana-navy.github.io/mozzeno-document-trust/`.

## Garde-fous éditoriaux

- toujours distinguer `LIVRÉ M1`, `CIBLE PRODUCTION` et `GATE`;
- ne jamais présenter `NORMAL` comme une preuve d'authenticité;
- ne jamais présenter la simulation comme un benchmark réel;
- ne pas ajouter de vrai formulaire d'upload à ce microsite;
- maintenir les animations compatibles avec `prefers-reduced-motion`;
- ne pas ajouter de dépendance, police ou asset externe sans revue préalable.
