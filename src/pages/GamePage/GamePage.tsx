import { useParams } from 'react-router-dom';
import styles from './GamePage.module.scss';
import { Spinner } from '../../components/Spinner/Spinner';
import { Rate } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { useGetGameByIdQuery } from '../../store/Slices/api/apiSlice';


export const GamePage = ( ) => {

    const { id } = useParams();

    const { data: game, isLoading, error } = useGetGameByIdQuery(id);

    if (!game && !isLoading) {
        return <h1>This game is not exist!</h1>
    }

    if (isLoading) {
        return <Spinner size='large' />
    }

    if(error) {
        return <h1>Something went wrong!</h1>
    }

    return (
        <section className={`${styles.wrapper} ${styles.container}`}>
            <h1>{game?.name}</h1>
            <div className={styles.body}>
                <div className={styles.image}>
                    <img src={game?.poster} alt={game?.name} />
                </div>
                <div>
                    <h3>Description:</h3>
                    <p>{game?.description}</p>
                    <Rate 
                        style={{ marginTop: 20 }}
                        disabled allowHalf 
                        value={game?.rating}
                        />
                    <dl>
                        <dt><strong>Platforms:</strong></dt>
                        {game?.platform?.map((p:string) => (
                            <dd key={p}>{p}</dd>
                        ))}
                    </dl>
                    <dl>
                        <dt><strong>Max Offline Players: </strong>{game?.maxOfflinePlayers}</dt>
                    </dl>
                    <dl>
                    <dt>
                        <strong>Online Multiplayer: </strong>
                        {game?.onlineMultiplayer ? (
                            <CheckSquareOutlined style={{ color: 'green', fontSize: '24px', position: 'relative', top: '5px' }} />
                        ) : (
                            <CloseSquareOutlined style={{ color: 'red', fontSize: '24px', position: 'relative', top: '5px' }} />
                        )}
                    </dt>
                    </dl>
                    <dl>
                        <dt><strong>Languages:</strong></dt>
                        {game?.languages?.map((l:string) => (
                            <dd key={l}>{l}</dd>
                        ))}
                    </dl>
                    <dl>
                        <strong>Russian Voiceover: </strong>
                        {game?.russianVoiceover ? (
                            <CheckSquareOutlined style={{ color: 'green', fontSize: '24px', position: 'relative', top: '5px' }} />
                        ) : (
                            <CloseSquareOutlined style={{ color: 'red', fontSize: '24px', position: 'relative', top: '5px' }} />
                        )}
                    </dl>
                </div>
            </div>
            <div className={styles.screenshots}>
                {
                    game?.screenshots?.map((s:string) => (
                        <div key={s} className={styles.screenshot}>
                            <img src={s} alt={game?.name} />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}