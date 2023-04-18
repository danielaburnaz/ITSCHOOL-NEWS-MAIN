import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { getNewsDetails } from "../api/adaptors";
import Button from "react-bootstrap/Button";
import styles from "./NewsDetails.module.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";



function NewsDetails() {
  const { favoritesDispatch, favoritesState } = useContext(FavoritesContext);
  let { newsId } = useParams();
  newsId = decodeURIComponent(newsId);
  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
  const newsDetails = useFetch(newsDetailsEndpoint);
  const adaptedNewsDetails = getNewsDetails(newsDetails);
  const [isAlertShown, showAlert] = useState(false);

  const [_, setLocalStorage] = useLocalStorage("favorites", favoritesState);
  useEffect(() => {
    setLocalStorage(favoritesState);
  }, [favoritesState, setLocalStorage]);

  const { title, description, image, date, author, content, thumbnail } =
    adaptedNewsDetails;
  const formattedDate = getFormattedDate(date);

  function handleAddToFavorites(news) {
    const actionResult = addToFavorites(news);
    favoritesDispatch(actionResult);
    showAlert(true);
    setTimeout(()=> {
      showAlert(false);
    }, 2000);
  }



  return (
    <Layout>
      {isAlertShown && 
        <Alert variant="warning" id={styles.alert}>
          Yay! Poti vedea oricand stirea salvata in sectiunea{' '}
          <Link to="/favorites" id={styles.favorite}>Favorite!</Link> :D
        </Alert>
      }
      <Container className={`${styles.newsDetails} my-5`}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            <div
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button
                onClick={() => {
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });

                }}
              >
                Adaugă la favorite
              </Button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default NewsDetails;
