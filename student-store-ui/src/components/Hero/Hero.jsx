import * as React from "react";
import shop from './Shop.svg'
import "./Hero.css";

export default function Hero() {
    return (
        <div className="hero mb-3 p-5 text-white rounded container">
            <h1 className="display-4 intro">Welcome! to the student store</h1>
            <div className="row">
                <div className="col-md-8">
                        <p className="lead">
                    We have all kinds of goodies. Click on any of the items to start filling up your shopping cart.
                    </p>
                    <hr className="my-4" />
                    <p>
                    Checkout whenever you're ready.
                    </p>
                    <p className="lead">
                        <a className="btn btn-lg start-buying" href="#buy-now" role="button">
                            Start buying
                        </a>
                    </p>
                </div>
                <div className="col-md-4">
                    <img src={ shop } alt="" className="hero-img img-fluid" />
                </div>
            </div>
        </div>
    );
}
