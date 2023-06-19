import { Component } from 'react';
import Profile from '../profile/Profile';


export default class Gallery extends Component {
    render() { 
        return (
            <section>
                <h1>Amazing pictures</h1>
                <Profile />
                <Profile />
                <Profile />
            </section>
        );
    }
}
