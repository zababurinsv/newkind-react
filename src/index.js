import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import useWebSocket from 'react-use-websocket';
import { Statistics } from './components/Statistics'
import { math } from './utils/index'
import { config } from './config'
import './css/index.css';
import { Table } from './components/table/Table'

const handleClick = event => {
    event.target.classList.add('active');
    setTimeout(() => {
        event.target.classList.remove('active');
    }, 1500);
}

export const WebSocket = () => {
    const [currentSocketUrl, setCurrentSocketUrl] = useState(null);
    const [currentStatistic, setCurrentStatistic] = useState(null);
    const [messageHistory, setMessageHistory] = useState({
        id: 0,
        count: 0,
        mean: 0,
        stdDev: 0,
        sum: 0,
        sum_x2: 0,
        mean_x2: 0,
        median: 0,
        lost: 0,
        mode: {
            map: new Map(),
            max: 0,
            value: 0,
        }
    });

    let statistic = () => {
        let t0 = performance.now();
        const out = {
            mode: messageHistory.mode.value,
            mean: messageHistory.mean,
            lost: messageHistory.lost,
            median: messageHistory.median,
            stdDev: messageHistory.stdDev,
            performance: 0
        }
        let t1 = performance.now();
        out.performance = (t1 - t0).toFixed(3)
        return setCurrentStatistic(out)
    };

    const {
        lastMessage,
        readyState,
    } = useWebSocket(currentSocketUrl, config.STATIC_OPTIONS);

    useEffect(() => {
        lastMessage && setMessageHistory(prev => {
            prev.count++
            let object = JSON.parse(lastMessage.data)
            math.lost(prev, object.id)
            math.mean(prev, object.value)
            math.median(prev, object.value)
            math.stdDev(prev, object.value)
            math.mode(prev, object.value)
            return prev
        });
    }, [lastMessage]);

    const readyStateString = {
        0: 'CONNECTING', 1: 'OPEN', 2: 'CLOSING', 3: 'CLOSED',
    }[readyState];

    return (
        <div className={'-app'}>
            <Table></Table>
            <hr/>
            <h4 className={'-app__title'}>ReadyState: {readyStateString}</h4>
            <div className={'-app__control'}>
                <button
                    className={'-app__control-button'}
                    onClick={(events) => {
                        handleClick(events);
                        setCurrentSocketUrl(config.SOCKET_URL);
                    }}
                    disabled={currentSocketUrl === config.SOCKET_URL}
                >
                    { config.BUTTON.connection }
                </button>
                <button
                    className={'-app__control-button'}
                    onClick={(events) => {
                            handleClick(events)
                            statistic()
                        }
                    }
                >
                    { config.BUTTON.statistic }
                </button>
            </div>
            <div className={'-app__connection'}>
                <Statistics
                    header={ config.STATISTIC }
                    body={ currentStatistic }
                />
            </div>
        </div>
    );
};

render( <WebSocket />, document.getElementById('root') );
