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
    },
    aside: {
        button: [
          "odd rows of data",
          "even rows of data",
          "all data"
        ]
    },
    table: {
        header: [
            "data",
            "Summary 1",
            "Summary 2",
            "Summary 3",
            "Summary 4",
            "Summary 5",
        ],
        body: [
            {
                assetId: 1,
                timestamp: 999888877777,
                description: 'description',
                name: 'Name',
                proofs: 'Proofs',
                sender: 'sender'
            },{
                assetId: 2,
                timestamp: 21312312,
                description: 'description ccvvvbn',
                name: 'Name',
                proofs: 'Proofs',
                sender: 'sender'
            },{
                assetId: 3,
                timestamp: 21312312,
                description: 'description dssss',
                name: 'Name',
                proofs: 'Proofs',
                sender: 'sender'
            },{
                assetId: 41112222,
                timestamp: 222222222,
                description: 'description rdaasfu',
                name: 'Name',
                proofs: 'Proofs',
                sender: 'sender'
            },{
                assetId: 5444222,
                timestamp: 21312312,
                description: 'description pppzzzzz',
                name: 'Name',
                proofs: '22',
                sender: 'sender'
            },{
                assetId: 'asfasfeqefq',
                timestamp: 21312312,
                description: 'description',
                name: 'Name',
                proofs: 'Proofs',
                sender: 'sender'
            },
        ],
        footer: [
            "assetId",
            "timestamp",
            "description",
            "name",
            "proofs",
            "sender"
        ]
    }
}