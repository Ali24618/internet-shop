import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from 'jquery';

const Product = () => {
    const [object, setObject] = useState([]);
    const [basket, setBasket] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    let params = useParams();

    const products = async () => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${params.id}`);
            if (response.status === 200) {
                setObject(response.data);
            } else {
                setObject(null);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            setObject(null);
        }
    };

    useEffect(() => {
        products();
        const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasket(savedBasket);
    }, []);

    const addToBasket = (product) => {
        const updatedBasket = [...basket, product];
        setBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };
    const toggleDarkMode = () => {
        if (isDarkMode) {
            $('body').removeClass('dark-theme');
            localStorage.setItem('dark-theme', 'false');
        } else {
            $('body').addClass('dark-theme');
            localStorage.setItem('dark-theme', 'true');
        }
        setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
        const save = localStorage.getItem('dark-theme');
        if (save === 'true') {
            $('body').addClass('dark-theme');
            setIsDarkMode(true);
        }
    }, []);
    const handleBuy = () => {
        alert("Покупка совершена!"); // Здесь можно добавить логику для процесса покупки
        localStorage.removeItem("basket"); // Очищаем корзину после покупки
        setBasket([]);
    };
    const Nav = () => {
        window.location.href = '/';
    };
    const Add = () => {
        window.location.href = "/addpro";
    };
    return (
        <>
            <div className={isDarkMode ? "dark-mode" : "light-mode"}>
                {object != null ? (
                    <div className="container-fluid">
                        <div className="row bg-primary pon">
                            <div className="col-12 col-lg-2 text-center">
                                <h3 className="mt-1" onClick={Nav}><b>Internet Shop</b></h3>
                            </div>
                            <div className="col-lg-6"></div>
                            <div className="col-3 col-lg-1 text-center">
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <i className="fa-solid fa-language mt-1 ani"></i>
                                    </div>
                                    <div className="col-6 text-center">
                                        <i className="fa-solid fa-moon mt-1 ani" onClick={toggleDarkMode}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-lg-1 p-1">
                                Баланс:0
                            </div>
                            <div className="col-3 col-lg-1">
                                <select className="form-control bg-primary border-0">
                                    <option value="">Name</option>
                                    <option value="">Выйти</option>
                                </select>
                            </div>
                            <div className="col-2 col-lg-1 text-center p-1" onClick={Add}>
                                Добавить
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-12 col-lg-4 text-center">
                                <img className="shadow rounded" src={object.images ? object.images[0] : "https://via.placeholder.com/400"} width={400} alt={object.title} />
                                <div className="row">
                                    <div className="col-8">
                                        <h2><b>{object.title}</b></h2>
                                    </div>
                                    <div className="col-4 mt-1 text-success">
                                        <h3><b>{object.price}$</b></h3>
                                    </div>
                                </div>
                                <small>{object.description}</small>
                            </div>
                            <div className="col-12 col-lg-4 text-center p-5 mt-4">
                                <b>CPU:</b> {object.cpu || "N/A"}
                                <hr />
                                <b>Camera:</b> {object.camera || "N/A"}
                                <hr />
                                <b>Size:</b> {object.size || "N/A"}
                                <hr />
                                <b>Weight:</b> {object.weight || "N/A"}
                                <hr />
                                <b>Display:</b> {object.display || "N/A"}
                                <hr />
                                <b>Battery:</b> {object.battery || "N/A"}
                                <hr />
                                <b>Memory:</b> {object.memory || "N/A"}
                                <hr />
                            </div>
                            <div className="col-12 col-lg-4 p-3 text-center">
                                <h4>Quick shop</h4>
                                <div className="row bg-primary text-light p-3">
                                    {basket.length} Item(s) - ${basket.reduce((sum, item) => sum + item.price, 0)}
                                </div>
                                <div className="row">
                                    <div className="col-8 p-3">
                                        <h2><b>{object.title}</b></h2>
                                    </div>
                                    <div className="col-4 mt-1 text-success p-3">
                                        <h3><b>{object.price}$</b></h3>
                                    </div>
                                </div>
                                <a href="/"><button className="btn btn-outline-info rounded-0 p-2" style={{ width: 300, height: 50 }}>Back to store</button></a>
                                <p>
                                    <button
                                        onClick={() => addToBasket(object)}
                                        className="btn btn-outline-primary rounded-0 p-2"
                                        style={{ width: 300, height: 50 }}
                                    >
                                        Add to cart <i className="fa-solid fa-basket-shopping text-danger"></i>
                                    </button>
                                </p>
                                <button
                                    onClick={handleBuy}
                                    className="btn btn-success rounded-0 p-2"
                                    style={{ width: 300, height: 50 }}
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-5">
                        <h2>Product not found!</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default Product;
