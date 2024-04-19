import { useState, useEffect } from 'react';

export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetch(`http://localhost:4000/items`).then((response) => response.json());
        setItems(data);
      } catch (err) {
        console.error('Error fetching items', err);
      }
    };
    fetchItems();
  }, []);

  return items;
};

export const useUserPurchases = (userId, refreshPurchased) => {
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchOrders = async () => {
      try {
        const data = await fetch(`http://localhost:4000/users/${userId}/orders`).then((response) => response.json());
        setPurchased(data);
      } catch (err) {
        console.error('Error fetching items', err);
      }
    };
    fetchOrders();
  }, [userId, refreshPurchased]);

  return purchased;
};
