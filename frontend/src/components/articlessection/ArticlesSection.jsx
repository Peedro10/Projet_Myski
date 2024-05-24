import React from 'react';
import './articlesSection.scss'; // Fichier de styles pour ce composant

// Importation des images pour les articles
import img1 from '../../assets/a1.jpg';
import img2 from '../../assets/a2.jpg';
import img3 from '../../assets/a3.jpg';
import img4 from '../../assets/a4.jpg';

// Importation des vidéos
import video1 from '../../assets/11.mp4';
import video2 from '../../assets/12.mp4';
import video3 from '../../assets/11.mp4';
import video4 from '../../assets/12.mp4';

// Données des articles, avec des vidéos correspondantes
const articles = [
  {
    title: "Voyages en altitude & bébé : une bonne idée ?",
    image: img1,
    description: "Avec l’arrivée du beau temps et des vacances scolaires, de nombreux parents envisagent de passer un séjour à la montagne, en famille. La montagne est un endroit magnifique et paisible qui offre de nombreuses possibilités d’activités en plein air. Cependant, il est important de se préparer correctement avant de partir en voyage avec un bébé.",
    video: video1
  },
  {
    title: "Le parapente – le moyen idéal pour découvrir les paysages quand on voyage",
    image: img2,
    description: "Nous avons tous rêvé de voler, car le vol est synonyme avec la liberté et les sensations fortes. Heureusement, de nos jours, le vol libre est accessible à tous.",
    video: video2
  },
  {
    title: "Tout savoir sur le roller ski",
    image: img3,
    description: "Mordu du ski nordique, vous voulez le pratiquer hors saison d’hiver ? Essayez le rollerski, une activité qui vous aidera à rester en forme pour votre sport préféré chaque fois que la neige est absente.",
    video: video3
  },
  {
    title: "Les 12 meilleures stations où skier en mai autour du monde",
    image: img4,
    description: "Passé le 28 avril et après la fermeture progressive de la plupart des stations de ski, seule une cinquantaine de domaines skiables à travers le monde (les plus hauts en altitude et donc bien souvent les plus enneigés) peuvent se targuer de rester ouverts durant le mois de mai.",
    video: video4
  },
  // Vous pouvez continuer à ajouter d'autres articles si nécessaire
];

const ArticlesSection = () => {
  return (
    <div className="articles-section">
      {articles.map((article, index) => (
        <div key={index} className="article">
          <img src={article.image} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <video controls>
            <source src={article.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default ArticlesSection;
