import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useSnackBar } from "../../providers/SnackBarProvifer";
import ROUTES from "../../routes/routerModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "../services/cardApiService";

const useCards = () => {
  const [cards, setCards] = useState();
  const [card, setCard] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const snack = useSnackBar();
  const navigate = useNavigate();

  useAxios();

  const requestStatus = useCallback(
    (pending, errorMessage, cards, card = null) => {
      setIsPending(pending);
      setError(errorMessage);
      setCards(cards);
      setCard(card);
    },
    [cards]
  );

  const handleGetCards = useCallback(async () => {
    try {
      setIsPending(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);
  const handleGetCard = useCallback(async () => {
    try {
      setIsPending(true);
      const card = await getCard();
      requestStatus(false, null, null, card);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetMyCards = useCallback(async () => {
    try {
      setIsPending(true);
      const cards = await getMyCards();
      return requestStatus(false, null, cards);
    } catch (error) {
      return requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteCard = useCallback(async (cardId) => {
    try {
      setIsPending(true);
      const cardDeleted = await deleteCard(cardId);
      snack("success", "The card was seccessfully deleted");
      navigate(ROUTES.MY_CARDS);
      return requestStatus(false, null, cardDeleted);
    } catch (error) {
      return requestStatus(false, error, null);
    }
  }, []);

  const handleCreateCard = useCallback(async (cardFromClient) => {
    try {
      setIsPending(true);
      const normalizedCard = normalizeCard(cardFromClient);
      const cards = await createCard(normalizedCard);
      return requestStatus(false, null, cards);
    } catch (error) {
      return requestStatus(false, error, null);
    }
  }, []);

  const handleUpdateCard = useCallback(async (cardId, cardFromClient) => {
    try {
      setIsPending(true);
      const card = await editCard(cardId);
      requestStatus(false, null, null, card);
      snack("success", "The card was seccessfully updated");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleLikeCard = async (cardId) => {
    try {
      setIsPending(false);
      const card = await changeLikeStatus(cardId);
      const cards = await getCards();
      return requestStatus(false, null, cards, card);
    } catch (error) {
      return requestStatus(false, error, null);
    }
  };

  const value = useMemo(() => {
    return { isPending, card, cards, error };
  }, [isPending, card, cards, error]);

  return {
    value,
    handleGetCards,
    handleGetCard,
    handleGetMyCards,
    handleDeleteCard,
    handleCreateCard,
    handleUpdateCard,
    handleLikeCard,
  };
};

export default useCards;
