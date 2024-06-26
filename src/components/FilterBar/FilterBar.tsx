import { useAppDispatch } from '../../hooks/hook'
import styles from './FilterBar.module.scss'
import { sortGamesByRating, throwQueryParams } from '../../store/Slices/querySlice';
import { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { TGame, TQueryParams } from '../../types/types';
import * as qs from 'qs';


export const FilterBar: React.FC = () => {
    const [sorting, setSorting] = useState<[keyof TGame | undefined, 'ASC' | 'DESC' | undefined]>([undefined, undefined]);
    const [isVoice, setVoice] = useState<boolean>(false);
    const [isMultiPlayer, setMultiPlayer] = useState<boolean>(false);
    const [isOfflinePlayers, setOfflinePlayers] = useState<boolean>(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>('All');
  
    const dispatch = useAppDispatch();
  
    const filterByPlatform = (platform: string) => {
      setSelectedPlatform(platform);
    };

    useEffect(() => {
      const queryParams: TQueryParams = {};
    
      if (selectedPlatform && selectedPlatform !== 'All') {
        queryParams.platform = [selectedPlatform];
      }
    
      if (isMultiPlayer) {
        queryParams.onlineMultiplayer = true;
      }
    
      if (isVoice) {
        queryParams.russianVoiceover = true;
      }
    
      if (isOfflinePlayers) {
        queryParams.maxOfflinePlayers = 2;
      }
    
      const queryString = qs.stringify(queryParams, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
      });
    
      dispatch(throwQueryParams(queryString));
      dispatch(sortGamesByRating(sorting));
    }, [selectedPlatform, isVoice, isMultiPlayer, isOfflinePlayers, sorting, dispatch]);
    
  
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
            <Checkbox
              className={styles.checkbox}
              checked={isOfflinePlayers}
              onClick={() => setOfflinePlayers(prev => !prev)}
            >
              Offline Players More Than One
            </Checkbox>
          </div>
        </div>
      </section>
    );
  };
