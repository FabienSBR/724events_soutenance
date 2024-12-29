// Ce code est un composant React appelé EventList. 
// Il affiche une liste paginée d'événements, avec une option de filtrage par type. 
// Il utilise des composants comme EventCard, Select, et Modal pour la mise en page et l'interaction avec les événements.

import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// * Nombre d'évènements *
// Seuls 9 événements sont affichés par page
const PER_PAGE = 9;

// * Importation et Définition des États * : 2 états locaux, type et currentPage
// type : Le type d'événements sélectionné pour le filtrage.
// currentPage : La page actuellement affichée.
const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

// * Filtrage et Pagination *
// Si un type est sélectionné, seuls les événements de ce type sont affichés.
// Sinon, tous les événements sont affichés.
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type)) || []
  ).filter((_events, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  // * Mise à jour du Filtre *
  // Lorsqu'un type est sélectionné dans le composant Select, la fonction met à jour 'type' et réinitialise la pagination à la première page.
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialiser à la première page
    setType(evtType); // Mettre à jour le type sélectionné
  };

  // * Calcul du Nombre Total de Pages *
  // totalEvents : Nombre total d'événements correspondant au type sélectionné (ou tous les événements si aucun type n'est sélectionné).
  // pageNumber : Nombre total de pages, basé sur PER_PAGE
  const totalEvents =
    data?.events.filter((event) => (type ? event.type === type : true))
      .length || 0;
  const pageNumber = Math.ceil(totalEvents / PER_PAGE);

  // * Liste des Types Disponibles *
  // On utilise Set pour obtenir une liste unique des types d'événements à partir des données.
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));



  return (
    <>
      {error && <div>An error occurred</div>} 
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select // Menu déroulant
            selection={typeList} // sélection parmi les catégories proposées dans le menu déroulant (typeList)
            onChange={(value) => changeType(value)} // onChange : met à jour le type sélectionné via changeType
            titleEmpty={false} // le menu déroulant ne propose pas une option vide par défaut (comme "séléctionner une catégorie")
            label="Type d'événement" // ajout label : étiquette descriptive
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {Array.from({ length: pageNumber }, (_, n) => ( // Crée un tableau vide contenant exactement 'pageNumber' éléments (correspond au nombre de pages nécessaires pour afficher tous les éléments)
              <a
                key={`page-${n + 1}`}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
