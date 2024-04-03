import React from 'react';
import './NavClient.scss';
import { Link } from 'react-router-dom';

const GuestSection = () => {
    return (
        <section className="guest-section">
            <div className="guest-container">
                <h2>Welcome8888, Client!</h2>
                <p>Please sign in or create an account to access all features.</p>
                <div className="guest-actions">
                    <Link to="/login" className="btn btn-primary">Sign In</Link>
                    <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </section>
    );
};

export default GuestSection;
