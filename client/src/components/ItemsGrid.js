import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ItemCard from './ItemCard';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useItems, useUserPurchases } from '../hooks/useDataApi';
import { useWS } from '../hooks/useWS';
import { SERVER_BASE_URL } from '../config';
import './ItemsGrid.css';

const orderHeaders = new Headers();
orderHeaders.append('Content-Type', 'application/json');

const ItemsGrid = ({ userId }) => {
  const [shouldRefreshPurchased, setShouldRefreshPurchased] = useState();
  const [loading, setLoading] = useState(false);
  const items = useItems();
  const purchased = useUserPurchases(userId, shouldRefreshPurchased);

  const onMessage = useCallback((message) => {
    const data = JSON.parse(message.data);
    if (data.event === 'purchased') {
      // set shouldRefreshPurchased to timestamp and not boolean
      // so useUserPurchases would not need to set it back to false after refreshing
      setShouldRefreshPurchased(new Date().getTime());
    }
  }, []);

  const getRequestOptions = useCallback(
    (itemId) => ({
      method: 'POST',
      headers: orderHeaders,
      body: JSON.stringify({
        itemId,
      }),
    }),
    []
  );

  useWS(userId, onMessage);

  const onOrder = useCallback(
    async (itemId) => {
      try {
        setLoading(true);

        const requestOptions = getRequestOptions(itemId);

        await fetch(`${SERVER_BASE_URL}/users/${userId}/order`, requestOptions);
      } catch (err) {
        console.error('Error ordering new item');
      } finally {
        setLoading(false);
      }
    },
    [getRequestOptions, userId]
  );

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        {loading && (
          <div className='loader-wrapper'>
            <CircularProgress size={150} className='loader' />
          </div>
        )}
        <Grid container spacing={4}>
          {items.map((item) => (
            <ItemCard
              title={item.title}
              limit={item.limit}
              key={item.id}
              itemsRemains={item.limit - (purchased[item.id] || 0)}
              onClick={() => onOrder(item.id)}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ItemsGrid;
