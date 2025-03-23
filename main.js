const orders = [
    { id: 1, item: "Laptop", paid: true },
    { id: 2, item: "Phone", paid: false },
    { id: 3, item: "Tablet", paid: true }
];

const deliveryData = {
    1: "Delivered in 3 days",
    3: "Delivered in 5 days"
};

function fetchDeliveryInfo(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ orderId, deliveryTime: deliveryData[orderId] || "Unknown" });
        }, 1000);
    });
}

function processOrder() {
    const promiseData = new Promise((resolve) => {
        setTimeout(() => {
            resolve(orders);
        }, 2000);
    });

    promiseData.then((orders) => {
        console.log(orders);
        const filterOrders = orders.filter(order => order.paid);

        if (!filterOrders.length) {
            throw new Error('Нет оплаченных заказов')
        }

        return filterOrders;
    })
        .then(filterOrders => {
            console.log(filterOrders);
            const deliveryPromiseOrders = filterOrders.map(order => fetchDeliveryInfo(order.id));
            
            Promise.all(deliveryPromiseOrders).then((deliveryOrders) => {
                return deliveryOrders;
            }).then(deliveryOrders => {
                console.log(deliveryOrders)
            });
        }).catch(err => console.log(err))
}

processOrder();