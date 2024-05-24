import React from 'react';
import Page from '../../components/pageski/Page'; // Assurez-vous que le chemin est correct
import Footer from '../../components/footer/Footer'; // Importez le composant Footer
import "./home.scss";
import ArticlesSection from '../../components/articlessection/ArticlesSection';

const Home = () => {
  return (
    <div className="home">
      <Page />
      <ArticlesSection />
      <Footer /> 
      
    </div>
  );
}

export default Home;
