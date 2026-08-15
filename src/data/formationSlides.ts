export type FormationSlide = {
  id: string;
  title: string;
  brandTitle?: boolean;
  body: string;
  highlightTitle: string;
  highlightBody: string;
};

// condensé du fichier assets/formation_chauffeurs.pdf (sommaire + chapitre).
export const FORMATION_SLIDES: FormationSlide[] = [
  {
    id: "welcome",
    title: "Bienvenue chez RoulePourMoi",
    brandTitle: true,
    body: "Cette formation vous présente les bonnes pratiques, les règles de sécurité et vos engagements en tant que chauffeur partenaire.",
    highlightTitle: "Notre priorité",
    highlightBody:
      "Votre sécurité, celle de vos passagers et la qualité de chaque trajet.",
  },
  {
    id: "role",
    title: "Le rôle du chauffeur",
    body: "En tant que chauffeur RoulePourMoi, vous êtes un acteur clé de notre mission : permettre à nos clients de rentrer chez eux en toute sécurité avec leur propre véhicule.",
    highlightTitle: "Nous nous engageons",
    highlightBody:
      "Votre sécurité, une rémunération juste, une formation et un accompagnement, et un support dédié à chaque mission.",
  },
  {
    id: "securite",
    title: "Sécurité routière",
    body: "La sécurité est notre priorité absolue. Chaque décision que vous prenez sur la route a un impact direct sur la vie de nos clients, la vôtre et celle des autres usagers.",
    highlightTitle: "Rappelez-vous",
    highlightBody:
      "En cas de doute, ralentissez. En cas de risque, arrêtez-vous. Votre professionnalisme commence par une conduite irréprochable.",
  },
  {
    id: "relation",
    title: "Relation client",
    body: "Chaque client vous fait confiance pour prendre soin de lui et de son véhicule. Votre attitude, votre écoute et votre discrétion font toute la différence.",
    highlightTitle: "À retenir",
    highlightBody:
      "Un client satisfait est la meilleure publicité. Respect, écoute, discrétion et bienveillance.",
  },
  {
    id: "situations",
    title: "Situations sensibles",
    body: "Savoir réagir avec calme, discernement et professionnalisme face à des situations inattendues fait partie intégrante de votre rôle.",
    highlightTitle: "À retenir",
    highlightBody:
      "Anticiper, réagir, rassurer : vous êtes le professionnel sur lequel nos clients comptent.",
  },
  {
    id: "secours",
    title: "Premiers secours & assistance",
    body: "Votre capacité à bien réagir en cas d'urgence peut sauver des vies. Restez calme, sécurisez la situation et appliquez les bons gestes en attendant les secours.",
    highlightTitle: "Urgence vitale",
    highlightBody:
      "112 — ne jamais hésiter à appeler. Les secondes peuvent sauver des vies.",
  },
  {
    id: "procedures",
    title: "Procédures RoulePourMoi",
    body: "Face à des situations particulières, votre calme, votre jugement et le respect des protocoles sont essentiels pour assurer la sécurité de tous.",
    highlightTitle: "Rappelez-vous",
    highlightBody:
      "Vous n'êtes pas secouriste professionnel, mais votre réactivité compte. Le support est disponible 24h/24 et 7j/7.",
  },
  {
    id: "formation-continue",
    title: "Formation continue",
    body: "La qualité de service passe par l'amélioration continue des compétences. Restez à jour et progressez à votre rythme tout au long de votre activité.",
    highlightTitle: "Notre objectif",
    highlightBody:
      "Accompagner chaque chauffeur pour offrir à nos clients un service toujours plus sûr et professionnel.",
  },
  {
    id: "valeurs",
    title: "Nos valeurs",
    body: "Nos valeurs guident chacune de nos décisions et chaque action au quotidien. Elles sont le socle de la confiance que nos clients nous accordent.",
    highlightTitle: "Notre engagement",
    highlightBody:
      "Ces valeurs ne sont pas que des mots. Elles définissent qui nous sommes chaque jour.",
  },
];
