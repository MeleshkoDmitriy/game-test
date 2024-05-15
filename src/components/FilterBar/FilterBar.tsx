import { useAppDispatch } from '../../hooks/hook'
import styles from './FilterBar.module.scss'
import { filterByMultiPlayers, filterByRusVoice, sortGamesByRating, throwQueryParams } from '../../store/Slices/querySlice';
import { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { TGame } from '../../types/types';

export const FilterBar: React.FC = () => {
    const [sorting, setSorting] = useState<[keyof TGame | undefined, 'ASC' | 'DESC' | undefined]>([undefined, undefined]);
    const [isVoice, setVoice] = useState<boolean>(false);
    const [isMultiPlayer, setMultiPlayer] = useState<boolean>(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>('All');
  
    const dispatch = useAppDispatch();
  
    const filterByPlatform = (platform: string) => {
      setSelectedPlatform(platform);
      setMultiPlayer(false);
      setVoice(false);
  
      if (platform === 'All') {
        dispatch(throwQueryParams(''));
      } else {
        dispatch(throwQueryParams(`?platform[]=${platform}`));
      }
    };
  
    useEffect(() => {
      dispatch(sortGamesByRating(sorting));
      dispatch(filterByMultiPlayers(isMultiPlayer));
      dispatch(filterByRusVoice(isVoice));
    }, [dispatch, sorting, isVoice, isMultiPlayer]);
  
    return (
      <section className={styles.wrapper}>
        <div className={styles.sorts}>
          <h2>Sorting:</h2>
          <div className={styles.sortButtons}>
            <Button onClick={() => setSorting(['rating', 'ASC'])}>
              Rating <ArrowUpOutlined />
            </Button>
            <Button onClick={() => setSorting(['rating', 'DESC'])}>
              Rating <ArrowDownOutlined />
            </Button>
          </div>
        </div>
        <div className={styles.filters}>
          <h2>Filtering:</h2>
          <div className={styles.platforms}>
            <Button
              className={styles.platform}
              type={selectedPlatform === 'All' ? 'primary' : 'default'}
              onClick={() => filterByPlatform('All')}
            >
              All
            </Button>
            <Button
              className={styles.platform}
              type={selectedPlatform === 'PC' ? 'primary' : 'default'}
              onClick={() => filterByPlatform('PC')}
            >
              PC
            </Button>
            <Button
              className={styles.platform}
              type={selectedPlatform === 'PlayStation' ? 'primary' : 'default'}
              onClick={() => filterByPlatform('PlayStation')}
            >
              PlayStation
            </Button>
            <Button
              className={styles.platform}
              type={selectedPlatform === 'Xbox' ? 'primary' : 'default'}
              onClick={() => filterByPlatform('Xbox')}
            >
              Xbox
            </Button>
            <Button
              className={styles.platform}
              type={selectedPlatform === 'Nintendo Switch' ? 'primary' : 'default'}
              onClick={() => filterByPlatform('Nintendo Switch')}
            >
              Nintendo Switch
            </Button>
          </div>
          <div className={styles.checkboxes}>
            <Checkbox
              className={styles.checkbox}
              checked={isMultiPlayer}
              onClick={() => setMultiPlayer(prev => !prev)}
            >
              Online Multiplayer
            </Checkbox>
            <Checkbox
              className={styles.checkbox}
              checked={isVoice}
              onClick={() => setVoice(prev => !prev)}
            >
              Russian Voiceover
            </Checkbox>
          </div>
        </div>
      </section>
    );
  };
