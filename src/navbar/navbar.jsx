import { useState } from "react";

const Navbar = () => {
    const [dark, setIsDarkMode] = useState(false);
    const Nav = () => {
        window.location.href = '/';
    }
    const Cart = () => {
        window.location.href = '/basket';
    }
    const Dark = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    return (
        <>
            <div className="container-md-fluid">
                <div className="row bg-primary p-2">
                    <div className="col-md-3 text-center">
                        <h2 className="mt-1" onClick={Nav}><b>Internet Shop</b></h2>
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="Search" className="form-control rounded-0 mt-1" />
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-6 text-center">
                                <h3 onClick={Cart} className="mt-2">Корзина</h3>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <i class="fa-solid fa-moon fa-2x mt-2 ani" onClick={Dark}></i>
                                    </div>
                                    <div className="col-6 text-center">
                                        <i class="fa-solid fa-language fa-2x mt-2 ani"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-6 text-center">
                                <button className="btn btn-primary text-center rounded-0 mt-1">Авторизоваться</button>
                            </div>
                            <div className="col-6 text-center">
                                <button className="btn btn-primary text-center rounded-0 mt-1">Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;