import { useEffect, useState } from "react";
import axios from "axios";
import Basket from "./basket";
import $ from 'jquery';


const Home = () => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [block, setBlock] = useState(true);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [exactPrice, setExactPrice] = useState('');
    const [basketItems, setBasketItems] = useState(() => {

        const savedBasket = localStorage.getItem("basket");
        return savedBasket ? JSON.parse(savedBasket) : [];
    });
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basketItems));
    }, [basketItems]);

    const famous = async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');
            setProducts(response.data);
            setFilter(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const catego = async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const filterProducts = (searchQuery, min, max, category, exact) => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
            product.price >= min &&
            product.price <= max &&
            (category === '' || product.category.id === parseInt(category)) &&
            (exact === '' || product.price === parseFloat(exact))
        );
        setFilter(filtered);
        setBlock(filtered.length === 0);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        filterProducts(value, minPrice, maxPrice, selectedCategory, exactPrice);
    };

    const handleMinPriceChange = (event) => {
        const value = event.target.value;
        setMinPrice(value);
        filterProducts(query, value, maxPrice, selectedCategory, exactPrice);
    };

    const handleMaxPriceChange = (event) => {
        const value = event.target.value;
        setMaxPrice(value);
        filterProducts(query, minPrice, value, selectedCategory, exactPrice);
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        filterProducts(query, minPrice, maxPrice, value, exactPrice);
    };

    const handleExactPriceChange = (event) => {
        const value = event.target.value;
        setExactPrice(value);
        filterProducts(query, minPrice, maxPrice, selectedCategory, value);
    };

    const addToBasket = (product) => {
        setBasketItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromBasket = (productId) => {
        setBasketItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productId);
            if (existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevItems.filter(item => item.id !== productId);
            }
        });
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

    const Nav = () => {
        window.location.href = '/';
    };
    const Add = () => {
        window.location.href = '/addpro';
    };
    useEffect(() => {
        const save = localStorage.getItem('dark-theme');
        if (save === 'true') {
            $('body').addClass('dark-theme');
            setIsDarkMode(true);
        }
    }, []);
    useEffect(() => {
        famous();
        catego();
    }, []);

    return (
        <div className={isDarkMode ? "dark-mode" : "light-mode"}>
            <div className="container-fluid">
                <div className="row bg-primary p-2 pon">
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
                    <div className="col-2 col-lg-2 text-center">
                        <div className="row">
                            <div className="col-2">
                                <i data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" class="fa-solid fa-list-ul mt-2"></i>
                            </div>
                            <div className="col-10 p-2 mobile">
                                Категории
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-lg-9">
                        <input onChange={handleInputChange} type="text" placeholder="Search" className="form-control rounded mt-1" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="row">
                            {filter.map(product => (
                                <div className="col-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                                    <div className="card shadow">
                                        <a href={'/prodid/' + product.id}>
                                            <img src={product.images} className="card-img-top" alt={product.title} />
                                        </a>
                                        <div className="card-body">
                                            <h6 className="card-title">{product.title}</h6>
                                            <h5 className="card-title text-success">$ {product.price}</h5>
                                            <div className="row">
                                                <div className="col-6 text-center">
                                                    <i class="fa-solid fa-cart-shopping text-dark mt-3" onClick={() => addToBasket(product)}></i>
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn btn-success mt-2 rounded-0 form-control">
                                                        Buy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Basket basketItems={basketItems} removeFromBasket={removeFromBasket} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div class="offcanvas-header">
                    <h1 class="offcanvas-title" id="staticBackdropLabel"><b>Category</b></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div>
                        <div className="d-flex flex-column" role="group" aria-label="Categories">
                            <button onClick={() => handleCategoryChange({ target: { value: '' } })}
                                className={`btn mb-2 ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`}>
                                Все категории
                            </button>
                            {categories.map((category) => (
                                <button key={category.id} onClick={() => handleCategoryChange({ target: { value: category.id } })}
                                    className={`btn mb-2 ${selectedCategory === String(category.id) ? 'btn-primary' : 'btn-outline-primary'}`}
                                >{category.name}</button>
                            ))}
                        </div>
                        <h1><b>Фильтр</b></h1>
                        <label>Фильтровать по минимальной цене</label>
                        <input onChange={handleMinPriceChange} className="form-control" type="number" value={minPrice} />
                        <label>Фильтровать по максимальной цене</label>
                        <input onChange={handleMaxPriceChange} className="form-control" type="number" value={maxPrice} />
                        <label>Фильтровать по точной цене</label>
                        <input onChange={handleExactPriceChange} className="form-control" type="number" value={exactPrice} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
