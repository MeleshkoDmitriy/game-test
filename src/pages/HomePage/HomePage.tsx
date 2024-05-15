import styles from './HomePage.module.scss';
import { GameCard } from '../../components/GameCard/GameCard';
import { TGame } from '../../types/types';
import { Spinner } from '../../components/Spinner/Spinner';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { useGetGamesWithParamsQuery } from '../../store/Slices/api/apiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { useEffect } from 'react';
import { pushGames } from '../../store/Slices/querySlice';

export const HomePage = () => {
    const { queryParams } = useAppSelector((state) => state.queryParams)

    console.log(queryParams)

    const { data: list, isLoading } = useGetGamesWithParamsQuery(queryParams); 

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(pushGames(list));
    }, [dispatch, list])

    const { games } = useAppSelector((state) => state.queryParams)

    return (
        <div className={`${styles.wrapper} ${styles.container}`}>
            <FilterBar />
            <section className={styles.gamesList}>
                { isLoading && <Spinner size='large'/> }
                {
                    games?.map((game: TGame) => {
                        return <GameCard key={game.id} {...game} />
                    })
                }
            </section>
        </div>
    )
}