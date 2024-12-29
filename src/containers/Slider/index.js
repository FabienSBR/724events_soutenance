// Ce code implémente un composant React appelé Slider, conçu pour afficher un carrousel d'événements qui défile automatiquement tous les 5 secondes.


import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // * Ordre *
  // 'sort' trie les événements par date ; les plus anciens apparaissent en premier
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // * Effet secondaire : Auto-défilement *
  // Effet déclenché à chaque changement de byDateDesc
  useEffect(() => {
    const interval = setInterval(() => { // setInterval définit un intervalle pour changer de diapositive toutes les 5 secondes
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0 //  Mise à jour de l'index : incrémentation ou réinitialisation
      );
    }, 5000);
    return () => clearInterval(interval); // Nettoyage avec clearInterval : empêche la création de multiples intervalles lors de mises à jour
  }, [byDateDesc]);



  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => ( 
        // utilisation de event.id à la place de event.title afin que chaque slide soit associée à une key unique
        <div key={event.id}> 
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          {index === idx && ( // Condition pour afficher le contenu suivant uniquement si l'index est égal à idx
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((paginationEvent, radioIdx) => (
                  <input
                    key={paginationEvent.id} // utilisation de paginationEvent.id à la place de event.id
                    type="radio"
                    name="radio-button"
                    checked={index === radioIdx} // index à la place d'idx ; vérification de la correspondance bouton radio à la diapositive associée
                    readOnly // pas de possibilité de modification manuelle par l'utilisateur (sécurité)
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
