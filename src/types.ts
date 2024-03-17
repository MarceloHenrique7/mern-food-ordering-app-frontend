export type User = { // criamos um type dos dados do nosso usuario 
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

type MenuItem = { // como isso e um schema então ele vai conter o _id
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


export type RestaurantSearchResponse = { // definimos um tipo de resposta que nossa função de search (busca) traz para a gente
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}