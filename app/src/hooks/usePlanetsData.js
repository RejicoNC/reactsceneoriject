import { useEffect, useState } from 'react';

const PLANET_NAMES = [
	'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Moon'
];

// Correspondance nom API -> nom fichier .glb
const PLANET_MODEL_MAP = {
	Mercury: 'Mercury.glb',
	Venus: 'Venus.glb',
	Mars: 'Mars.glb',
	Jupiter: 'Jupiter.glb',
	Saturn: 'Saturn.glb',
	Uranus: 'Uranus.glb',
	Neptune: 'Neptune.glb',
	Moon: 'Moon.glb',
};

// If you later add an Earth.glb to public/models/static, it will be picked up automatically.
PLANET_MODEL_MAP.Earth = 'Earth.glb';

const API_URL = 'https://api.le-systeme-solaire.net/rest/bodies/';

export default function usePlanetsData() {
	const [planets, setPlanets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchPlanets() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(API_URL);
				const data = await res.json();
				// Filtrer les vraies planètes
				const filtered = data.bodies.filter(
					// include listed names; allow Moon even though it's not flagged as isPlanet in the API
					(body) => PLANET_NAMES.includes(body.englishName) && (body.isPlanet || body.englishName === 'Moon')
				);
				// Formater les données utiles
				const formatted = filtered.map((body) => ({
					id: body.id,
					name: body.englishName,
					radius: body.meanRadius, // km
					distance: body.semimajorAxis, // km
					period: body.sideralOrbit, // jours
					modelPath: PLANET_MODEL_MAP[body.englishName]
						? `/models/planete/${PLANET_MODEL_MAP[body.englishName]}`
						: null,
					texture: null // à compléter si besoin
				}));
				setPlanets(formatted);
			} catch (e) {
				setError('Erreur lors du chargement des données planétaires.');
			} finally {
				setLoading(false);
			}
		}
		fetchPlanets();
	}, []);

	return { planets, loading, error };
}
