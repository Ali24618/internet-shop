const Basket = ({ basketItems, removeFromBasket }) => {
        
    return (
        <div>
            <h2>Корзина</h2>
            {basketItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div className="row">
                        {basketItems.map(item => (
                            <div key={item.id} className="col-6">
                                <img src={item.images} className="card-img-top" />
                                <h6>{item.title}</h6>
                                <p>Цена: $ {item.price}</p>
                                <p>Количество: {item.quantity}</p>
                                <button onClick={() => removeFromBasket(item.id)} className="btn btn-danger btn-sm">
                                    Убрать
                                </button>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Basket;