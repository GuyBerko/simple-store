import { useState, useEffect } from 'react';
import { SERVER_BASE_URL } from '../config';

export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetch(`${SERVER_BASE_URL}/items`).then((response) => response.json());
        setItems(data);
      } catch (err) {
        console.error('Error fetching items', err);
      }
    };
    fetchItems();
  }, []);

  return items;
};

export const useUserPurchases = (userId, shouldRefreshPurchased) => {
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchOrders = async () => {
      try {
        const data = await fetch(`${SERVER_BASE_URL}/users/${userId}/orders`).then((response) => response.json());
        setPurchased(data);
      } catch (err) {
        console.error('Error fetching user purchases', err);
      }
    };
    fetchOrders();
  }, [userId, shouldRefreshPurchased]);

  return purchased;
};
