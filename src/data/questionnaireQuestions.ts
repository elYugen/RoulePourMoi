export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

// quizz récupéré de assets/formation_chauffeurs.pdf
// (rôle du chauffeur, sécurité routière, relation client, situations sensibles,
// premiers secours, procédures RoulePourMoi, formation continue, nos valeurs).
export const QUESTIONNAIRE_QUESTIONS: QuizQuestion[] = [
  {
    question: "Quelle est la mission principale d'un chauffeur RoulePourMoi ?",
    options: [
      "Vendre des produits aux clients",
      "Ramener le client chez lui avec son propre véhicule",
      "Livrer des colis",
      "Effectuer des réparations mécaniques",
    ],
    correctIndex: 1,
  },
  {
    question: "Quel est l'âge minimum pour avoir le droit de conduire ?",
    options: ["16 ans", "17 ans", "18 ans", "21 ans"],
    correctIndex: 2,
  },
  {
    question: "Que devez-vous faire en cas de doute sur la route ?",
    options: ["Accélérer", "Ralentir", "Klaxonner", "Ignorer et continuer"],
    correctIndex: 1,
  },
  {
    question:
      "Quelle est la tolérance de RoulePourMoi en matière d'alcool au volant ?",
    options: [
      "Un verre maximum",
      "Tolérance zéro",
      "Selon la durée du trajet",
      "Aucune règle particulière",
    ],
    correctIndex: 1,
  },
  {
    question: "Que devez-vous vérifier avant chaque mission ?",
    options: [
      "Uniquement le niveau de carburant",
      "Véhicule, pneus, freins et éclairages",
      "Rien de particulier",
      "La météo uniquement",
    ],
    correctIndex: 1,
  },
  {
    question: "Quelle attitude adopter face à un client ?",
    options: [
      "Poser des questions indiscrètes",
      "Faire preuve de courtoisie et de discrétion",
      "Ignorer ses demandes",
      "Juger ses choix",
    ],
    correctIndex: 1,
  },
  {
    question: "Comment devez-vous traiter le véhicule du client ?",
    options: [
      "Comme le vôtre, avec soin",
      "Sans attention particulière",
      "Rapidement, sans précaution",
      "Cela n'a pas d'importance",
    ],
    correctIndex: 0,
  },
  {
    question: "Face à une situation inattendue, quelle est la bonne attitude ?",
    options: [
      "Paniquer",
      "Rester calme et évaluer la situation",
      "Abandonner la mission",
      "Appeler un ami",
    ],
    correctIndex: 1,
  },
  {
    question: "Que faire si un client semble malade pendant le trajet ?",
    options: [
      "Continuer sans rien dire",
      "L'ignorer",
      "Arrêter le véhicule en sécurité et évaluer la situation",
      "Accélérer pour finir vite",
    ],
    correctIndex: 2,
  },
  {
    question:
      "Quel est le numéro d'urgence européen, valable depuis un portable ?",
    options: ["15", "17", "18", "112"],
    correctIndex: 3,
  },
  {
    question: "Que signifie l'abréviation PLS ?",
    options: [
      "Position Latérale de Sécurité",
      "Procédure Légale de Sécurité",
      "Plan Local de Secours",
      "Position Longue Sécurisée",
    ],
    correctIndex: 0,
  },
  {
    question: "Que faire si le véhicule du client est introuvable ?",
    options: [
      "Annuler immédiatement sans vérifier",
      "Consulter la dernière position enregistrée sur l'application",
      "Abandonner la mission sur place",
      "Appeler la police directement",
    ],
    correctIndex: 1,
  },
  {
    question: "En cas de contrôle de police, quelle attitude adopter ?",
    options: [
      "Fuir",
      "Être courtois et présenter vos documents",
      "Refuser de répondre",
      "Discuter le motif du contrôle",
    ],
    correctIndex: 1,
  },
  {
    question: "Pourquoi suivre une formation continue ?",
    options: [
      "Ce n'est pas nécessaire",
      "Pour rester à jour et améliorer ses compétences",
      "Uniquement pour obtenir des primes",
      "Cela n'a aucun intérêt",
    ],
    correctIndex: 1,
  },
  {
    question: "Laquelle de ces valeurs fait partie des valeurs RoulePourMoi ?",
    options: [
      "Confidentialité",
      "Rapidité à tout prix",
      "Compétition entre chauffeurs",
      "Improvisation",
    ],
    correctIndex: 0,
  },
];
