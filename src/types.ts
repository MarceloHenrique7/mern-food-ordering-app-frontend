export type User = { // criamos um type dos dados do nosso usuario 
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export type MenuItem = { // como isso e um schema então ele vai conter o _id
    _id: string;
    name: string;
    price: number;
}

export type Restaurant = { // criamos um type dos dados do nosso restaurante
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[]; // então aqui dizemos que vamos ter um array do tipo MenuItem
    imageUrl: string;
    lastUpdated: string;
}

export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered"

export type Order = { // criamos um tipo para o pedido
    _id: string; // teremos um id do pedido
    restaurant: Restaurant; // teremos um restaurante que foi feito o pedido
    user: User; // teremos o usuário que fez o pedido
    cartItems: { // teremos um carrinhos de items
        menuItemId: string;
        name: string;
        quantity: string;
    }[]; // esse [] indica que cartItems vai ser um array, que vai conter varios objetos com essas três propiedades
    deliveryDetails: {
        name: string;
        addressLine1: string;
        city: string;
        email: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    restaurantId: string;
}

export type RestaurantSearchResponse = { // definimos um tipo de resposta que nossa função de search (busca) traz para a gente
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}


