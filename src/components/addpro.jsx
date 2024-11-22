import { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";

const AddProduct = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const Click = async () => {
        try {
            const productData = {
                title: name, // Название
                price: parseFloat(price), // Цена
                description: description, // Описание
                categoryId: parseInt(categoryId), // ID категории (должен быть числом)
                images: [imageUrl], // Список URL изображений
            };

            console.log("Отправляем данные:", productData);

            const response = await axios.post(
                "https://api.escuelajs.co/api/v1/products",
                productData
            );

            console.log("Успешный ответ:", response.data);
            setMessage("Товар успешно добавлен!");
        } catch (error) {
            console.error("Ошибка при добавлении товара:", error.response?.data || error.message);
            setMessage("Ошибка при добавлении товара. Проверьте введенные данные.");
        }
    };

    const toggleDarkMode = () => {
        if (isDarkMode) {
            $("body").removeClass("dark-theme");
            localStorage.setItem("dark-theme", "false");
        } else {
            $("body").addClass("dark-theme");
            localStorage.setItem("dark-theme", "true");
        }
        setIsDarkMode(!isDarkMode);
    };

    const Nav = () => {
        window.location.href = "/";
    };
    const Add = () => {
        window.location.href = "/addpro";
    };

    useEffect(() => {
        const save = localStorage.getItem("dark-theme");
        if (save === "true") {
            $("body").addClass("dark-theme");
            setIsDarkMode(true);
        }
    }, []);

    return (
        <>
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
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6 p-3">
                            <h1>Добавить объявление </h1>
                            <h3>Введите название товара</h3>
                            <input type="text" value={name}
                                placeholder="Название товара" onChange={(e) => setName(e.target.value)}
                                required className="form-control mb-2" />=


                            <b>Добавить изображение</b>
                            <input type="text" value={imageUrl}
                                placeholder="URL изображения" onChange={(e) => setImageUrl(e.target.value)}
                                required className="form-control mb-2" />
                            <input type="text" value={price}
                                placeholder="Цена товара" onChange={(e) => setPrice(e.target.value)}
                                required className="form-control mb-2" />
                            <input type="text" value={description} placeholder="Описание товара" onChange={(e) => setDescription(e.target.value)}
                                required className="form-control mb-2" />
                            <input type="number" value={categoryId} placeholder="Выберите категорию"
                                onChange={(e) => setCategoryId(e.target.value)} required className="form-control mb-2" />
                            <button onClick={Click} className="btn btn-primary">
                                Добавить товар
                            </button>
                            {message && <div className="mt-3 alert alert-info">{message}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;