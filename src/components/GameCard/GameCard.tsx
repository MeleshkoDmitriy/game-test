import { Button, Card, Rate } from 'antd';
import { TGame } from '../../types/types';
import { Link } from 'react-router-dom';
import styles from './GameCard.module.scss'

const { Meta } = Card;


export const GameCard: React.FC<TGame> = ( game ) => {

    const { 
        id,
        name,
        rating,
        description,
        poster
    } = game;

    return (
        <Link to={`/games/${id}`}>
            <Card
                className={styles.card}
                style={{ width: 300 }}
                cover={
                <img
                    alt={name}
                    src={poster}
                />
                }
            actions={[
                <div className={styles.actions}>
                    <Button type="primary">See More</Button>
                    <Button type="primary" disabled>Buy Now</Button>
                </div>
            ]}
        >
            <Meta   title={name} description={description} 
                    className={styles.meta}/>
            <Rate 
                style={{ marginTop: 20 }}
                disabled allowHalf 
                value={rating}
                />
        </Card>
      </Link>
    )
};

