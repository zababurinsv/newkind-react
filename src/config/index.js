export let config = {
    SOCKET_URL: 'wss://trade.trademux.net:8800/?password=1234',
    STATIC_OPTIONS: {
        share: true,
        shouldReconnect: () => true,
    },
    STATISTIC: {
        mode: "Мода",
        mean: "cреднее",
        lost: "Потерянные",
        median: "Медиана",
        stdDev: "стандартное отклонение",
        performance: "время расчётов (mc)"
    },
    BUTTON: {
        connection: "connection",
        statistic: "statistic"
    }
}