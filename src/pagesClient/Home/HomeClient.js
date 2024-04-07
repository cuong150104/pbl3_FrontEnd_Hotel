
import Navbar from "../../componentsClient/Navbar/Navbar";
import Header from "../../componentsClient/HeaderClient/HeaderClient";
import "./HomeClient.scss";

import Featured from "../../componentsClient/Featured/Featured";
import FeaturedProperties from "../../componentsClient/FeaturedProperties/FeaturedProperties";
import PropertyList from "../../componentsClient/PropertyList/PropertyList";
import Footer from "../../componentsClient/Footer/Footer";
import MailList from "../../componentsClient/MailList/MailList";




const HomeClient = () => {
    return (

        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                <h1 className="homeTitle">Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default HomeClient;