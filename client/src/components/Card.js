import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';
import './Card.css';

const ItemCard = ({ title, limit, itemsRemains, onClick }) => {
  return (
    <>
      <Grid item xs={6}>
        <Card onClick={itemsRemains === 0 ? () => {} : onClick}>
          <CardContent className={classnames({ 'card-content': true, disabled: itemsRemains === 0 })}>
            <Typography variant='h3' gutterBottom>
              {title}
            </Typography>
            <Typography variant='h4' component='div'>
              {itemsRemains} / {limit}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ItemCard;
