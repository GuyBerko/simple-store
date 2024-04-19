import React, { useCallback, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from './Card';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useItems, useUserPurchases } from '../hooks/useDataApi';
import './ItemsGrid.css';
import { useWS } from '../hooks/useWS';

const orderHeaders = new Headers();
orderHeaders.append('Content-Type', 'application/json');

const ItemsGrid = ({ userId }) => {
  const [refreshPurchased, setRefreshPurchased] = useState();
  const [loading, setLoading] = useState(false);
  const items = useItems();
  const purchased = useUserPurchases(userId, refreshPurchased);
  
  const onMessage = useCallback((message) => {
    const data = JSON.parse(message.data);
    if (data.event === 'purchased') {
      setRefreshPurchased(new Date().getTime());
    }
  }, []);

  useWS(userId, onMessage);

  const onOrder = useCallback(
    async (itemId) => {
      try {
        setLoading(true);

        const requestOptions = {
          method: 'POST',
          headers: orderHeaders,
          body: JSON.stringify({
            itemId,
          }),
        };

        await fetch(`http://localhost:4000/users/${userId}/order`, requestOptions);
      } catch (err) {
        console.error('Error ordering new item');
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ m: 2 }}>
          {loading && (
            <div className='loader-wrapper'>
              <CircularProgress size={150} className='loader' />
            </div>
          )}
          <Grid container spacing={4}>
            {items.map((item) => (
              <Card
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
    </>
  );
};

export default ItemsGrid;
